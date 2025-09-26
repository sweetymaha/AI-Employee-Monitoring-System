import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Target,
  Award,
  AlertTriangle,
  Building,
  DollarSign
} from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import { mockEmployees, mockPerformanceHistory, mockWeeklyActivity, mockSkillsData, mockAttendanceData } from '../../data/mockData';
import { Employee } from '../../types';

interface HRReportsPageProps {
  currentUser: Employee;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function HRReportsPage({ currentUser }: HRReportsPageProps) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 10, 1),
    to: new Date(2024, 10, 30)
  });
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [reportType, setReportType] = useState('performance');

  // Filter employees based on selected department
  const filteredEmployees = useMemo(() => {
    if (selectedDepartment === 'all') {
      return mockEmployees;
    }
    return mockEmployees.filter(emp => emp.department === selectedDepartment);
  }, [selectedDepartment]);

  // Get unique departments
  const departments = useMemo(() => {
    return Array.from(new Set(mockEmployees.map(emp => emp.department)));
  }, []);

  // Calculate key performance metrics
  const performanceMetrics = useMemo(() => {
    const totalEmployees = filteredEmployees.length;
    const avgPerformance = Math.round(
      filteredEmployees.reduce((sum, emp) => sum + emp.performanceScore, 0) / totalEmployees
    );
    const avgAttendance = Math.round(
      filteredEmployees.reduce((sum, emp) => sum + emp.attendance, 0) / totalEmployees
    );
    const avgProductivity = Math.round(
      filteredEmployees.reduce((sum, emp) => sum + emp.productivity, 0) / totalEmployees
    );
    const checkedInEmployees = filteredEmployees.filter(emp => emp.isCheckedIn).length;
    
    return {
      totalEmployees,
      avgPerformance,
      avgAttendance,
      avgProductivity,
      checkedInEmployees,
      checkedInPercentage: Math.round((checkedInEmployees / totalEmployees) * 100)
    };
  }, [filteredEmployees]);

  // Department comparison data
  const departmentComparison = useMemo(() => {
    return departments.map(dept => {
      const deptEmployees = mockEmployees.filter(emp => emp.department === dept);
      return {
        department: dept,
        performance: Math.round(deptEmployees.reduce((sum, emp) => sum + emp.performanceScore, 0) / deptEmployees.length),
        productivity: Math.round(deptEmployees.reduce((sum, emp) => sum + emp.productivity, 0) / deptEmployees.length),
        attendance: Math.round(deptEmployees.reduce((sum, emp) => sum + emp.attendance, 0) / deptEmployees.length),
        employees: deptEmployees.length
      };
    });
  }, [departments]);

  // Turnover and retention data
  const retentionData = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const newHires = mockEmployees.filter(emp => new Date(emp.hireDate).getFullYear() === currentYear).length;
    const totalEmployees = mockEmployees.length;
    const retentionRate = ((totalEmployees - newHires) / totalEmployees) * 100;
    
    return {
      totalEmployees,
      newHires,
      retentionRate: Math.round(retentionRate * 10) / 10,
      turnoverRate: Math.round((100 - retentionRate) * 10) / 10
    };
  }, []);

  // Performance distribution for pie chart
  const performanceDistribution = useMemo(() => {
    const excellent = filteredEmployees.filter(emp => emp.performanceScore >= 90).length;
    const good = filteredEmployees.filter(emp => emp.performanceScore >= 80 && emp.performanceScore < 90).length;
    const average = filteredEmployees.filter(emp => emp.performanceScore >= 70 && emp.performanceScore < 80).length;
    const needsImprovement = filteredEmployees.filter(emp => emp.performanceScore < 70).length;
    
    return [
      { name: 'Excellent (90%+)', value: excellent, color: '#22C55E' },
      { name: 'Good (80-89%)', value: good, color: '#3B82F6' },
      { name: 'Average (70-79%)', value: average, color: '#F59E0B' },
      { name: 'Needs Improvement', value: needsImprovement, color: '#EF4444' }
    ];
  }, [filteredEmployees]);

  // Salary and cost analysis (mock data)
  const salaryAnalysis = useMemo(() => {
    return departments.map(dept => {
      const deptEmployees = mockEmployees.filter(emp => emp.department === dept);
      // Mock salary data based on department and position
      const avgSalary = dept === 'Engineering' ? 95000 :
                       dept === 'Design' ? 75000 :
                       dept === 'Marketing' ? 65000 :
                       dept === 'Sales' ? 70000 :
                       dept === 'Product' ? 85000 : 60000;
      
      return {
        department: dept,
        employees: deptEmployees.length,
        avgSalary,
        totalCost: deptEmployees.length * avgSalary,
        costPerPerformancePoint: Math.round((avgSalary / deptEmployees.reduce((sum, emp) => sum + emp.performanceScore, 0) * deptEmployees.length) * 100)
      };
    });
  }, [departments]);

  const generateReport = () => {
    // Mock report generation
    console.log('Generating report for:', {
      type: reportType,
      department: selectedDepartment,
      dateRange
    });
    // In a real app, this would trigger a download
    alert('Report generated! (This is a demo)');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">HR Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive reporting and data insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={generateReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{filteredEmployees.length}</p>
                    <p className="text-sm text-muted-foreground">Total Employees</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{performanceMetrics.avgPerformance}%</p>
                    <p className="text-sm text-muted-foreground">Avg Performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{performanceMetrics.avgAttendance}%</p>
                    <p className="text-sm text-muted-foreground">Avg Attendance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Target className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{performanceMetrics.avgProductivity}%</p>
                    <p className="text-sm text-muted-foreground">Avg Productivity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="performance" fill="#8884d8" name="Performance" />
                  <Bar dataKey="productivity" fill="#82ca9d" name="Productivity" />
                  <Bar dataKey="attendance" fill="#ffc658" name="Attendance" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={performanceDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {performanceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={mockPerformanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="overall" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="retention" className="space-y-6">
          {/* Retention Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{retentionData.retentionRate}%</p>
                    <p className="text-sm text-muted-foreground">Retention Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{retentionData.turnoverRate}%</p>
                    <p className="text-sm text-muted-foreground">Turnover Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{retentionData.newHires}</p>
                    <p className="text-sm text-muted-foreground">New Hires (2024)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Building className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{retentionData.totalEmployees}</p>
                    <p className="text-sm text-muted-foreground">Total Employees</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Retention Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg">Key Retention Factors</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm">High Performers (90%+)</span>
                      <Badge className="bg-green-100 text-green-800">95% Retention</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm">Mid Performers (70-89%)</span>
                      <Badge className="bg-blue-100 text-blue-800">88% Retention</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm">Low Performers (below 70%)</span>
                      <Badge className="bg-yellow-100 text-yellow-800">65% Retention</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg">Risk Indicators</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-sm">Low Engagement (below 70%)</p>
                        <p className="text-xs text-muted-foreground">3 employees at risk</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-sm">Poor Attendance (below 85%)</p>
                        <p className="text-xs text-muted-foreground">2 employees need attention</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Target className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="text-sm">Low Task Completion</p>
                        <p className="text-xs text-muted-foreground">4 employees underperforming</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockWeeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="productivity" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="engagement" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills Development</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockSkillsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgLevel" fill="#8884d8" name="Average Level" />
                    <Bar dataKey="growth" fill="#82ca9d" name="Growth %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#22C55E" name="Present" />
                  <Bar dataKey="absent" fill="#EF4444" name="Absent" />
                  <Bar dataKey="late" fill="#F59E0B" name="Late" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Cost Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salaryAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'totalCost') {
                        return [`$${value.toLocaleString()}`, 'Total Cost'];
                      }
                      if (name === 'avgSalary') {
                        return [`$${value.toLocaleString()}`, 'Average Salary'];
                      }
                      return [value, name];
                    }}
                  />
                  <Bar dataKey="totalCost" fill="#8884d8" name="Total Cost" />
                  <Bar dataKey="avgSalary" fill="#82ca9d" name="Average Salary" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}