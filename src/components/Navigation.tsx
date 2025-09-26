import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  BarChart3, 
  User, 
  Settings, 
  FileText,
  Target,
  Calendar,
  TrendingUp,
  UserCheck,
  Award,
  Clock
} from 'lucide-react';
import { Employee } from '../types';

interface NavigationProps {
  currentUser: Employee;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentUser, currentPage, onPageChange }: NavigationProps) {
  const getNavigationItems = () => {
    const commonItems = [
      { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { key: 'profile', label: 'Profile', icon: User },
      { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    ];

    switch (currentUser.role) {
      case 'employee':
        return [
          ...commonItems,
          { key: 'tasks', label: 'My Tasks', icon: CheckSquare },
          { key: 'goals', label: 'Goals', icon: Target },
          { key: 'timesheet', label: 'Timesheet', icon: Clock },
        ];
      
      case 'manager':
        return [
          ...commonItems,
          { key: 'team', label: 'Team Management', icon: Users },
          { key: 'projects', label: 'Projects', icon: FileText },
          { key: 'performance', label: 'Team Performance', icon: TrendingUp },
          { key: 'attendance', label: 'Attendance', icon: UserCheck },
        ];
      
      case 'hr':
        return [
          ...commonItems,
          { key: 'employees', label: 'Employee Management', icon: Users },
          { key: 'performance', label: 'Performance Reviews', icon: Award },
          { key: 'reports', label: 'Reports', icon: FileText },
          { key: 'settings', label: 'HR Settings', icon: Settings },
        ];
      
      default:
        return commonItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-white border-b border-border px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-1 overflow-x-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.key;
            
            return (
              <Button
                key={item.key}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onPageChange(item.key)}
                className={`flex items-center gap-2 whitespace-nowrap ${
                  isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
                {item.key === 'tasks' && currentUser.role === 'employee' && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    3
                  </Badge>
                )}
                {item.key === 'team' && currentUser.role === 'manager' && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {currentUser.department === 'Engineering' ? '4' : 
                     currentUser.department === 'Design' ? '3' :
                     currentUser.department === 'Marketing' ? '3' :
                     currentUser.department === 'Sales' ? '2' : '1'}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}