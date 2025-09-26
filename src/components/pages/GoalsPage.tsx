import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Target, 
  Plus, 
  TrendingUp, 
  Calendar, 
  Award, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Trophy,
  Zap,
  Star,
  Edit,
  Eye
} from 'lucide-react';
import { Employee } from '../../types';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'skill' | 'project' | 'personal';
  status: 'not-started' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  targetValue: number;
  currentValue: number;
  unit: string;
  dueDate: string;
  createdAt: string;
  completedAt?: string;
}

interface GoalsPageProps {
  currentUser: Employee;
}

// Mock goals data
const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Improve Code Quality Score',
    description: 'Achieve a code quality score of 95% or higher through better testing and documentation',
    category: 'performance',
    status: 'in-progress',
    priority: 'high',
    progress: 78,
    targetValue: 95,
    currentValue: 78,
    unit: '%',
    dueDate: '2024-12-31',
    createdAt: '2024-11-01'
  },
  {
    id: '2',
    title: 'Complete React Advanced Course',
    description: 'Complete the advanced React course to improve frontend development skills',
    category: 'skill',
    status: 'in-progress',
    priority: 'medium',
    progress: 60,
    targetValue: 100,
    currentValue: 60,
    unit: '%',
    dueDate: '2024-12-15',
    createdAt: '2024-10-15'
  },
  {
    id: '3',
    title: 'Lead Team Project',
    description: 'Successfully lead the new authentication system project from start to finish',
    category: 'project',
    status: 'in-progress',
    priority: 'high',
    progress: 45,
    targetValue: 100,
    currentValue: 45,
    unit: '%',
    dueDate: '2025-01-30',
    createdAt: '2024-11-15'
  },
  {
    id: '4',
    title: 'Increase Task Completion Rate',
    description: 'Achieve 95% task completion rate consistently for 3 months',
    category: 'performance',
    status: 'completed',
    priority: 'medium',
    progress: 100,
    targetValue: 95,
    currentValue: 97,
    unit: '%',
    dueDate: '2024-11-30',
    createdAt: '2024-09-01',
    completedAt: '2024-11-28'
  },
  {
    id: '5',
    title: 'Mentor Junior Developer',
    description: 'Provide mentorship to at least one junior developer for 6 months',
    category: 'personal',
    status: 'not-started',
    priority: 'low',
    progress: 0,
    targetValue: 6,
    currentValue: 0,
    unit: 'months',
    dueDate: '2025-06-30',
    createdAt: '2024-11-20'
  },
  {
    id: '6',
    title: 'Attend 5 Tech Conferences',
    description: 'Participate in at least 5 technology conferences or workshops this year',
    category: 'skill',
    status: 'in-progress',
    priority: 'low',
    progress: 40,
    targetValue: 5,
    currentValue: 2,
    unit: 'events',
    dueDate: '2024-12-31',
    createdAt: '2024-01-01'
  }
];

