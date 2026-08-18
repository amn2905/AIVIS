import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, RoleType } from '../types';
import { mockUsers } from '../services/mockData';
import { ApiClient } from '../services/apiClient';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: RoleType) => Promise<void>;
  logout: () => void;
  hasRole: (roles: RoleType[]) => boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage session
    const savedUser = localStorage.getItem('aivis_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(mockUsers[0]);
      }
    } else {
      // Default to Super Admin demo session
      setUser(mockUsers[0]);
      localStorage.setItem('aivis_user', JSON.stringify(mockUsers[0]));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role?: RoleType) => {
    setIsLoading(true);
    let matchedUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!matchedUser) {
      matchedUser = {
        id: `usr-${Date.now()}`,
        email,
        fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
        role: role || 'CLAIMS_INVESTIGATOR',
        companyId: 'comp-1',
        companyName: 'Metropolitan Mutual Insurance',
        status: 'ACTIVE',
        lastActive: 'Just now',
        permissions: ['claims:read', 'claims:write']
      };
    }
    setUser(matchedUser);
    ApiClient.setToken(`mock-jwt-token-${matchedUser.id}`);
    localStorage.setItem('aivis_user', JSON.stringify(matchedUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    ApiClient.setToken(null);
    localStorage.removeItem('aivis_user');
  };

  const hasRole = (roles: RoleType[]): boolean => {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true;
    return roles.includes(user.role);
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.permissions.includes('all:*') || user.role === 'SUPER_ADMIN') return true;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      hasRole,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
