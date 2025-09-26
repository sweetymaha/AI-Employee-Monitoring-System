import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  Clock, 
  Play, 
  Square, 
  CheckCircle, 
  Timer, 
  Target, 
  TrendingUp,
  Calendar,
  AlertCircle,
  Plus,
  Star
} from 'lucide-react';
import { Employee, Task } from '../types';
import { mockTasks } from '../data/mockData';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EmployeeDashboardProps {
  employee: Employee;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

export function EmployeeDashboard({ employee, onCheckIn, onCheckOut }: EmployeeDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [myTasks, setMyTasks] = useState<Task[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setMyTasks(mockTasks.filter(task => task.assignedTo === employee.id));
  }, [employee.id]);

  const activityData = [
    { name: 'Active Time', value: employee.todayActivity.activeTime, color: '#22c55e' },
    { name: 'Idle Time', value: employee.todayActivity.idleTime, color: '#ef4444' }
  ];

  const performanceData = [
    { metric: 'Productivity', value: employee.productivity },
    { metric: 'Attendance', value: employee.attendance },
    { metric: 'Task Completion', value: employee.taskCompletion },
    { metric: 'Skill Level', value: employee.skillLevel },
    { metric: 'Engagement', value: employee.engagement }
  ];

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1>Welcome back, {employee.name}!</h1>
            <p className="text-muted-foreground">
              {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Performance Score</p>
            <p className={`text-2xl ${getPerformanceColor(employee.performanceScore)}`}>
              {employee.performanceScore}%
            </p>
          </div>
        </div>

        {/* Check-in/out Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3>Attendance</h3>
                  <p className="text-sm text-muted-foreground">
                    {employee.isCheckedIn ? `Checked in at ${employee.checkInTime}` : 'Not checked in today'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {employee.isCheckedIn ? (
                  <>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Active
                    </Badge>
                    <Button onClick={onCheckOut} variant="outline">
                      <Square className="w-4 h-4 mr-2" />
                      Check Out
                    </Button>
                  </>
                ) : (
                  <Button onClick={onCheckIn}>
                    <Play className="w-4 h-4 mr-2" />
                    Check In
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Today's Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Hours</span>
                  <span className="font-medium">{(employee.todayActivity.activeTime + employee.todayActivity.idleTime).toFixed(1)}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tasks Completed</span>
                  <Badge variant="secondary">{employee.todayActivity.tasksCompleted}</Badge>
                </div>
                
                {/* Real-time activity indicator */}
                {employee.isCheckedIn && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-700">Currently active</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Focus time: {Math.floor(Math.random() * 45 + 15)} minutes
                    </p>
                  </div>
                )}

                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={activityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {activityData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}h`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    Active ({employee.todayActivity.activeTime}h)
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    Idle ({employee.todayActivity.idleTime}h)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.metric}</span>
                      <span className={getPerformanceColor(item.value)}>{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl text-blue-600">{myTasks.filter(t => t.status === 'completed').length}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <p className="text-2xl text-yellow-600">{myTasks.filter(t => t.status === 'in-progress').length}</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl text-gray-600">{myTasks.filter(t => t.status === 'pending').length}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <p className="text-2xl text-red-600">{myTasks.filter(t => t.status === 'overdue').length}</p>
                  <p className="text-xs text-muted-foreground">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced My Tasks Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Tasks */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  My Tasks
                </CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${getTaskStatusColor(task.status)}`}></div>
                      <div className="flex-1">
                        <h4>{task.title}</h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                            {task.priority}
                          </Badge>
                          {task.status === 'overdue' && (
                            <Badge variant="destructive">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Overdue
                            </Badge>
                          )}
                        </div>
                        {/* Progress bar for in-progress tasks */}
                        {task.status === 'in-progress' && task.actualHours && task.estimatedHours && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span>{Math.round((task.actualHours / task.estimatedHours) * 100)}%</span>
                            </div>
                            <Progress value={(task.actualHours / task.estimatedHours) * 100} className="h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-2 mb-2">
                        {task.status === 'pending' && (
                          <Button size="sm" variant="outline">Start</Button>
                        )}
                        {task.status === 'in-progress' && (
                          <Button size="sm">Complete</Button>
                        )}
                      </div>
                      <Badge variant="outline">
                        {task.status.replace('-', ' ')}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {task.actualHours ? `${task.actualHours}h spent` : `Est. ${task.estimatedHours}h`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personal Goals & Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Personal Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Goals */}
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm mb-2">Complete React Certification</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground">Due: Dec 31, 2024</p>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm mb-2">Improve Code Review Skills</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="text-xs text-muted-foreground">Due: Jan 15, 2025</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Recent Achievements */}
              <div>
                <h4 className="text-sm mb-3">Recent Achievements</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-700">Completed Authentication Module</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                    <Star className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-blue-700">High Performance This Month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              AI Performance Insights
            </CardTitle>
            <CardDescription>
              Personalized recommendations based on your activity patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-800">Productivity Peak</span>
                </div>
                <p className="text-sm text-blue-700">
                  Your most productive hours are 10-11 AM. Consider scheduling complex tasks during this time.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-800">Task Completion</span>
                </div>
                <p className="text-sm text-green-700">
                  Great job! You're completing tasks 15% faster than your average this month.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">Suggestion</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Consider taking short breaks every 90 minutes to maintain high focus levels.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}