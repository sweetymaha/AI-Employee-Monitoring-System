import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar } from '../ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Calendar as CalendarIcon,
  Clock,
  UserCheck, 
  UserX, 
  Users, 
  Search,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
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
  Cell
} from 'recharts';
import { mockEmployees, mockAttendanceData } from '../../data/mockData';
import { Employee } from '../../types';

interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'work-from-home';
  workingHours?: number;
  overtime?: number;
  break1?: { start: string; end: string };
  break2?: { start: string; end: string };
  notes?: string;
}

interface AttendanceManagementPageProps {
  currentUser: Employee;
}

// Mock attendance records
const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    employeeId: '1',
    date: '2024-11-26',
    checkIn: '09:00',
    checkOut: '17:30',
    status: 'present',
    workingHours: 8,
    overtime: 0.5,
    break1: { start: '12:00', end: '12:30' },
    break2: { start: '15:30', end: '15:45' }
  },
  {
    id: '2',
    employeeId: '8',
    date: '2024-11-26',
    checkIn: '08:30',
    checkOut: '17:00',
    status: 'present',
    workingHours: 8,
    overtime: 0,
    break1: { start: '12:00', end: '13:00' }
  },
  {
    id: '3',
    employeeId: '9',
    date: '2024-11-26',
    checkIn: '09:15',
    checkOut: '18:00',
    status: 'late',
    workingHours: 8.25,
    overtime: 1,
    break1: { start: '12:30', end: '13:30' }
  },
  {
    id: '4',
    employeeId: '10',
    date: '2024-11-26',
    status: 'absent',
    notes: 'Sick leave'
  },
  {
    id: '5',
    employeeId: '3',
    date: '2024-11-26',
    checkIn: '10:00',
    checkOut: '14:00',
    status: 'half-day',
    workingHours: 4,
    notes: 'Medical appointment'
  }
];

const COLORS = ['#22C55E', '#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6'];

