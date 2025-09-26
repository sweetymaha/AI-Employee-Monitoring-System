import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare
} from 'lucide-react';
import { Employee } from '../../types';
import { mockEmployees, mockTasks } from '../../data/mockData';

interface TeamManagementPageProps {
  currentUser: Employee;
}

export function TeamManagementPage({ currentUser }: TeamManagementPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Get team members based on manager's department
  const teamMembers = mockEmployees.filter(emp => 
    emp.managerId === currentUser.id || 
    (currentUser.department === emp.department && emp.role === 'employee')
  );

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return { variant: 'default' as const, text: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 80) return { variant: 'secondary' as const, text: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (score >= 70) return { variant: 'outline' as const, text: 'Average', color: 'bg-yellow-100 text-yellow-800' };
    return { variant: 'destructive' as const, text: 'Needs Improvement', color: 'bg-red-100 text-red-800' };
  };

  const getTeamStats = () => {
    const totalMembers = teamMembers.length;
    const averagePerformance = totalMembers > 0 
      ? teamMembers.reduce((sum, member) => sum + member.performanceScore, 0) / totalMembers 
      : 0;
    const checkedInCount = teamMembers.filter(member => member.isCheckedIn).length;
    const highPerformers = teamMembers.filter(member => member.performanceScore >= 85).length;
    
    return {
      totalMembers,
      averagePerformance: averagePerformance.toFixed(1),
      checkedInCount,
      highPerformers,
      attendanceRate: totalMembers > 0 ? ((checkedInCount / totalMembers) * 100).toFixed(1) : '0'
    };
  };

  const stats = getTeamStats();

  const getTeamTaskStats = () => {
    const teamTasks = mockTasks.filter(task => 
      teamMembers.some(member => member.id === task.assignedTo)
    );
    
    const completed = teamTasks.filter(task => task.status === 'completed').length;
    const inProgress = teamTasks.filter(task => task.status === 'in-progress').length;
    const pending = teamTasks.filter(task => task.status === 'pending').length;
    const overdue = teamTasks.filter(task => task.status === 'overdue').length;
    
    return { completed, inProgress, pending, overdue, total: teamTasks.length };
  };

  const taskStats = getTeamTaskStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Team Management</h1>
          <p className="text-muted-foreground">Manage and monitor your team's performance</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Team Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalMembers}</p>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.averagePerformance}%</p>
                <p className="text-sm text-muted-foreground">Avg Performance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.attendanceRate}%</p>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.highPerformers}</p>
                <p className="text-sm text-muted-foreground">Top Performers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Tasks Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Team Tasks Overview</CardTitle>
          <CardDescription>Current status of all team tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{taskStats.total}</p>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{taskStats.completed}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{taskStats.pending}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{taskStats.overdue}</p>
              <p className="text-sm text-muted-foreground">Overdue</p>
            </div>
          </div>
          
          {taskStats.total > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Team Progress</span>
                <span>{((taskStats.completed / taskStats.total) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(taskStats.completed / taskStats.total) * 100} className="h-3" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Team Members Management */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Team Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="workload">Workload</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team members and their details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by dept" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredMembers.map((member) => {
                  const memberTasks = mockTasks.filter(task => task.assignedTo === member.id);
                  const completedTasks = memberTasks.filter(task => task.status === 'completed').length;
                  const badge = getPerformanceBadge(member.performanceScore);
                  
                  return (
                    <div key={member.id} className="p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{member.name}</h4>
                              <Badge variant={member.isCheckedIn ? 'default' : 'secondary'} className="text-xs">
                                {member.isCheckedIn ? '🟢 Online' : '⚪ Offline'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{member.position}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-muted-foreground">
                                📧 {member.email}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                📅 Joined {new Date(member.hireDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          {/* Performance Score */}
                          <div className="text-center">
                            <p className={`text-lg font-bold ${getPerformanceColor(member.performanceScore)}`}>
                              {member.performanceScore}%
                            </p>
                            <Badge className={badge.color}>
                              {badge.text}
                            </Badge>
                          </div>

                          {/* Task Stats */}
                          <div className="text-center">
                            <p className="text-lg font-bold">{memberTasks.length}</p>
                            <p className="text-xs text-muted-foreground">Total Tasks</p>
                            <p className="text-xs text-green-600">{completedTasks} completed</p>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              Message
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t">
                        <div className="text-center">
                          <p className="text-sm font-medium">{member.productivity}%</p>
                          <p className="text-xs text-muted-foreground">Productivity</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{member.attendance}%</p>
                          <p className="text-xs text-muted-foreground">Attendance</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{member.taskCompletion}%</p>
                          <p className="text-xs text-muted-foreground">Task Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{member.engagement}%</p>
                          <p className="text-xs text-muted-foreground">Engagement</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredMembers.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No team members found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || filterDepartment !== 'all' 
                        ? 'Try adjusting your search or filter criteria' 
                        : 'Your team is empty. Add some team members to get started.'
                      }
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription>Detailed performance breakdown by team member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${getPerformanceColor(member.performanceScore)}`}>
                          {member.performanceScore}%
                        </p>
                        <p className="text-xs text-muted-foreground">Overall Score</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Productivity</span>
                          <span>{member.productivity}%</span>
                        </div>
                        <Progress value={member.productivity} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Attendance</span>
                          <span>{member.attendance}%</span>
                        </div>
                        <Progress value={member.attendance} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Tasks</span>
                          <span>{member.taskCompletion}%</span>
                        </div>
                        <Progress value={member.taskCompletion} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Engagement</span>
                          <span>{member.engagement}%</span>
                        </div>
                        <Progress value={member.engagement} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workload Distribution</CardTitle>
              <CardDescription>Monitor task distribution across your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => {
                  const memberTasks = mockTasks.filter(task => task.assignedTo === member.id);
                  const workloadPercentage = Math.min(100, (memberTasks.length / Math.max(taskStats.total / teamMembers.length, 1)) * 100);
                  
                  return (
                    <div key={member.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.position}</p>
                          </div>
                        </div>
                        <div className="flex gap-4 text-center">
                          <div>
                            <p className="text-lg font-bold">{memberTasks.length}</p>
                            <p className="text-xs text-muted-foreground">Total Tasks</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-green-600">
                              {memberTasks.filter(t => t.status === 'completed').length}
                            </p>
                            <p className="text-xs text-muted-foreground">Completed</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Workload Distribution</span>
                          <span>{Math.round(workloadPercentage)}%</span>
                        </div>
                        <Progress value={workloadPercentage} className="h-2" />
                        {workloadPercentage > 120 && (
                          <p className="text-xs text-red-600">⚠️ High workload - consider redistribution</p>
                        )}
                        {workloadPercentage < 60 && (
                          <p className="text-xs text-blue-600">💡 Capacity available for additional tasks</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}