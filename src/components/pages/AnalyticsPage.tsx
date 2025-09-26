import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Clock, 
  Target,
  Calendar,
  Zap,
  Brain
} from 'lucide-react';
import { Employee } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsPageProps {
  currentUser: Employee;
}

export function AnalyticsPage({ currentUser }: AnalyticsPageProps) {
  // Mock performance data for individual employee
  const performanceData = [
    { month: 'Jul', productivity: 85, attendance: 96, engagement: 78, tasks: 12 },
    { month: 'Aug', productivity: 87, attendance: 94, engagement: 82, tasks: 15 },
    { month: 'Sep', productivity: 89, attendance: 98, engagement: 84, tasks: 14 },
    { month: 'Oct', productivity: 86, attendance: 92, engagement: 86, tasks: 16 },
    { month: 'Nov', productivity: 91, attendance: 95, engagement: 88, tasks: 13 }
  ];

  const weeklyActivityData = [
    { day: 'Mon', hours: 8.2, productivity: 85, focus: 78 },
    { day: 'Tue', hours: 7.8, productivity: 92, focus: 85 },
    { day: 'Wed', hours: 8.5, productivity: 88, focus: 82 },
    { day: 'Thu', hours: 8.0, productivity: 90, focus: 87 },
    { day: 'Fri', hours: 7.5, productivity: 86, focus: 79 }
  ];

  const skillProgressData = [
    { skill: 'JavaScript', current: 85, target: 90 },
    { skill: 'React', current: 90, target: 95 },
    { skill: 'TypeScript', current: 78, target: 85 },
    { skill: 'Node.js', current: 82, target: 88 },
    { skill: 'Python', current: 65, target: 75 }
  ];

  const productivityHoursData = [
    { hour: '09:00', productivity: 75 },
    { hour: '10:00', productivity: 88 },
    { hour: '11:00', productivity: 95 },
    { hour: '12:00', productivity: 70 },
    { hour: '13:00', productivity: 60 },
    { hour: '14:00', productivity: 85 },
    { hour: '15:00', productivity: 92 },
    { hour: '16:00', productivity: 88 },
    { hour: '17:00', productivity: 78 }
  ];

  const taskCompletionData = [
    { name: 'Completed', value: 12, color: '#10b981' },
    { name: 'In Progress', value: 3, color: '#3b82f6' },
    { name: 'Pending', value: 2, color: '#f59e0b' },
    { name: 'Overdue', value: 1, color: '#ef4444' }
  ];

  const aiInsights = [
    {
      type: 'strength',
      title: 'Peak Performance Hours',
      description: 'You perform best between 10-11 AM and 3-4 PM. Consider scheduling complex tasks during these hours.',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200'
    },
    {
      type: 'improvement',
      title: 'Focus Enhancement',
      description: 'Taking 5-minute breaks every 90 minutes could improve your afternoon productivity by 15%.',
      icon: Brain,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200'
    },
    {
      type: 'goal',
      title: 'Skill Development',
      description: 'You\'re 85% towards your TypeScript skill goal. Consider taking the advanced course to reach 100%.',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Performance Analytics</h1>
          <p className="text-muted-foreground">AI-powered insights into your work patterns and performance</p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Zap className="w-3 h-3 mr-1" />
          AI Insights Active
        </Badge>
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {aiInsights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <Card key={index} className={`border-2 ${insight.bgColor}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 mt-0.5 ${insight.color}`} />
                  <div>
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performance Trends
                </CardTitle>
                <CardDescription>Your performance metrics over the last 5 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="productivity" stroke="#3b82f6" strokeWidth={2} name="Productivity" />
                      <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} name="Attendance" />
                      <Line type="monotone" dataKey="engagement" stroke="#f59e0b" strokeWidth={2} name="Engagement" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Task Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Task Distribution
                </CardTitle>
                <CardDescription>Current task status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskCompletionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {taskCompletionData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Weekly Activity Patterns
              </CardTitle>
              <CardDescription>Your work patterns throughout the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="hours" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Hours Worked" />
                    <Area type="monotone" dataKey="productivity" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Productivity %" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">{currentUser.performanceScore}%</div>
                <p className="text-sm text-muted-foreground mt-1">Overall Score</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600">{currentUser.productivity}%</div>
                <p className="text-sm text-muted-foreground mt-1">Productivity</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600">{currentUser.attendance}%</div>
                <p className="text-sm text-muted-foreground mt-1">Attendance</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-600">{currentUser.engagement}%</div>
                <p className="text-sm text-muted-foreground mt-1">Engagement</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Breakdown</CardTitle>
              <CardDescription>Detailed performance metrics for each month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="productivity" fill="#3b82f6" name="Productivity" />
                    <Bar dataKey="attendance" fill="#10b981" name="Attendance" />
                    <Bar dataKey="engagement" fill="#f59e0b" name="Engagement" />
                    <Bar dataKey="tasks" fill="#8b5cf6" name="Tasks Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Hourly Productivity Pattern
              </CardTitle>
              <CardDescription>Your productivity levels throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productivityHoursData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis domain={[50, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Productivity']} />
                    <Line type="monotone" dataKey="productivity" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">💡 AI Insight</h4>
                <p className="text-sm text-blue-700">
                  Your peak productivity hours are 11:00 AM and 3:00 PM. Consider scheduling your most important tasks during these times for optimal results.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Development Progress</CardTitle>
              <CardDescription>Track your progress towards skill development goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillProgressData.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.skill}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {skill.current}% / {skill.target}%
                        </span>
                        <Badge variant={skill.current >= skill.target ? 'default' : 'secondary'}>
                          {skill.current >= skill.target ? 'Goal Reached' : 'In Progress'}
                        </Badge>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(skill.current / skill.target) * 100}%` }}
                        />
                        <div 
                          className="absolute top-0 h-3 w-1 bg-gray-400 rounded-full"
                          style={{ left: `${(skill.target / 100) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">🎯 Goal Achievement</h4>
                <p className="text-sm text-green-700">
                  Great progress! You've reached your React skill goal and are making excellent progress on TypeScript. Consider focusing on Node.js development next quarter.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}