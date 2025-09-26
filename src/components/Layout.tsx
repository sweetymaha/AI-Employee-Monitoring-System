import { ReactNode } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { NotificationCenter } from './NotificationCenter';
import { Navigation } from './Navigation';
import { LogOut, Brain, Zap } from 'lucide-react';
import { Employee } from '../types';

interface LayoutProps {
  children: ReactNode;
  currentUser: Employee;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export function Layout({ children, currentUser, currentPage, onPageChange, onLogout }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <header className="bg-white border-b border-border px-6 py-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl cursor-pointer" onClick={() => onPageChange('dashboard')}>
                  AI Employee Monitor
                </h1>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Portal
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    AI Active
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Performance Score Badge */}
            <div className="hidden md:block text-center">
              <p className="text-xs text-muted-foreground">Your Score</p>
              <Badge variant="outline" className="text-sm">
                {currentUser.performanceScore}%
              </Badge>
            </div>
            
            {/* Notifications */}
            <NotificationCenter userId={currentUser.id} />
            
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.position}</p>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navigation 
        currentUser={currentUser} 
        currentPage={currentPage} 
        onPageChange={onPageChange} 
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}