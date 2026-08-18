import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { NotificationDrawer } from './NotificationDrawer';
import { GlobalSearchModal } from './GlobalSearchModal';
import { AskAIVISDrawer } from './AskAIVISDrawer';
import { mockNotifications } from '../../services/mockData';
import { NotificationItem } from '../../types';

interface EnterpriseLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const EnterpriseLayout: React.FC<EnterpriseLayoutProps> = ({
  currentPath,
  onNavigate,
  children
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAFB] font-sans antialiased text-[#111827] selection:bg-indigo-500 selection:text-white">
      {/* Side Navigation */}
      <Sidebar activePath={currentPath} onNavigate={onNavigate} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Floating Glass Header */}
        <Header
          currentPath={currentPath}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenCopilot={() => setIsCopilotOpen(true)}
          unreadNotificationsCount={unreadCount}
        />

        {/* Content Body */}
        <main className="flex-1 px-6 pb-8 md:px-8 max-w-7xl w-full mx-auto space-y-6 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Slide-over Notifications */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onNavigate={onNavigate}
      />

      {/* Ask AIVIS Conversational Drawer */}
      <AskAIVISDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />

      {/* Command K Finder */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
