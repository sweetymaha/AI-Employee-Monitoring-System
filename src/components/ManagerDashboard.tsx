import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  Plus,
  Calendar,
  Target
} from 'lucide-react';
import { Employee, Task, Project } from '../types';
import { mockEmployees, mockTasks, mockProjects } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface ManagerDashboardProps {
  manager: Employee;
}

export function ManagerDashboard({ manager }: ManagerDashboardProps) {
  const [teamMembers, setTeamMembers] = useState<Employee[]>([]);
  const [teamTasks, setTeamTasks] = useState<Task[]>([]);
  const [teamProjects, setTeamProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Get team members (employees under this manager)
    const team = mockEmployees.filter(emp => emp.managerId === manager.id);
    setTeamMembers(team);

    // Get tasks assigned by this manager
    const tasks = mockTasks.filter(task => task.assignedBy === manager.id);
    setTeamTasks(tasks);

    // Get projects managed by this manager
    const projects = mockProjects.filter(project => project.managerId === manager.id);
    setTeamProjects(projects);
  }, [manager.id]);

  const teamPerformanceData = teamMembers.map(member => ({
    name: member.name.split(' ')[0],
    productivity: member.productivity,
    attendance: member.attendance,
    taskCompletion: member.taskCompletion,
    performanceScore: member.performanceScore
  }));

  const taskStatusData = [
    { name: 'Completed', value: teamTasks.filter(t => t.status === 'completed').length, color: '#22c55e' },
    { name: 'In Progress', value: teamTasks.filter(t => t.status === 'in-progress').length, color: '#3b82f6' },
    { name: 'Pending', value: teamTasks.filter(t => t.status === 'pending').length, color: '#6b7280' },
    { name: 'Overdue', value: teamTasks.filter(t => t.status === 'overdue').length, color: '#ef4444' }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const averageTeamPerformance = teamMembers.length > 0 
    ? teamMembers.reduce((sum, member) => sum + member.performanceScore, 0) / teamMembers.length 
    : 0;

  const upcomingDeadlines = teamTasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1>Manager Dashboard</h1>
            <p className="text-muted-foreground">
              {manager.department} • Team of {teamMembers.length} members
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Team Average Performance</p>
            <p className={`text-2xl ${getPerformanceColor(averageTeamPerformance)}`}>
              {averageTeamPerformance.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                  <p className="text-2xl">{teamMembers.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="text-2xl">{teamProjects.filter(p => p.status === 'active').length}</p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Tasks</p>
                  <p className="text-2xl">{teamTasks.filter(t => t.status === 'pending').length}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue Tasks</p>
                  <p className="text-2xl">{teamTasks.filter(t => t.status === 'overdue').length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Team Performance Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Team Performance Overview
              </CardTitle>
              <CardDescription>
                Individual performance metrics and comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                    />
                    <Bar dataKey="productivity" fill="#3b82f6" name="Productivity" />
                    <Bar dataKey="attendance" fill="#10b981" name="Attendance" />
                    <Bar dataKey="taskCompletion" fill="#f59e0b" name="Task Completion" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Task Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Task Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {taskStatusData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Workload Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Workload Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => {
                  const memberTasks = teamTasks.filter(task => task.assignedTo === member.id);
                  const workloadPercentage = Math.min(100, (memberTasks.length / Math.max(teamTasks.length / teamMembers.length, 1)) * 100);
                  
                  return (
                    <div key={member.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{member.name}</span>
                        <span className="text-sm text-muted-foreground">{memberTasks.length} tasks</span>
                      </div>
                      <div className="relative">
                        <Progress value={workloadPercentage} className="h-2" />
                        <span className="absolute right-0 top-0 text-xs text-muted-foreground">
                          {Math.round(workloadPercentage)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Team Velocity Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Team Velocity
              </CardTitle>
              <CardDescription>
                Sprint velocity and completion trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { sprint: 'Sprint 1', completed: 23, planned: 25 },
                    { sprint: 'Sprint 2', completed: 28, planned: 30 },
                    { sprint: 'Sprint 3', completed: 32, planned: 35 },
                    { sprint: 'Sprint 4', completed: 29, planned: 30 },
                    { sprint: 'Sprint 5', completed: 35, planned: 35 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sprint" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completed" />
                    <Line type="monotone" dataKey="planned" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="Planned" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enhanced Team Members */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members
                </CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => {
                  const memberTasks = teamTasks.filter(task => task.assignedTo === member.id);
                  const completedTasks = memberTasks.filter(task => task.status === 'completed').length;
                  
                  return (
                    <div key={member.id} className="p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-sm">{member.name}</h4>
                            <p className="text-xs text-muted-foreground">{member.position}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant={member.isCheckedIn ? 'default' : 'secondary'} className="text-xs">
                                {member.isCheckedIn ? 'Online' : 'Offline'}
                              </Badge>
                              {member.isCheckedIn && (
                                <span className="text-xs text-muted-foreground">
                                  Since {member.checkInTime}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg ${getPerformanceColor(member.performanceScore)}`}>
                            {member.performanceScore}%
                          </p>
                          <p className="text-xs text-muted-foreground">Performance</p>
                        </div>
                      </div>
                      
                      {/* Mini performance metrics */}
                      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-gray-50 rounded">
                          <p className="text-sm">{memberTasks.length}</p>
                          <p className="text-xs text-muted-foreground">Tasks</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <p className="text-sm">{completedTasks}</p>
                          <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <p className="text-sm">{member.todayActivity.activeTime.toFixed(1)}h</p>
                          <p className="text-xs text-muted-foreground">Active Today</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Critical Deadlines
              </CardTitle>
              <CardDescription>
                Tasks requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((task) => {
                  const assignedMember = teamMembers.find(m => m.id === task.assignedTo);
                  const daysUntilDue = Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={task.id} className="p-3 border rounded-lg bg-white">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-sm">{task.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className="text-xs">
                                {assignedMember ? getInitials(assignedMember.name) : '?'}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">
                              {assignedMember?.name || 'Unassigned'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={task.status === 'overdue' ? 'destructive' : daysUntilDue <= 2 ? 'destructive' : 'secondary'} className="text-xs">
                            {task.status === 'overdue' ? 'Overdue' : `${daysUntilDue}d left`}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        <span className={`${task.priority === 'high' ? 'text-red-600' : task.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                          {task.priority} priority
                        </span>
                      </div>
                      
                      {task.status === 'overdue' && (
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            Reassign
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            Extend Deadline
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
                {upcomingDeadlines.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No critical deadlines</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Projects Overview
              </CardTitle>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamProjects.map((project) => (
                <div key={project.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm">{project.name}</h4>
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{project.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{project.teamMembers.length} members</span>
                      <span>Due: {new Date(project.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}