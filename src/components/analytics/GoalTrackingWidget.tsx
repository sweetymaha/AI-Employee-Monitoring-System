import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Target, Calendar, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface GoalTrackingWidgetProps {
  goals: any[];
}

export function GoalTrackingWidget({ goals }: GoalTrackingWidgetProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ahead': return CheckCircle;
      case 'on-track': return Target;
      case 'at-risk': return AlertTriangle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'text-green-600';
      case 'on-track': return 'text-blue-600';
      case 'at-risk': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ahead': return { variant: 'default' as const, text: 'Ahead', color: 'bg-green-100 text-green-800' };
      case 'on-track': return { variant: 'secondary' as const, text: 'On Track', color: 'bg-blue-100 text-blue-800' };
      case 'at-risk': return { variant: 'destructive' as const, text: 'At Risk', color: 'bg-red-100 text-red-800' };
      default: return { variant: 'outline' as const, text: 'Behind', color: 'bg-yellow-100 text-yellow-800' };
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const dueDate = new Date(deadline);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Goal Tracking
        </CardTitle>
        <CardDescription>
          Employee goals and progress tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => {
            const StatusIcon = getStatusIcon(goal.status);
            const statusBadge = getStatusBadge(goal.status);
            const daysRemaining = getDaysRemaining(goal.deadline);
            
            return (
              <div key={goal.id} className="p-4 border rounded-lg bg-white">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-sm">{goal.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Employee ID: {goal.employeeId}
                    </p>
                  </div>
                  <Badge className={statusBadge.color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusBadge.text}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                    <span className={daysRemaining < 7 ? 'text-red-600' : daysRemaining < 14 ? 'text-yellow-600' : 'text-green-600'}>
                      {daysRemaining > 0 ? `${daysRemaining} days left` : `${Math.abs(daysRemaining)} days overdue`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}