export function AttendanceManagementPage({ currentUser }: AttendanceManagementPageProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Get team members for the manager
  const teamMembers = useMemo(() => {
    if (currentUser.role === 'hr') {
      return mockEmployees;
    }
    return mockEmployees.filter(emp => emp.managerId === currentUser.id);
  }, [currentUser]);

  // Get departments
  const departments = useMemo(() => {
    return [...new Set(teamMembers.map(emp => emp.department))];
  }, [teamMembers]);

  // Filter attendance records
  const filteredRecords = useMemo(() => {
    return mockAttendanceRecords.filter(record => {
      const employee = mockEmployees.find(emp => emp.id === record.employeeId);
      if (!employee || !teamMembers.find(tm => tm.id === employee.id)) return false;

      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
      const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
      
      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [searchTerm, filterStatus, filterDepartment, teamMembers]);

  // Attendance statistics
  const attendanceStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = mockAttendanceRecords.filter(record => record.date === today);
    
    const present = todayRecords.filter(r => ['present', 'late', 'half-day', 'work-from-home'].includes(r.status)).length;
    const absent = todayRecords.filter(r => r.status === 'absent').length;
    const late = todayRecords.filter(r => r.status === 'late').length;
    const workFromHome = todayRecords.filter(r => r.status === 'work-from-home').length;
    
    const total = teamMembers.length;
    const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return {
      total,
      present,
      absent,
      late,
      workFromHome,
      attendanceRate
    };
  }, [teamMembers]);

  // Department wise attendance
  const departmentAttendance = useMemo(() => {
    return departments.map(dept => {
      const deptEmployees = teamMembers.filter(emp => emp.department === dept);
      const deptRecords = mockAttendanceRecords.filter(record => {
        const employee = mockEmployees.find(emp => emp.id === record.employeeId);
        return employee && employee.department === dept;
      });
      
      const present = deptRecords.filter(r => ['present', 'late', 'half-day', 'work-from-home'].includes(r.status)).length;
      const total = deptEmployees.length;
      const rate = total > 0 ? Math.round((present / total) * 100) : 0;
      
      return {
        department: dept,
        present,
        total,
        rate
      };
    });
  }, [departments, teamMembers]);

  // Status distribution for pie chart
  const statusDistribution = useMemo(() => {
    const statusCounts = mockAttendanceRecords.reduce((acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status.replace('-', ' ').toUpperCase(),
      value: count,
      color: status === 'present' ? '#22C55E' :
             status === 'absent' ? '#EF4444' :
             status === 'late' ? '#F59E0B' :
             status === 'half-day' ? '#3B82F6' : '#8B5CF6'
    }));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'half-day': return 'bg-blue-100 text-blue-800';
      case 'work-from-home': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'absent': return <UserX className="w-4 h-4" />;
      case 'late': return <Clock className="w-4 h-4" />;
      case 'half-day': return <Clock className="w-4 h-4" />;
      case 'work-from-home': return <UserCheck className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Attendance Management</h1>
          <p className="text-muted-foreground">Monitor and manage team attendance</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <CalendarIcon className="w-4 h-4 mr-2" />
            Mark Attendance
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Today's Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{attendanceStats.total}</p>
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
                    <p className="text-2xl">{attendanceStats.present}</p>
                    <p className="text-sm text-muted-foreground">Present Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <UserX className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{attendanceStats.absent}</p>
                    <p className="text-sm text-muted-foreground">Absent Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{attendanceStats.late}</p>
                    <p className="text-sm text-muted-foreground">Late Arrivals</p>
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
                    <p className="text-2xl">{attendanceStats.attendanceRate}%</p>
                    <p className="text-sm text-muted-foreground">Attendance Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Attendance Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={mockAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="present" fill="#22c55e" name="Present" />
                    <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                    <Bar dataKey="late" fill="#f59e0b" name="Late" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Department Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentAttendance.map(dept => (
                  <div key={dept.department} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="text-sm">{dept.department}</h4>
                      <p className="text-xs text-muted-foreground">
                        {dept.present} of {dept.total} employees present
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{dept.rate}%</span>
                        {dept.rate >= 90 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : dept.rate >= 80 ? (
                          <TrendingUp className="w-4 h-4 text-yellow-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          {/* Filters */}
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
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="half-day">Half Day</SelectItem>
                <SelectItem value="work-from-home">Work from Home</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
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

          {/* Attendance Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Working Hours</TableHead>
                    <TableHead>Overtime</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map(record => {
                    const employee = mockEmployees.find(emp => emp.id === record.employeeId);
                    if (!employee) return null;

                    return (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>
                                {employee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm">{employee.name}</p>
                              <p className="text-xs text-muted-foreground">{employee.position}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(record.status)}
                              {record.status.replace('-', ' ')}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>{record.checkIn || '-'}</TableCell>
                        <TableCell>{record.checkOut || '-'}</TableCell>
                        <TableCell>{record.workingHours ? `${record.workingHours}h` : '-'}</TableCell>
                        <TableCell>
                          {record.overtime ? (
                            <span className="text-green-600">{record.overtime}h</span>
                          ) : '-'}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {record.notes || '-'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={2} name="Present" />
                  <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} name="Absent" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="text-lg mb-2">Average Attendance</h3>
                <p className="text-3xl text-green-600">92.5%</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="text-lg mb-2">Perfect Attendance</h3>
                <p className="text-3xl text-blue-600">8</p>
                <p className="text-sm text-muted-foreground">Employees</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="text-lg mb-2">Average Late Arrivals</h3>
                <p className="text-3xl text-yellow-600">2.3</p>
                <p className="text-sm text-muted-foreground">Per Week</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg mb-4">Working Hours</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Standard Work Day</span>
                      <span className="text-sm">8 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Office Start Time</span>
                      <span className="text-sm">9:00 AM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Office End Time</span>
                      <span className="text-sm">5:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Late Threshold</span>
                      <span className="text-sm">15 minutes</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg mb-4">Leave Policies</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Annual Leave Days</span>
                      <span className="text-sm">25 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sick Leave Days</span>
                      <span className="text-sm">12 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Personal Leave Days</span>
                      <span className="text-sm">5 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Work From Home</span>
                      <span className="text-sm">2 days/week</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button>Update Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}