import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  Activity, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  FileText, 
  UserPlus,
  Coffee,
  Laptop
} from 'lucide-react';

interface ActivityFeedItem {
  id: string;
  type: 'check-in' | 'task-complete' | 'message' | 'break' | 'meeting' | 'document';
  user: string;
  action: string;
  timestamp: Date;
  details?: string;
}

export function RealTimeActivityFeed() {
  const [activities, setActivities] = useState<ActivityFeedItem[]>([]);

  // Simulate real-time activity updates
  useEffect(() => {
    const initialActivities: ActivityFeedItem[] = [
      {
        id: '1',
        type: 'check-in',
        user: 'John Smith',
        action: 'checked in',
        timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      },
      {
        id: '2',
        type: 'task-complete',
        user: 'Mike Davis',
        action: 'completed task',
        timestamp: new Date(Date.now() - 12 * 60000), // 12 minutes ago
        details: 'Design landing page mockups'
      },
      {
        id: '3',
        type: 'meeting',
        user: 'Sarah Johnson',
        action: 'joined meeting',
        timestamp: new Date(Date.now() - 18 * 60000), // 18 minutes ago
        details: 'Sprint Planning'
      },
      {
        id: '4',
        type: 'break',
        user: 'Lisa Rodriguez',
        action: 'took a break',
        timestamp: new Date(Date.now() - 25 * 60000), // 25 minutes ago
      },
      {
        id: '5',
        type: 'document',
        user: 'Alex Thompson',
        action: 'uploaded document',
        timestamp: new Date(Date.now() - 32 * 60000), // 32 minutes ago
        details: 'Q4 Marketing Strategy.pdf'
      }
    ];

    setActivities(initialActivities);

    // Simulate new activities coming in
    const interval = setInterval(() => {
      const newActivity: ActivityFeedItem = {
        id: Date.now().toString(),
        type: ['check-in', 'task-complete', 'message', 'break', 'meeting'][Math.floor(Math.random() * 5)] as any,
        user: ['John Smith', 'Mike Davis', 'Sarah Johnson', 'Lisa Rodriguez', 'Alex Thompson'][Math.floor(Math.random() * 5)],
        action: 'performed action',
        timestamp: new Date(),
        details: Math.random() > 0.5 ? 'Additional details about the activity' : undefined
      };

      // Set appropriate action based on type
      switch (newActivity.type) {
        case 'check-in':
          newActivity.action = 'checked in';
          break;
        case 'task-complete':
          newActivity.action = 'completed task';
          newActivity.details = 'Task: ' + ['Authentication API', 'UI Component', 'Database Update', 'Code Review'][Math.floor(Math.random() * 4)];
          break;
        case 'message':
          newActivity.action = 'sent message';
          break;
        case 'break':
          newActivity.action = 'took a break';
          break;
        case 'meeting':
          newActivity.action = 'joined meeting';
          newActivity.details = ['Daily Standup', 'Sprint Review', 'Client Call'][Math.floor(Math.random() * 3)];
          break;
      }

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]); // Keep only 10 most recent
    }, 15000); // New activity every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'check-in': return Clock;
      case 'task-complete': return CheckCircle;
      case 'message': return MessageSquare;
      case 'break': return Coffee;
      case 'meeting': return UserPlus;
      case 'document': return FileText;
      default: return Laptop;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'check-in': return 'text-blue-600';
      case 'task-complete': return 'text-green-600';
      case 'message': return 'text-purple-600';
      case 'break': return 'text-orange-600';
      case 'meeting': return 'text-indigo-600';
      case 'document': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Real-Time Activity Feed
        </CardTitle>
        <CardDescription>
          Live employee activity updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {activities.map((activity) => {
            const ActivityIcon = getActivityIcon(activity.type);
            const iconColor = getActivityColor(activity.type);
            
            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg bg-white">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">
                    {getInitials(activity.user)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <ActivityIcon className={`w-4 h-4 ${iconColor}`} />
                    <span className="text-sm">{activity.user}</span>
                    <span className="text-sm text-muted-foreground">{activity.action}</span>
                  </div>
                  
                  {activity.details && (
                    <p className="text-xs text-muted-foreground mb-1">
                      {activity.details}
                    </p>
                  )}
                  
                  <p className="text-xs text-muted-foreground">
                    {getTimeAgo(activity.timestamp)}
                  </p>
                </div>

                <Badge variant="outline" className="text-xs">
                  {activity.type.replace('-', ' ')}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}