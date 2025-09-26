import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { 
  Clock, 
  Calendar as CalendarIcon, 
  Play, 
  Pause, 
  Square,
  Plus,
  Download,
  Filter,
  CheckCircle
} from 'lucide-react';
import { Employee } from '../../types';

interface TimesheetPageProps {
  currentUser: Employee;
}

export function TimesheetPage({ currentUser }: TimesheetPageProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);

  // Mock timesheet data
  const mockTimesheetEntries = [
    {
      id: '1',
      date: '2024-11-26',
      task: 'Authentication Module Development',
      startTime: '09:00',
      endTime: '11:30',
      duration: 2.5,
      description: 'Implemented JWT token authentication and user session management',
      approved: true
    },
    {
      id: '2',
      date: '2024-11-26',
      task: 'Code Review',
      startTime: '14:00',
      endTime: '15:30',
      duration: 1.5,
      description: 'Reviewed pull requests for UI components',
      approved: true
    },
    {
      id: '3',
      date: '2024-11-25',
      task: 'Database Schema Design',
      startTime: '10:00',
      endTime: '12:00',
      duration: 2.0,
      description: 'Designed user management database schema',
      approved: false
    },
    {
      id: '4',
      date: '2024-11-25',
      task: 'Team Meeting',
      startTime: '14:30',
      endTime: '15:30',
      duration: 1.0,
      description: 'Sprint planning and task assignment',
      approved: true
    }
  ];

  const weeklyStats = {
    totalHours: 32.5,
    targetHours: 40,
    billableHours: 28.5,
    overtimeHours: 0,
    daysWorked: 4
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    if (!isTimerRunning && !currentTask) {
      setCurrentTask('New Task');
    }
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setElapsedTime(0);
    setCurrentTask('');
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const formatDuration = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Timesheet</h1>
          <p className="text-muted-foreground">Track your work hours and manage time entries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      {/* Time Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Time Tracker
          </CardTitle>
          <CardDescription>Start tracking time for your current task</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <Label htmlFor="current-task">Current Task</Label>
              <Input
                id="current-task"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                placeholder="What are you working on?"
                className="mt-1"
              />
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-mono font-bold mb-2">
                {formatTime(elapsedTime)}
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={toggleTimer} 
                  variant={isTimerRunning ? "secondary" : "default"}
                  disabled={!currentTask}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
                <Button 
                  onClick={stopTimer} 
                  variant="outline"
                  disabled={!isTimerRunning && elapsedTime === 0}
                >
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              </div>
            </div>
          </div>
          
          {isTimerRunning && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-700">Timer is running for: {currentTask}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{weeklyStats.totalHours}h</div>
            <p className="text-sm text-muted-foreground">Total Hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{weeklyStats.billableHours}h</div>
            <p className="text-sm text-muted-foreground">Billable Hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">{weeklyStats.targetHours}h</div>
            <p className="text-sm text-muted-foreground">Target Hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">{weeklyStats.overtimeHours}h</div>
            <p className="text-sm text-muted-foreground">Overtime</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">{weeklyStats.daysWorked}</div>
            <p className="text-sm text-muted-foreground">Days Worked</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Time Entries */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Time Entries</CardTitle>
              <div className="flex gap-2">
                <Select defaultValue="this-week">
                  <SelectTrigger className="w-[140px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="last-week">Last Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTimesheetEntries.map((entry) => (
                <div key={entry.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{entry.task}</h4>
                        <Badge variant={entry.approved ? 'default' : 'secondary'}>
                          {entry.approved ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approved
                            </>
                          ) : (
                            'Pending'
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{entry.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>📅 {new Date(entry.date).toLocaleDateString()}</span>
                        <span>🕐 {entry.startTime} - {entry.endTime}</span>
                        <span>⏱️ {formatDuration(entry.duration)}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold">{formatDuration(entry.duration)}</div>
                      <div className="flex gap-1 mt-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Delete</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {mockTimesheetEntries.length === 0 && (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No time entries</h3>
                <p className="text-muted-foreground">
                  Start tracking your time or add manual entries to get started.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Add Entry */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Add Entry</CardTitle>
          <CardDescription>Manually add a time entry for completed work</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="task-name">Task Name</Label>
              <Input id="task-name" placeholder="Enter task name..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input id="start-time" type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input id="end-time" type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (hours)</Label>
              <Input id="duration" type="number" step="0.5" placeholder="2.5" />
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe what you worked on..." 
              rows={3} 
            />
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}