export function GoalsPage({ currentUser }: GoalsPageProps) {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter goals
  const filteredGoals = useMemo(() => {
    return mockGoals.filter(goal => {
      const matchesCategory = filterCategory === 'all' || goal.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || goal.status === filterStatus;
      return matchesCategory && matchesStatus;
    });
  }, [filterCategory, filterStatus]);

  // Goal statistics
  const goalStats = useMemo(() => {
    const total = mockGoals.length;
    const completed = mockGoals.filter(g => g.status === 'completed').length;
    const inProgress = mockGoals.filter(g => g.status === 'in-progress').length;
    const overdue = mockGoals.filter(g => g.status === 'overdue').length;
    const avgProgress = mockGoals.reduce((sum, g) => sum + g.progress, 0) / total;
    
    return {
      total,
      completed,
      inProgress,
      overdue,
      avgProgress: Math.round(avgProgress)
    };
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'bg-blue-100 text-blue-800';
      case 'skill': return 'bg-green-100 text-green-800';
      case 'project': return 'bg-purple-100 text-purple-800';
      case 'personal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return <TrendingUp className="w-4 h-4" />;
      case 'skill': return <Zap className="w-4 h-4" />;
      case 'project': return <Target className="w-4 h-4" />;
      case 'personal': return <Star className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Goals & Objectives</h1>
          <p className="text-muted-foreground">Track your progress and achieve your targets</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Goal
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Goal Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{goalStats.total}</p>
                    <p className="text-sm text-muted-foreground">Total Goals</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{goalStats.completed}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{goalStats.inProgress}</p>
                    <p className="text-sm text-muted-foreground">In Progress</p>
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
                    <p className="text-2xl">{goalStats.avgProgress}%</p>
                    <p className="text-sm text-muted-foreground">Avg Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Goal Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockGoals.slice(0, 5).map(goal => (
                  <div key={goal.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getCategoryIcon(goal.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm truncate">{goal.title}</h4>
                        <Badge className={getCategoryColor(goal.category)} size="sm">
                          {goal.category}
                        </Badge>
                        <Badge className={getStatusColor(goal.status)} size="sm">
                          {goal.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <Progress value={goal.progress} className="h-2" />
                        </div>
                        <span className="text-sm text-muted-foreground min-w-fit">
                          {goal.currentValue} / {goal.targetValue} {goal.unit}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedGoal(goal)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="skill">Skill Development</SelectItem>
                <SelectItem value="project">Project Goals</SelectItem>
                <SelectItem value="personal">Personal Growth</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Goals Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGoals.map(goal => (
              <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getCategoryIcon(goal.category)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {goal.description}
                        </p>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(goal.priority)} size="sm">
                      {goal.priority}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Current: {goal.currentValue} {goal.unit}</span>
                      <span>Target: {goal.targetValue} {goal.unit}</span>
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(goal.category)} size="sm">
                        {goal.category}
                      </Badge>
                      <Badge className={getStatusColor(goal.status)} size="sm">
                        {goal.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {new Date(goal.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedGoal(goal)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          {/* Achievement Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="p-3 bg-yellow-100 rounded-lg w-fit mx-auto mb-3">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                </div>
                <p className="text-2xl">{goalStats.completed}</p>
                <p className="text-sm text-muted-foreground">Goals Completed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-2xl">85%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-3">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-2xl">12</p>
                <p className="text-sm text-muted-foreground">Streak Days</p>
              </CardContent>
            </Card>
          </div>

          {/* Completed Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockGoals
                  .filter(goal => goal.status === 'completed')
                  .map(goal => (
                    <div key={goal.id} className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Trophy className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm">{goal.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          Completed on {goal.completedAt && new Date(goal.completedAt).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getCategoryColor(goal.category)} size="sm">
                            {goal.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Achieved: {goal.currentValue} {goal.unit}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">100%</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Badges & Recognition */}
          <Card>
            <CardHeader>
              <CardTitle>Earned Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm">Goal Achiever</p>
                  <p className="text-xs text-muted-foreground">Complete 5 goals</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm">Skill Master</p>
                  <p className="text-xs text-muted-foreground">Complete 3 skill goals</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm">High Performer</p>
                  <p className="text-xs text-muted-foreground">90%+ completion rate</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm">Project Leader</p>
                  <p className="text-xs text-muted-foreground">Lead 2 projects</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Goal Detail Modal */}
      {selectedGoal && (
        <Dialog open={!!selectedGoal} onOpenChange={() => setSelectedGoal(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getCategoryIcon(selectedGoal.category)}
                </div>
                <div>
                  <h2>{selectedGoal.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getCategoryColor(selectedGoal.category)} size="sm">
                      {selectedGoal.category}
                    </Badge>
                    <Badge className={getStatusColor(selectedGoal.status)} size="sm">
                      {selectedGoal.status.replace('-', ' ')}
                    </Badge>
                    <Badge className={getPriorityColor(selectedGoal.priority)} size="sm">
                      {selectedGoal.priority}
                    </Badge>
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <h3 className="mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedGoal.description}
                </p>
              </div>

              <div>
                <h3 className="mb-3">Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{selectedGoal.progress}%</span>
                  </div>
                  <Progress value={selectedGoal.progress} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Current: {selectedGoal.currentValue} {selectedGoal.unit}</span>
                    <span>Target: {selectedGoal.targetValue} {selectedGoal.unit}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="mb-2">Timeline</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Created:</span>
                      <span>{new Date(selectedGoal.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due Date:</span>
                      <span>{new Date(selectedGoal.dueDate).toLocaleDateString()}</span>
                    </div>
                    {selectedGoal.completedAt && (
                      <div className="flex justify-between">
                        <span>Completed:</span>
                        <span>{new Date(selectedGoal.completedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-2">Key Metrics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Priority:</span>
                      <Badge className={getPriorityColor(selectedGoal.priority)} size="sm">
                        {selectedGoal.priority}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <Badge className={getCategoryColor(selectedGoal.category)} size="sm">
                        {selectedGoal.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Goal
                </Button>
                <Button variant="outline">
                  Update Progress
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Goal Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm">Goal Title</label>
              <Input placeholder="Enter goal title" />
            </div>
            
            <div>
              <label className="text-sm">Description</label>
              <Textarea placeholder="Describe your goal" rows={3} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="skill">Skill Development</SelectItem>
                    <SelectItem value="project">Project Goals</SelectItem>
                    <SelectItem value="personal">Personal Growth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm">Priority</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm">Target Value</label>
                <Input type="number" placeholder="100" />
              </div>
              <div>
                <label className="text-sm">Unit</label>
                <Input placeholder="%, hours, items" />
              </div>
              <div>
                <label className="text-sm">Due Date</label>
                <Input type="date" />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateModalOpen(false)}>
                Create Goal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}