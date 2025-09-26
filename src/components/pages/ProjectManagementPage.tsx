import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { 
  Plus, 
  Edit, 
  Eye, 
  Users, 
  Calendar as CalendarIcon,
  Clock,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  DollarSign,
  FileText,
  Settings
} from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import { mockProjects, mockEmployees, mockTasks } from '../../data/mockData';
import { Employee, Project, Task } from '../../types';

interface ProjectManagementPageProps {
  currentUser: Employee;
}

export function ProjectManagementPage({ currentUser }: ProjectManagementPageProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter projects based on manager's access
  const accessibleProjects = useMemo(() => {
    return mockProjects.filter(project => {
      if (currentUser.role === 'hr') return true; // HR can see all projects
      if (currentUser.role === 'manager') {
        return project.managerId === currentUser.id || 
               project.teamMembers.includes(currentUser.id);
      }
      return project.teamMembers.includes(currentUser.id);
    });
  }, [currentUser]);

  // Filter by status
  const filteredProjects = useMemo(() => {
    return filterStatus === 'all' 
      ? accessibleProjects 
      : accessibleProjects.filter(project => project.status === filterStatus);
  }, [accessibleProjects, filterStatus]);

  // Get project statistics
  const projectStats = useMemo(() => {
    const total = accessibleProjects.length;
    const active = accessibleProjects.filter(p => p.status === 'active').length;
    const completed = accessibleProjects.filter(p => p.status === 'completed').length;
    const onHold = accessibleProjects.filter(p => p.status === 'on-hold').length;
    const planning = accessibleProjects.filter(p => p.status === 'planning').length;
    
    const totalBudget = accessibleProjects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const avgProgress = accessibleProjects.reduce((sum, p) => sum + p.progress, 0) / total;
    
    return {
      total,
      active,
      completed,
      onHold,
      planning,
      totalBudget,
      avgProgress: Math.round(avgProgress)
    };
  }, [accessibleProjects]);

  // Get tasks for selected project
  const getProjectTasks = (projectId: string) => {
    return mockTasks.filter(task => task.project === projectId);
  };

  // Get team members for project
  const getTeamMembers = (memberIds: string[]) => {
    return mockEmployees.filter(emp => memberIds.includes(emp.id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'planning': return <FileText className="w-4 h-4" />;
      case 'on-hold': return <Pause className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Project Management</h1>
          <p className="text-muted-foreground">Monitor and manage project progress</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
          {(currentUser.role === 'manager' || currentUser.role === 'hr') && (
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">All Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Project Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{projectStats.total}</p>
                    <p className="text-sm text-muted-foreground">Total Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Play className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{projectStats.active}</p>
                    <p className="text-sm text-muted-foreground">Active Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{projectStats.avgProgress}%</p>
                    <p className="text-sm text-muted-foreground">Avg Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl">${(projectStats.totalBudget / 1000).toFixed(0)}k</p>
                    <p className="text-sm text-muted-foreground">Total Budget</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProjects.slice(0, 5).map(project => {
                  const teamMembers = getTeamMembers(project.teamMembers);
                  const tasks = getProjectTasks(project.id);
                  const completedTasks = tasks.filter(task => task.status === 'completed').length;
                  
                  return (
                    <div 
                      key={project.id} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getStatusIcon(project.status)}
                        </div>
                        <div>
                          <h3 className="text-sm">{project.name}</h3>
                          <p className="text-xs text-muted-foreground">{project.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(project.status)}>
                              {project.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {completedTasks}/{tasks.length} tasks completed
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex -space-x-2">
                            {teamMembers.slice(0, 3).map(member => (
                              <Avatar key={member.id} className="w-6 h-6 border-2 border-white">
                                <AvatarFallback className="text-xs">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {teamMembers.length > 3 && (
                              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                                +{teamMembers.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="w-32">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          {/* Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map(project => {
              const teamMembers = getTeamMembers(project.teamMembers);
              const manager = mockEmployees.find(emp => emp.id === project.managerId);
              const tasks = getProjectTasks(project.id);
              const completedTasks = tasks.filter(task => task.status === 'completed').length;
              const overdueTasks = tasks.filter(task => task.status === 'overdue').length;

              return (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {project.description}
                        </p>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg">{tasks.length}</p>
                        <p className="text-xs text-muted-foreground">Total Tasks</p>
                      </div>
                      <div>
                        <p className="text-lg text-green-600">{completedTasks}</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                      <div>
                        <p className="text-lg text-red-600">{overdueTasks}</p>
                        <p className="text-xs text-muted-foreground">Overdue</p>
                      </div>
                    </div>

                    {/* Team Members */}
                    <div>
                      <p className="text-sm mb-2">Team Members</p>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {teamMembers.slice(0, 4).map(member => (
                            <Avatar key={member.id} className="w-8 h-8 border-2 border-white">
                              <AvatarFallback className="text-xs">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {teamMembers.length > 4 && (
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                              +{teamMembers.length - 4}
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">
                          {teamMembers.length} members
                        </span>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Manager: {manager?.name}</span>
                      <span>Due: {formatDate(new Date(project.endDate), 'MMM dd, yyyy')}</span>
                    </div>

                    {/* Budget */}
                    {project.budget && (
                      <div className="flex justify-between text-xs">
                        <span>Budget:</span>
                        <span>${project.budget.toLocaleString()}</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {(currentUser.role === 'manager' || currentUser.role === 'hr') && (
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Status Distribution */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="p-2 bg-green-100 rounded-lg w-fit mx-auto mb-2">
                  <Play className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-2xl">{projectStats.active}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="p-2 bg-blue-100 rounded-lg w-fit mx-auto mb-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-2xl">{projectStats.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="p-2 bg-yellow-100 rounded-lg w-fit mx-auto mb-2">
                  <FileText className="w-5 h-5 text-yellow-600" />
                </div>
                <p className="text-2xl">{projectStats.planning}</p>
                <p className="text-sm text-muted-foreground">Planning</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="p-2 bg-red-100 rounded-lg w-fit mx-auto mb-2">
                  <Pause className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-2xl">{projectStats.onHold}</p>
                <p className="text-sm text-muted-foreground">On Hold</p>
              </CardContent>
            </Card>
          </div>

          {/* Project Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProjects.map(project => (
                  <div key={project.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm truncate">{project.name}</h4>
                        <Badge className={getStatusColor(project.status)} size="sm">
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Start: {format(new Date(project.startDate), 'MMM dd')}</span>
                        <span>End: {format(new Date(project.endDate), 'MMM dd')}</span>
                        <span>{project.teamMembers.length} members</span>
                      </div>
                    </div>
                    <div className="w-32">
                      <Progress value={project.progress} className="h-2" />
                      <p className="text-xs text-center mt-1">{project.progress}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Project Detail Modal */}
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-3">
                  {selectedProject.name}
                  <Badge className={getStatusColor(selectedProject.status)}>
                    {selectedProject.status}
                  </Badge>
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Progress:</span>
                  <span className="text-sm">{selectedProject.progress}%</span>
                </div>
              </div>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Project Description */}
                <div>
                  <h3 className="mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Overall Progress</span>
                    <span className="text-sm">{selectedProject.progress}%</span>
                  </div>
                  <Progress value={selectedProject.progress} className="h-3" />
                </div>

                {/* Tasks */}
                <div>
                  <h3 className="mb-3">Tasks</h3>
                  <div className="space-y-2">
                    {getProjectTasks(selectedProject.id).slice(0, 8).map(task => {
                      const assignee = mockEmployees.find(emp => emp.id === task.assignedTo);
                      return (
                        <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="text-sm">{task.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getPriorityColor(task.priority)} size="sm">
                                {task.priority}
                              </Badge>
                              <Badge variant="outline" size="sm">
                                {task.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Due: {format(new Date(task.dueDate), 'MMM dd')}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {assignee?.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Project Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Project Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Start Date:</span>
                      <span>{formatDate(new Date(selectedProject.startDate), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>End Date:</span>
                      <span>{formatDate(new Date(selectedProject.endDate), 'MMM dd, yyyy')}</span>
                    </div>
                    {selectedProject.budget && (
                      <div className="flex justify-between">
                        <span>Budget:</span>
                        <span>${selectedProject.budget.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Manager:</span>
                      <span>{mockEmployees.find(emp => emp.id === selectedProject.managerId)?.name}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Members */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Team Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getTeamMembers(selectedProject.teamMembers).map(member => (
                        <div key={member.id} className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">{member.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {member.position}
                            </p>
                          </div>
                          <Badge variant="outline" size="sm">
                            {member.performanceScore}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="space-y-2">
                  {(currentUser.role === 'manager' || currentUser.role === 'hr') && (
                    <>
                      <Button className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Project
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Users className="w-4 h-4 mr-2" />
                        Manage Team
                      </Button>
                    </>
                  )}
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    View All Tasks
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Project Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Project Name</label>
                <Input placeholder="Enter project name" />
              </div>
              <div>
                <label className="text-sm">Status</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm">Description</label>
              <Textarea placeholder="Enter project description" rows={3} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Start Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm">End Date</label>
                <Input type="date" />
              </div>
            </div>
            
            <div>
              <label className="text-sm">Budget (Optional)</label>
              <Input type="number" placeholder="Enter budget amount" />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateModalOpen(false)}>
                Create Project
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}