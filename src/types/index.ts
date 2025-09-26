export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'manager' | 'hr';
  department: string;
  position: string;
  hireDate: string;
  avatar?: string;
  managerId?: string;
}

export interface Employee extends User {
  productivity: number;
  attendance: number;
  taskCompletion: number;
  skillLevel: number;
  engagement: number;
  performanceScore: number;
  isCheckedIn: boolean;
  checkInTime?: string;
  checkOutTime?: string;
  todayActivity: {
    activeTime: number;
    idleTime: number;
    tasksCompleted: number;
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  project: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  completedAt?: string;
  estimatedHours: number;
  actualHours?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  managerId: string;
  teamMembers: string[];
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  progress: number;
  budget?: number;
}

export interface ActivityLog {
  id: string;
  employeeId: string;
  type: 'check-in' | 'check-out' | 'task-start' | 'task-complete' | 'break';
  timestamp: string;
  details?: string;
}

export interface PerformanceMetrics {
  employeeId: string;
  period: string;
  productivity: number;
  attendance: number;
  taskCompletion: number;
  collaboration: number;
  skillGrowth: number;
  overallScore: number;
}

export interface HRAction {
  id: string;
  employeeId: string;
  type: 'promotion' | 'salary-hike' | 'training' | 'warning' | 'recognition';
  description: string;
  createdBy: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface TeamMetrics {
  teamId: string;
  averagePerformance: number;
  totalTasks: number;
  completedTasks: number;
  activeMembers: number;
  productivity: number;
  collaboration: number;
}

export interface SkillAssessment {
  id: string;
  employeeId: string;
  skill: string;
  level: number;
  lastAssessed: string;
  certifications: string[];
  growthRate: number;
}