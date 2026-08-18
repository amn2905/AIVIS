import { 
  mockDashboardStats, 
  mockClaims, 
  mockVehicles, 
  mockCompanies, 
  mockBranches, 
  mockUsers, 
  mockActivityLogs, 
  mockNotifications 
} from './mockData';
import { 
  Claim, 
  Vehicle, 
  InsuranceCompany, 
  Branch, 
  User, 
  ActivityLog, 
  NotificationItem, 
  DashboardOverviewStats 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Helper to simulate realistic latency if backend is not running
const delay = (ms: number = 200) => new Promise(res => setTimeout(res, ms));

function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function camelizeKeys<T>(obj: any): T {
  if (Array.isArray(obj)) {
    return obj.map(v => camelizeKeys(v)) as unknown as T;
  } else if (obj !== null && typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [toCamelCase(key)]: camelizeKeys(obj[key]),
      }),
      {}
    ) as T;
  }
  return obj as T;
}

export class ApiClient {
  private static token: string | null = localStorage.getItem('aivis_token');

  public static setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('aivis_token', token);
    } else {
      localStorage.removeItem('aivis_token');
    }
  }

  public static getToken(): string | null {
    return this.token;
  }

  // Dashboard API
  public static async getDashboardStats(): Promise<DashboardOverviewStats> {
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard/stats`, {
        headers: this.getHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        return { ...mockDashboardStats, ...camelizeKeys<DashboardOverviewStats>(data) };
      }
    } catch {
      // Fallback to rich local state
    }
    await delay();
    return mockDashboardStats;
  }

  // Claims API
  public static async getClaims(): Promise<Claim[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/claims`, {
        headers: this.getHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        const camel = camelizeKeys<Claim[]>(data);
        if (Array.isArray(camel) && camel.length > 0) {
          return camel.map((item, idx) => ({
            ...(mockClaims[idx] || mockClaims[0]),
            ...item,
            vehicle: {
              ...((mockClaims[idx] || mockClaims[0]).vehicle),
              ...(item.vehicle || {})
            }
          }));
        }
      }
    } catch {
      // Fallback
    }
    await delay();
    return mockClaims;
  }

  public static async getClaimById(id: string): Promise<Claim | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/claims/${id}`, {
        headers: this.getHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        const item = camelizeKeys<Claim>(data);
        const fallback = mockClaims.find(c => c.id === id || c.claimNumber === id) || mockClaims[0];
        return {
          ...fallback,
          ...item,
          vehicle: {
            ...fallback.vehicle,
            ...(item.vehicle || {})
          }
        };
      }
    } catch {
      // Fallback
    }
    await delay();
    return mockClaims.find(c => c.id === id || c.claimNumber === id) || mockClaims[0];
  }

  public static async updateClaimStatus(claimId: string, status: Claim['status']): Promise<Claim> {
    await delay(300);
    const claim = mockClaims.find(c => c.id === claimId);
    if (claim) {
      claim.status = status;
      return { ...claim };
    }
    throw new Error('Claim not found');
  }

  // Vehicles API
  public static async getVehicles(): Promise<Vehicle[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/vehicles`, {
        headers: this.getHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        const camel = camelizeKeys<Vehicle[]>(data);
        if (Array.isArray(camel) && camel.length > 0) return camel;
      }
    } catch {
      // Fallback
    }
    await delay();
    return mockVehicles;
  }

  // Companies & Branches API
  public static async getCompanies(): Promise<InsuranceCompany[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/companies`, {
        headers: this.getHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        const camel = camelizeKeys<InsuranceCompany[]>(data);
        if (Array.isArray(camel) && camel.length > 0) return camel;
      }
    } catch {
      // Fallback
    }
    await delay();
    return mockCompanies;
  }

  public static async getBranches(): Promise<Branch[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/branches`, {
        headers: this.getHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        const camel = camelizeKeys<Branch[]>(data);
        if (Array.isArray(camel) && camel.length > 0) return camel;
      }
    } catch {
      // Fallback
    }
    await delay();
    return mockBranches;
  }

  // Users & Roles API
  public static async getUsers(): Promise<User[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        headers: this.getHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        const camel = camelizeKeys<User[]>(data);
        if (Array.isArray(camel) && camel.length > 0) return camel;
      }
    } catch {
      // Fallback
    }
    await delay();
    return mockUsers;
  }

  // Audit Logs API
  public static async getActivityLogs(): Promise<ActivityLog[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/audit/logs`, {
        headers: this.getHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        const camel = camelizeKeys<ActivityLog[]>(data);
        if (Array.isArray(camel) && camel.length > 0) return camel;
      }
    } catch {
      // Fallback
    }
    await delay();
    return mockActivityLogs;
  }

  // Notifications API
  public static async getNotifications(): Promise<NotificationItem[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications`, {
        headers: this.getHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        const camel = camelizeKeys<NotificationItem[]>(data);
        if (Array.isArray(camel) && camel.length > 0) return camel;
      }
    } catch {
      // Fallback
    }
    await delay();
    return mockNotifications;
  }

  private static getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }
}
