import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  TrendingUp, 
  TrendingDown,
  UserCheck,
  UserX,
  Award,
  AlertTriangle,
  Building,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import { mockEmployees, mockHRActions } from '../../data/mockData';
import { Employee, HRAction } from '../../types';

interface EmployeeManagementPageProps {
  currentUser: Employee;
}

export function EmployeeManagementPage({ currentUser }: EmployeeManagementPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Filter employees based on search and department
  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }, [searchTerm, selectedDepartment]);

  // Get unique departments
  const departments = useMemo(() => {
    return [...new Set(mockEmployees.map(emp => emp.department))];
  }, []);

  // Department statistics
  const departmentStats = useMemo(() => {
    return departments.map(dept => {
      const deptEmployees = mockEmployees.filter(emp => emp.department === dept);
      const avgPerformance = deptEmployees.reduce((sum, emp) => sum + emp.performanceScore, 0) / deptEmployees.length;
      const checkedIn = deptEmployees.filter(emp => emp.isCheckedIn).length;
      
      return {
        name: dept,
        count: deptEmployees.length,
        avgPerformance: Math.round(avgPerformance * 10) / 10,
        checkedIn,
        attendanceRate: Math.round((checkedIn / deptEmployees.length) * 100)
      };
    });
  }, [departments]);

  // Performance distribution
  const performanceDistribution = useMemo(() => {
    const excellent = mockEmployees.filter(emp => emp.performanceScore >= 90).length;
    const good = mockEmployees.filter(emp => emp.performanceScore >= 80 && emp.performanceScore < 90).length;
    const average = mockEmployees.filter(emp => emp.performanceScore >= 70 && emp.performanceScore < 80).length;
    const needsImprovement = mockEmployees.filter(emp => emp.performanceScore < 70).length;
    
    return { excellent, good, average, needsImprovement };
  }, []);

  const getPerformanceBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-500 text-white';
    if (score >= 80) return 'bg-blue-500 text-white';
    if (score >= 70) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getPerformanceLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Employee Management</h1>
          <p className="text-muted-foreground">Comprehensive employee overview and management</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">All Employees</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="actions">HR Actions</TabsTrigger>
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
                    <p className="text-2xl">{mockEmployees.length}</p>
                    <p className="text-sm text-muted-foreground">Total Employees</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{mockEmployees.filter(emp => emp.isCheckedIn).length}</p>
                    <p className="text-sm text-muted-foreground">Currently Active</p>
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
                    <p className="text-2xl">
                      {Math.round(mockEmployees.reduce((sum, emp) => sum + emp.performanceScore, 0) / mockEmployees.length)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Avg Performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{mockHRActions.filter(action => action.status === 'pending').length}</p>
                    <p className="text-sm text-muted-foreground">Pending Actions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl text-green-600">{performanceDistribution.excellent}</p>
                  <p className="text-sm text-muted-foreground">Excellent (90%+)</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl text-blue-600">{performanceDistribution.good}</p>
                  <p className="text-sm text-muted-foreground">Good (80-89%)</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl text-yellow-600">{performanceDistribution.average}</p>
                  <p className="text-sm text-muted-foreground">Average (70-79%)</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl text-red-600">{performanceDistribution.needsImprovement}</p>
                  <p className="text-sm text-muted-foreground">Needs Improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Employee Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployees.map(employee => (
              <Card key={employee.id} className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedEmployee(employee)}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={employee.avatar} />
                      <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate">{employee.name}</h3>
                        {employee.isCheckedIn ? (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        ) : (
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{employee.position}</p>
                      <p className="text-xs text-muted-foreground">{employee.department}</p>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Performance</span>
                          <Badge className={getPerformanceBadgeColor(employee.performanceScore)}>
                            {employee.performanceScore}%
                          </Badge>
                        </div>
                        <Progress value={employee.performanceScore} className="h-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {departmentStats.map(dept => (
              <Card key={dept.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    {dept.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl">{dept.count}</p>
                      <p className="text-sm text-muted-foreground">Employees</p>
                    </div>
                    <div>
                      <p className="text-2xl">{dept.checkedIn}</p>
                      <p className="text-sm text-muted-foreground">Active Now</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Avg Performance</span>
                      <span className="text-sm">{dept.avgPerformance}%</span>
                    </div>
                    <Progress value={dept.avgPerformance} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Attendance Rate</span>
                      <span className="text-sm">{dept.attendanceRate}%</span>
                    </div>
                    <Progress value={dept.attendanceRate} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent HR Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Action Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockHRActions.map(action => {
                    const employee = mockEmployees.find(emp => emp.id === action.employeeId);
                    return (
                      <TableRow key={action.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>
                                {employee?.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {employee?.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {action.type.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {action.description}
                        </TableCell>
                        <TableCell>{action.createdAt}</TableCell>
                        <TableCell>
                          <Badge variant={action.status === 'approved' ? 'default' : 
                                        action.status === 'pending' ? 'secondary' : 'destructive'}>
                            {action.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2>{selectedEmployee.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedEmployee.position}</p>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {selectedEmployee.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      {selectedEmployee.department}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Joined {selectedEmployee.hireDate}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-2">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Performance</span>
                        <span>{selectedEmployee.performanceScore}%</span>
                      </div>
                      <Progress value={selectedEmployee.performanceScore} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Productivity</span>
                        <span>{selectedEmployee.productivity}%</span>
                      </div>
                      <Progress value={selectedEmployee.productivity} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Attendance</span>
                        <span>{selectedEmployee.attendance}%</span>
                      </div>
                      <Progress value={selectedEmployee.attendance} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2">Today's Activity</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-lg text-blue-600">{selectedEmployee.todayActivity.activeTime}h</p>
                      <p className="text-xs text-muted-foreground">Active Time</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-lg text-green-600">{selectedEmployee.todayActivity.tasksCompleted}</p>
                      <p className="text-xs text-muted-foreground">Tasks Done</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-2">Status</h3>
                  <div className="flex items-center gap-2">
                    {selectedEmployee.isCheckedIn ? (
                      <>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Active since {selectedEmployee.checkInTime}</span>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span className="text-sm">Currently offline</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm">Edit Profile</Button>
                  <Button variant="outline" size="sm">View Tasks</Button>
                  <Button variant="outline" size="sm">Performance History</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}