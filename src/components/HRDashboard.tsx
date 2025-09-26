import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  TrendingUp, 
  Star, 
  AlertTriangle,
  Award,
  DollarSign,
  BookOpen,
  Filter,
  Search,
  Brain,
  Zap,
  Target,
  Activity,
  Calendar,
  BarChart3
} from 'lucide-react';
import { Employee, HRAction } from '../types';
import { 
  mockEmployees, 
  mockHRActions, 
  mockPerformanceHistory, 
  mockSkillsData, 
  mockGoalsData, 
  mockProductivityHeatmap,
  mockWeeklyActivity,
  mockAttendanceData
} from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { PerformanceTrendChart } from './analytics/PerformanceTrendChart';
import { ProductivityHeatmap } from './analytics/ProductivityHeatmap';
import { SkillsRadarChart } from './analytics/SkillsRadarChart';
import { GoalTrackingWidget } from './analytics/GoalTrackingWidget';
import { RealTimeActivityFeed } from './analytics/RealTimeActivityFeed';

interface HRDashboardProps {
  hrUser: Employee;
}

export function HRDashboard({ hrUser }: HRDashboardProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [hrActions, setHRActions] = useState<HRAction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [performanceFilter, setPerformanceFilter] = useState('all');

  useEffect(() => {
    setEmployees(mockEmployees.filter(emp => emp.role !== 'hr'));
    setHRActions(mockHRActions);
  }, []);

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesPerformance = performanceFilter === 'all' || 
                              (performanceFilter === 'high' && employee.performanceScore >= 85) ||
                              (performanceFilter === 'medium' && employee.performanceScore >= 70 && employee.performanceScore < 85) ||
                              (performanceFilter === 'low' && employee.performanceScore < 70);
    
    return matchesSearch && matchesDepartment && matchesPerformance;
  });

  // AI-like recommendations
  const generateAIRecommendations = (employee: Employee) => {
    const recommendations = [];
    
    if (employee.performanceScore >= 90 && employee.skillLevel >= 85) {
      recommendations.push({
        type: 'promotion',
        text: 'Excellent candidate for promotion',
        icon: Award,
        color: 'text-green-600'
      });
    }
    
    if (employee.performanceScore >= 85 && employee.attendance >= 95) {
      recommendations.push({
        type: 'salary-hike',
        text: 'Deserves salary increase',
        icon: DollarSign,
        color: 'text-blue-600'
      });
    }
    
    if (employee.skillLevel < 75) {
      recommendations.push({
        type: 'training',
        text: 'Recommend skill development',
        icon: BookOpen,
        color: 'text-yellow-600'
      });
    }
    
    if (employee.engagement < 70) {
      recommendations.push({
        type: 'engagement',
        text: 'Low engagement - needs attention',
        icon: AlertTriangle,
        color: 'text-red-600'
      });
    }
    
    return recommendations;
  };

  const departmentData = employees.reduce((acc, emp) => {
    const dept = emp.department;
    if (!acc[dept]) {
      acc[dept] = { name: dept, count: 0, avgPerformance: 0, totalPerformance: 0 };
    }
    acc[dept].count++;
    acc[dept].totalPerformance += emp.performanceScore;
    acc[dept].avgPerformance = acc[dept].totalPerformance / acc[dept].count;
    return acc;
  }, {} as Record<string, { name: string; count: number; avgPerformance: number; totalPerformance: number }>);

  const departmentChartData = Object.values(departmentData);

  const performanceDistribution = [
    { range: '90-100%', count: employees.filter(e => e.performanceScore >= 90).length, color: '#22c55e' },
    { range: '80-89%', count: employees.filter(e => e.performanceScore >= 80 && e.performanceScore < 90).length, color: '#3b82f6' },
    { range: '70-79%', count: employees.filter(e => e.performanceScore >= 70 && e.performanceScore < 80).length, color: '#f59e0b' },
    { range: '60-69%', count: employees.filter(e => e.performanceScore >= 60 && e.performanceScore < 70).length, color: '#ef4444' },
    { range: '&lt;60%', count: employees.filter(e => e.performanceScore < 60).length, color: '#7c2d12' }
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

  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return { variant: 'default' as const, text: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 75) return { variant: 'secondary' as const, text: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (score >= 60) return { variant: 'outline' as const, text: 'Average', color: 'bg-yellow-100 text-yellow-800' };
    return { variant: 'destructive' as const, text: 'Poor', color: 'bg-red-100 text-red-800' };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1>HR Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              AI-Powered Employee Performance & Insights
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <Badge className="bg-purple-100 text-purple-800">AI Insights Active</Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Employees</p>
                  <p className="text-2xl">{employees.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <div className="mt-2">
                <p className="text-xs text-green-600">+2 this month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Performance</p>
                  <p className="text-2xl">{(employees.reduce((s, e) => s + e.performanceScore, 0) / employees.length).toFixed(1)}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div className="mt-2">
                <p className="text-xs text-green-600">+3.2% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Performers</p>
                  <p className="text-2xl">{employees.filter(e => e.performanceScore >= 85).length}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="mt-2">
                <p className="text-xs text-muted-foreground">≥85% performance</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Actions</p>
                  <p className="text-2xl">{hrActions.filter(a => a.status === 'pending').length}</p>
                </div>
                <Zap className="w-8 h-8 text-purple-500" />
              </div>
              <div className="mt-2">
                <p className="text-xs text-muted-foreground">AI recommendations</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="productivity">Productivity</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Department Performance */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Department Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={departmentChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Avg Performance']} />
                        <Bar dataKey="avgPerformance" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Performance Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceDistribution.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm">{item.range}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{item.count} employees</span>
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                backgroundColor: item.color, 
                                width: `${(item.count / employees.length) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Activity Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Weekly Activity Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockWeeklyActivity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="productivity" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="attendance" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="engagement" stackId="3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Real-Time Activity Feed */}
              <RealTimeActivityFeed />
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <PerformanceTrendChart data={mockPerformanceHistory} height={400} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attendance Patterns */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Attendance Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockAttendanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="present" fill="#10b981" name="Present" />
                        <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                        <Bar dataKey="late" fill="#f59e0b" name="Late" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Prediction */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Performance Predictions
                  </CardTitle>
                  <CardDescription>
                    Predictive analytics based on current trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-800">Positive Trend</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Engineering team performance expected to increase by 5% next quarter
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-yellow-800">Attention Needed</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Design team engagement may decline without intervention
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-800">Opportunity</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Sales team ready for advanced training programs
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="productivity" className="space-y-6">
            <ProductivityHeatmap data={mockProductivityHeatmap} />
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <SkillsRadarChart data={mockSkillsData} />
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <GoalTrackingWidget goals={mockGoalsData} />
          </TabsContent>
        </Tabs>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Employee Performance Analytics
            </CardTitle>
            <CardDescription>
              AI-powered insights and recommendations for each employee
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Performance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Performance</SelectItem>
                  <SelectItem value="high">High (≥85%)</SelectItem>
                  <SelectItem value="medium">Medium (70-84%)</SelectItem>
                  <SelectItem value="low">Low (&lt;70%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredEmployees.map((employee) => {
                const recommendations = generateAIRecommendations(employee);
                const performanceBadge = getPerformanceBadge(employee.performanceScore);
                
                return (
                  <div key={employee.id} className="p-6 border rounded-lg bg-white">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg">{employee.name}</h3>
                            <Badge className={performanceBadge.color}>
                              {performanceBadge.text}
                            </Badge>
                            {employee.isCheckedIn && (
                              <Badge variant="outline" className="text-green-600 border-green-200">
                                Online
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {employee.position} • {employee.department}
                          </p>
                          
                          {/* Performance Metrics */}
                          <div className="grid grid-cols-5 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Productivity</p>
                              <p className="text-sm">{employee.productivity}%</p>
                              <Progress value={employee.productivity} className="h-1 mt-1" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Attendance</p>
                              <p className="text-sm">{employee.attendance}%</p>
                              <Progress value={employee.attendance} className="h-1 mt-1" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Task Completion</p>
                              <p className="text-sm">{employee.taskCompletion}%</p>
                              <Progress value={employee.taskCompletion} className="h-1 mt-1" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Skill Level</p>
                              <p className="text-sm">{employee.skillLevel}%</p>
                              <Progress value={employee.skillLevel} className="h-1 mt-1" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Engagement</p>
                              <p className="text-sm">{employee.engagement}%</p>
                              <Progress value={employee.engagement} className="h-1 mt-1" />
                            </div>
                          </div>

                          {/* AI Recommendations */}
                          {recommendations.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Brain className="w-3 h-3" />
                                AI Recommendations:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {recommendations.map((rec, index) => (
                                  <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-md">
                                    <rec.icon className={`w-3 h-3 ${rec.color}`} />
                                    <span className="text-xs">{rec.text}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`text-xl ${getPerformanceColor(employee.performanceScore)}`}>
                          {employee.performanceScore}%
                        </p>
                        <p className="text-xs text-muted-foreground">Overall Score</p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm">
                            Take Action
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent HR Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Recent HR Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hrActions.slice(0, 5).map((action) => {
                const employee = employees.find(e => e.id === action.employeeId);
                const getActionIcon = (type: string) => {
                  switch (type) {
                    case 'promotion': return Award;
                    case 'salary-hike': return DollarSign;
                    case 'training': return BookOpen;
                    default: return AlertTriangle;
                  }
                };
                const ActionIcon = getActionIcon(action.type);
                
                return (
                  <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <ActionIcon className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm">{action.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {employee?.name} • {new Date(action.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={action.status === 'approved' ? 'default' : action.status === 'pending' ? 'secondary' : 'destructive'}>
                      {action.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}