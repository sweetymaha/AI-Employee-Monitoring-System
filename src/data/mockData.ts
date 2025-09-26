import { Employee, Task, Project, ActivityLog, HRAction } from '../types';

export const mockEmployees: Employee[] = [
  // Engineering Team
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'employee',
    department: 'Engineering',
    position: 'Senior Developer',
    hireDate: '2022-03-15',
    managerId: '2',
    productivity: 87,
    attendance: 95,
    taskCompletion: 92,
    skillLevel: 85,
    engagement: 78,
    performanceScore: 87.4,
    isCheckedIn: true,
    checkInTime: '09:00',
    todayActivity: {
      activeTime: 6.5,
      idleTime: 1.5,
      tasksCompleted: 3
    }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'manager',
    department: 'Engineering',
    position: 'Engineering Manager',
    hireDate: '2021-01-20',
    productivity: 82,
    attendance: 98,
    taskCompletion: 88,
    skillLevel: 90,
    engagement: 85,
    performanceScore: 88.6,
    isCheckedIn: true,
    checkInTime: '08:45',
    todayActivity: {
      activeTime: 7.2,
      idleTime: 0.8,
      tasksCompleted: 4
    }
  },
  {
    id: '8',
    name: 'Robert Kim',
    email: 'robert.kim@company.com',
    role: 'employee',
    department: 'Engineering',
    position: 'Frontend Developer',
    hireDate: '2023-06-12',
    managerId: '2',
    productivity: 93,
    attendance: 97,
    taskCompletion: 89,
    skillLevel: 82,
    engagement: 88,
    performanceScore: 89.8,
    isCheckedIn: true,
    checkInTime: '08:30',
    todayActivity: {
      activeTime: 7.8,
      idleTime: 0.2,
      tasksCompleted: 4
    }
  },
  {
    id: '9',
    name: 'Amanda Foster',
    email: 'amanda.foster@company.com',
    role: 'employee',
    department: 'Engineering',
    position: 'Backend Developer',
    hireDate: '2021-09-05',
    managerId: '2',
    productivity: 85,
    attendance: 91,
    taskCompletion: 95,
    skillLevel: 87,
    engagement: 75,
    performanceScore: 86.6,
    isCheckedIn: false,
    todayActivity: {
      activeTime: 8.0,
      idleTime: 0,
      tasksCompleted: 5
    }
  },
  {
    id: '10',
    name: 'Chris Martinez',
    email: 'chris.martinez@company.com',
    role: 'employee',
    department: 'Engineering',
    position: 'DevOps Engineer',
    hireDate: '2022-11-20',
    managerId: '2',
    productivity: 79,
    attendance: 88,
    taskCompletion: 83,
    skillLevel: 91,
    engagement: 72,
    performanceScore: 82.6,
    isCheckedIn: true,
    checkInTime: '09:45',
    todayActivity: {
      activeTime: 6.2,
      idleTime: 1.8,
      tasksCompleted: 2
    }
  },

  // Design Team
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike.davis@company.com',
    role: 'employee',
    department: 'Design',
    position: 'UI/UX Designer',
    hireDate: '2022-08-10',
    managerId: '4',
    productivity: 91,
    attendance: 89,
    taskCompletion: 94,
    skillLevel: 88,
    engagement: 82,
    performanceScore: 88.8,
    isCheckedIn: false,
    todayActivity: {
      activeTime: 7.8,
      idleTime: 0.2,
      tasksCompleted: 5
    }
  },
  {
    id: '4',
    name: 'Emily Chen',
    email: 'emily.chen@company.com',
    role: 'manager',
    department: 'Design',
    position: 'Design Lead',
    hireDate: '2020-11-05',
    productivity: 85,
    attendance: 96,
    taskCompletion: 91,
    skillLevel: 92,
    engagement: 87,
    performanceScore: 90.2,
    isCheckedIn: true,
    checkInTime: '09:15',
    todayActivity: {
      activeTime: 6.8,
      idleTime: 1.2,
      tasksCompleted: 2
    }
  },
  {
    id: '11',
    name: 'Jessica Wong',
    email: 'jessica.wong@company.com',
    role: 'employee',
    department: 'Design',
    position: 'Product Designer',
    hireDate: '2023-01-15',
    managerId: '4',
    productivity: 88,
    attendance: 93,
    taskCompletion: 87,
    skillLevel: 84,
    engagement: 91,
    performanceScore: 88.6,
    isCheckedIn: true,
    checkInTime: '09:00',
    todayActivity: {
      activeTime: 7.1,
      idleTime: 0.9,
      tasksCompleted: 3
    }
  },
  {
    id: '12',
    name: 'Daniel Brown',
    email: 'daniel.brown@company.com',
    role: 'employee',
    department: 'Design',
    position: 'Visual Designer',
    hireDate: '2021-12-03',
    managerId: '4',
    productivity: 76,
    attendance: 85,
    taskCompletion: 78,
    skillLevel: 79,
    engagement: 68,
    performanceScore: 77.2,
    isCheckedIn: false,
    todayActivity: {
      activeTime: 5.8,
      idleTime: 2.2,
      tasksCompleted: 2
    }
  },

  // Marketing Team
  {
    id: '6',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@company.com',
    role: 'employee',
    department: 'Marketing',
    position: 'Digital Marketing Specialist',
    hireDate: '2023-02-01',
    managerId: '7',
    productivity: 83,
    attendance: 92,
    taskCompletion: 87,
    skillLevel: 76,
    engagement: 79,
    performanceScore: 83.4,
    isCheckedIn: true,
    checkInTime: '09:30',
    todayActivity: {
      activeTime: 5.9,
      idleTime: 2.1,
      tasksCompleted: 2
    }
  },
  {
    id: '7',
    name: 'Alex Thompson',
    email: 'alex.thompson@company.com',
    role: 'manager',
    department: 'Marketing',
    position: 'Marketing Manager',
    hireDate: '2021-07-18',
    productivity: 80,
    attendance: 97,
    taskCompletion: 89,
    skillLevel: 86,
    engagement: 84,
    performanceScore: 87.2,
    isCheckedIn: false,
    todayActivity: {
      activeTime: 8.0,
      idleTime: 0,
      tasksCompleted: 4
    }
  },
  {
    id: '13',
    name: 'Maria Gonzalez',
    email: 'maria.gonzalez@company.com',
    role: 'employee',
    department: 'Marketing',
    position: 'Content Marketing Manager',
    hireDate: '2020-04-22',
    managerId: '7',
    productivity: 94,
    attendance: 96,
    taskCompletion: 92,
    skillLevel: 89,
    engagement: 85,
    performanceScore: 91.2,
    isCheckedIn: true,
    checkInTime: '08:45',
    todayActivity: {
      activeTime: 7.6,
      idleTime: 0.4,
      tasksCompleted: 6
    }
  },
  {
    id: '14',
    name: 'Kevin Lee',
    email: 'kevin.lee@company.com',
    role: 'employee',
    department: 'Marketing',
    position: 'Social Media Manager',
    hireDate: '2022-05-18',
    managerId: '7',
    productivity: 87,
    attendance: 90,
    taskCompletion: 85,
    skillLevel: 83,
    engagement: 88,
    performanceScore: 86.6,
    isCheckedIn: true,
    checkInTime: '09:00',
    todayActivity: {
      activeTime: 6.9,
      idleTime: 1.1,
      tasksCompleted: 4
    }
  },

  // Sales Team
  {
    id: '15',
    name: 'Jennifer White',
    email: 'jennifer.white@company.com',
    role: 'manager',
    department: 'Sales',
    position: 'Sales Director',
    hireDate: '2019-08-10',
    productivity: 92,
    attendance: 98,
    taskCompletion: 94,
    skillLevel: 95,
    engagement: 89,
    performanceScore: 93.6,
    isCheckedIn: true,
    checkInTime: '08:00',
    todayActivity: {
      activeTime: 8.2,
      idleTime: 0.3,
      tasksCompleted: 7
    }
  },
  {
    id: '16',
    name: 'Michael Turner',
    email: 'michael.turner@company.com',
    role: 'employee',
    department: 'Sales',
    position: 'Senior Sales Rep',
    hireDate: '2021-03-08',
    managerId: '15',
    productivity: 89,
    attendance: 94,
    taskCompletion: 88,
    skillLevel: 87,
    engagement: 92,
    performanceScore: 90.0,
    isCheckedIn: true,
    checkInTime: '08:15',
    todayActivity: {
      activeTime: 7.9,
      idleTime: 0.6,
      tasksCompleted: 5
    }
  },
  {
    id: '17',
    name: 'Rachel Green',
    email: 'rachel.green@company.com',
    role: 'employee',
    department: 'Sales',
    position: 'Account Executive',
    hireDate: '2022-10-12',
    managerId: '15',
    productivity: 81,
    attendance: 87,
    taskCompletion: 79,
    skillLevel: 75,
    engagement: 77,
    performanceScore: 79.8,
    isCheckedIn: false,
    todayActivity: {
      activeTime: 6.1,
      idleTime: 1.9,
      tasksCompleted: 3
    }
  },

  // Product Team
  {
    id: '18',
    name: 'Steven Parker',
    email: 'steven.parker@company.com',
    role: 'manager',
    department: 'Product',
    position: 'Product Manager',
    hireDate: '2020-06-15',
    productivity: 86,
    attendance: 95,
    taskCompletion: 90,
    skillLevel: 93,
    engagement: 83,
    performanceScore: 89.4,
    isCheckedIn: true,
    checkInTime: '09:00',
    todayActivity: {
      activeTime: 7.4,
      idleTime: 1.1,
      tasksCompleted: 4
    }
  },
  {
    id: '19',
    name: 'Nicole Adams',
    email: 'nicole.adams@company.com',
    role: 'employee',
    department: 'Product',
    position: 'Product Analyst',
    hireDate: '2023-04-03',
    managerId: '18',
    productivity: 78,
    attendance: 89,
    taskCompletion: 82,
    skillLevel: 74,
    engagement: 81,
    performanceScore: 80.8,
    isCheckedIn: true,
    checkInTime: '09:15',
    todayActivity: {
      activeTime: 6.3,
      idleTime: 1.7,
      tasksCompleted: 3
    }
  },

  // HR Team
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    role: 'hr',
    department: 'Human Resources',
    position: 'HR Director',
    hireDate: '2019-05-12',
    productivity: 78,
    attendance: 94,
    taskCompletion: 86,
    skillLevel: 89,
    engagement: 91,
    performanceScore: 87.6,
    isCheckedIn: true,
    checkInTime: '08:30',
    todayActivity: {
      activeTime: 7.5,
      idleTime: 0.5,
      tasksCompleted: 6
    }
  },
  {
    id: '20',
    name: 'Laura Davis',
    email: 'laura.davis@company.com',
    role: 'employee',
    department: 'Human Resources',
    position: 'HR Specialist',
    hireDate: '2022-01-25',
    managerId: '5',
    productivity: 84,
    attendance: 92,
    taskCompletion: 88,
    skillLevel: 81,
    engagement: 86,
    performanceScore: 86.2,
    isCheckedIn: true,
    checkInTime: '08:45',
    todayActivity: {
      activeTime: 7.2,
      idleTime: 0.8,
      tasksCompleted: 4
    }
  }
];

export const mockTasks: Task[] = [
  // Engineering Tasks
  {
    id: '1',
    title: 'Implement user authentication',
    description: 'Add login/logout functionality with JWT tokens',
    assignedTo: '1',
    assignedBy: '2',
    project: '1',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-12-01',
    createdAt: '2024-11-20',
    estimatedHours: 16,
    actualHours: 8
  },
  {
    id: '3',
    title: 'Database schema optimization',
    description: 'Optimize database queries for better performance',
    assignedTo: '1',
    assignedBy: '2',
    project: '1',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-12-05',
    createdAt: '2024-11-22',
    estimatedHours: 8
  },
  {
    id: '5',
    title: 'Code review and testing',
    description: 'Review authentication implementation and write tests',
    assignedTo: '1',
    assignedBy: '2',
    project: '1',
    status: 'overdue',
    priority: 'high',
    dueDate: '2024-11-28',
    createdAt: '2024-11-25',
    estimatedHours: 6
  },
  {
    id: '21',
    title: 'Build responsive dashboard',
    description: 'Create mobile-responsive analytics dashboard',
    assignedTo: '8',
    assignedBy: '2',
    project: '1',
    status: 'completed',
    priority: 'high',
    dueDate: '2024-11-29',
    createdAt: '2024-11-15',
    completedAt: '2024-11-28',
    estimatedHours: 24,
    actualHours: 22
  },
  {
    id: '22',
    title: 'API integration testing',
    description: 'Test all API endpoints and error handling',
    assignedTo: '9',
    assignedBy: '2',
    project: '1',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2024-12-03',
    createdAt: '2024-11-25',
    estimatedHours: 12,
    actualHours: 6
  },
  {
    id: '23',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated deployment pipeline',
    assignedTo: '10',
    assignedBy: '2',
    project: '1',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-12-10',
    createdAt: '2024-11-26',
    estimatedHours: 16
  },
  {
    id: '24',
    title: 'Performance monitoring setup',
    description: 'Implement application performance monitoring',
    assignedTo: '10',
    assignedBy: '2',
    project: '1',
    status: 'pending',
    priority: 'low',
    dueDate: '2024-12-15',
    createdAt: '2024-11-26',
    estimatedHours: 8
  },

  // Design Tasks
  {
    id: '2',
    title: 'Design landing page mockups',
    description: 'Create high-fidelity mockups for the new landing page',
    assignedTo: '3',
    assignedBy: '4',
    project: '2',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-11-25',
    createdAt: '2024-11-15',
    completedAt: '2024-11-24',
    estimatedHours: 12,
    actualHours: 10
  },
  {
    id: '25',
    title: 'User experience research',
    description: 'Conduct user interviews and usability testing',
    assignedTo: '11',
    assignedBy: '4',
    project: '2',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-12-02',
    createdAt: '2024-11-20',
    estimatedHours: 20,
    actualHours: 12
  },
  {
    id: '26',
    title: 'Design system components',
    description: 'Create reusable UI components for design system',
    assignedTo: '11',
    assignedBy: '4',
    project: '2',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-11-30',
    createdAt: '2024-11-18',
    completedAt: '2024-11-29',
    estimatedHours: 16,
    actualHours: 18
  },
  {
    id: '27',
    title: 'Brand identity refresh',
    description: 'Update brand guidelines and visual assets',
    assignedTo: '12',
    assignedBy: '4',
    project: '2',
    status: 'overdue',
    priority: 'low',
    dueDate: '2024-11-25',
    createdAt: '2024-11-10',
    estimatedHours: 14
  },
  {
    id: '28',
    title: 'Mobile app wireframes',
    description: 'Create wireframes for mobile application',
    assignedTo: '3',
    assignedBy: '4',
    project: '2',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-12-08',
    createdAt: '2024-11-26',
    estimatedHours: 10
  },

  // Marketing Tasks
  {
    id: '4',
    title: 'Social media campaign setup',
    description: 'Set up Q4 social media marketing campaign',
    assignedTo: '6',
    assignedBy: '7',
    project: '3',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-11-30',
    createdAt: '2024-11-18',
    estimatedHours: 20,
    actualHours: 12
  },
  {
    id: '29',
    title: 'Content calendar planning',
    description: 'Plan content calendar for Q1 2025',
    assignedTo: '13',
    assignedBy: '7',
    project: '3',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-11-27',
    createdAt: '2024-11-15',
    completedAt: '2024-11-26',
    estimatedHours: 8,
    actualHours: 6
  },
  {
    id: '30',
    title: 'Email marketing automation',
    description: 'Set up automated email marketing sequences',
    assignedTo: '13',
    assignedBy: '7',
    project: '3',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-12-05',
    createdAt: '2024-11-22',
    estimatedHours: 15,
    actualHours: 8
  },
  {
    id: '31',
    title: 'Influencer partnership outreach',
    description: 'Reach out to potential brand partners and influencers',
    assignedTo: '14',
    assignedBy: '7',
    project: '3',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-12-12',
    createdAt: '2024-11-26',
    estimatedHours: 12
  },
  {
    id: '32',
    title: 'Analytics dashboard setup',
    description: 'Configure marketing analytics and reporting',
    assignedTo: '6',
    assignedBy: '7',
    project: '3',
    status: 'pending',
    priority: 'low',
    dueDate: '2024-12-15',
    createdAt: '2024-11-26',
    estimatedHours: 6
  },

  // Sales Tasks
  {
    id: '33',
    title: 'Q4 sales forecasting',
    description: 'Analyze sales data and create Q4 forecast',
    assignedTo: '16',
    assignedBy: '15',
    project: '4',
    status: 'completed',
    priority: 'high',
    dueDate: '2024-11-28',
    createdAt: '2024-11-20',
    completedAt: '2024-11-27',
    estimatedHours: 10,
    actualHours: 12
  },
  {
    id: '34',
    title: 'Client onboarding process',
    description: 'Streamline new client onboarding workflow',
    assignedTo: '17',
    assignedBy: '15',
    project: '4',
    status: 'overdue',
    priority: 'medium',
    dueDate: '2024-11-25',
    createdAt: '2024-11-12',
    estimatedHours: 8
  },
  {
    id: '35',
    title: 'Sales training materials',
    description: 'Update sales training documentation and materials',
    assignedTo: '16',
    assignedBy: '15',
    project: '4',
    status: 'in-progress',
    priority: 'low',
    dueDate: '2024-12-20',
    createdAt: '2024-11-26',
    estimatedHours: 14,
    actualHours: 4
  },

  // Product Tasks
  {
    id: '36',
    title: 'Product roadmap planning',
    description: 'Plan product roadmap for 2025',
    assignedTo: '19',
    assignedBy: '18',
    project: '5',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-12-01',
    createdAt: '2024-11-18',
    estimatedHours: 16,
    actualHours: 10
  },
  {
    id: '37',
    title: 'User feedback analysis',
    description: 'Analyze user feedback and feature requests',
    assignedTo: '19',
    assignedBy: '18',
    project: '5',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-12-10',
    createdAt: '2024-11-26',
    estimatedHours: 12
  },
  {
    id: '38',
    title: 'Competitive analysis report',
    description: 'Research competitors and market positioning',
    assignedTo: '19',
    assignedBy: '18',
    project: '5',
    status: 'pending',
    priority: 'low',
    dueDate: '2024-12-15',
    createdAt: '2024-11-26',
    estimatedHours: 8
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'User Management System',
    description: 'Complete user authentication and profile management system',
    managerId: '2',
    teamMembers: ['1', '8', '9', '10'],
    status: 'active',
    startDate: '2024-11-01',
    endDate: '2024-12-15',
    progress: 65,
    budget: 150000
  },
  {
    id: '2',
    name: 'Website Redesign',
    description: 'Complete redesign of company website with new branding',
    managerId: '4',
    teamMembers: ['3', '11', '12'],
    status: 'active',
    startDate: '2024-10-15',
    endDate: '2024-12-30',
    progress: 80,
    budget: 120000
  },
  {
    id: '3',
    name: 'Q4 Marketing Campaign',
    description: 'Digital marketing campaign for Q4 product launch',
    managerId: '7',
    teamMembers: ['6', '13', '14'],
    status: 'active',
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    progress: 45,
    budget: 75000
  },
  {
    id: '4',
    name: 'Sales Process Optimization',
    description: 'Streamline sales processes and improve conversion rates',
    managerId: '15',
    teamMembers: ['16', '17'],
    status: 'active',
    startDate: '2024-11-15',
    endDate: '2025-01-30',
    progress: 25,
    budget: 50000
  },
  {
    id: '5',
    name: 'Product Strategy 2025',
    description: 'Define product strategy and roadmap for 2025',
    managerId: '18',
    teamMembers: ['19'],
    status: 'planning',
    startDate: '2024-12-01',
    endDate: '2025-02-28',
    progress: 15,
    budget: 80000
  },
  {
    id: '6',
    name: 'AI Analytics Platform',
    description: 'Development of AI-powered analytics platform',
    managerId: '2',
    teamMembers: ['1', '8', '9'],
    status: 'completed',
    startDate: '2024-08-01',
    endDate: '2024-10-31',
    progress: 100,
    budget: 200000
  },
  {
    id: '7',
    name: 'Mobile App Development',
    description: 'Native mobile applications for iOS and Android',
    managerId: '4',
    teamMembers: ['3', '11'],
    status: 'on-hold',
    startDate: '2024-09-01',
    endDate: '2025-03-31',
    progress: 35,
    budget: 180000
  }
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    employeeId: '1',
    type: 'check-in',
    timestamp: '2024-11-26T09:00:00Z'
  },
  {
    id: '2',
    employeeId: '1',
    type: 'task-start',
    timestamp: '2024-11-26T09:15:00Z',
    details: 'Started working on authentication implementation'
  },
  {
    id: '3',
    employeeId: '3',
    type: 'task-complete',
    timestamp: '2024-11-24T16:30:00Z',
    details: 'Completed landing page mockups'
  }
];

export const mockHRActions: HRAction[] = [
  {
    id: '1',
    employeeId: '3',
    type: 'promotion',
    description: 'Promote to Senior UI/UX Designer based on excellent performance',
    createdBy: '5',
    createdAt: '2024-11-25',
    status: 'pending'
  },
  {
    id: '2',
    employeeId: '1',
    type: 'salary-hike',
    description: '10% salary increase for consistent high performance',
    createdBy: '5',
    createdAt: '2024-11-20',
    status: 'approved'
  },
  {
    id: '3',
    employeeId: '6',
    type: 'training',
    description: 'Enroll in advanced digital marketing certification',
    createdBy: '5',
    createdAt: '2024-11-22',
    status: 'pending'
  },
  {
    id: '4',
    employeeId: '13',
    type: 'promotion',
    description: 'Promote to Senior Content Marketing Manager',
    createdBy: '5',
    createdAt: '2024-11-26',
    status: 'approved'
  },
  {
    id: '5',
    employeeId: '16',
    type: 'salary-hike',
    description: '15% salary increase for exceeding sales targets',
    createdBy: '5',
    createdAt: '2024-11-24',
    status: 'approved'
  },
  {
    id: '6',
    employeeId: '12',
    type: 'warning',
    description: 'Performance improvement plan - attendance and engagement concerns',
    createdBy: '5',
    createdAt: '2024-11-23',
    status: 'pending'
  },
  {
    id: '7',
    employeeId: '8',
    type: 'recognition',
    description: 'Employee of the month - exceptional project delivery',
    createdBy: '5',
    createdAt: '2024-11-21',
    status: 'approved'
  },
  {
    id: '8',
    employeeId: '19',
    type: 'training',
    description: 'Product management certification program',
    createdBy: '5',
    createdAt: '2024-11-19',
    status: 'approved'
  }
];

// Historical performance data for trending analysis
export const mockPerformanceHistory = [
  // January 2024
  { month: 'Jan 2024', engineering: 82, design: 85, marketing: 78, sales: 88, product: 80, overall: 82.6 },
  // February 2024  
  { month: 'Feb 2024', engineering: 84, design: 87, marketing: 80, sales: 90, product: 82, overall: 84.6 },
  // March 2024
  { month: 'Mar 2024', engineering: 85, design: 86, marketing: 82, sales: 89, product: 84, overall: 85.2 },
  // April 2024
  { month: 'Apr 2024', engineering: 87, design: 88, marketing: 84, sales: 91, product: 85, overall: 87.0 },
  // May 2024
  { month: 'May 2024', engineering: 86, design: 90, marketing: 83, sales: 93, product: 86, overall: 87.6 },
  // June 2024
  { month: 'Jun 2024', engineering: 88, design: 89, marketing: 85, sales: 92, product: 87, overall: 88.2 },
  // July 2024
  { month: 'Jul 2024', engineering: 87, design: 91, marketing: 86, sales: 94, product: 88, overall: 89.2 },
  // August 2024
  { month: 'Aug 2024', engineering: 89, design: 88, marketing: 87, sales: 93, product: 89, overall: 89.2 },
  // September 2024
  { month: 'Sep 2024', engineering: 88, design: 89, marketing: 88, sales: 95, product: 87, overall: 89.4 },
  // October 2024
  { month: 'Oct 2024', engineering: 90, design: 90, marketing: 89, sales: 94, product: 88, overall: 90.2 },
  // November 2024
  { month: 'Nov 2024', engineering: 89, design: 88, marketing: 87, sales: 92, product: 86, overall: 88.4 }
];

// Weekly activity data for detailed analytics
export const mockWeeklyActivity = [
  { week: 'Week 1', productivity: 85, attendance: 94, engagement: 82, tasks: 156 },
  { week: 'Week 2', productivity: 87, attendance: 96, engagement: 84, tasks: 162 },
  { week: 'Week 3', productivity: 89, attendance: 95, engagement: 86, tasks: 148 },
  { week: 'Week 4', productivity: 88, attendance: 93, engagement: 85, tasks: 171 },
  { week: 'Week 5', productivity: 86, attendance: 97, engagement: 83, tasks: 159 }
];

// Skill development tracking
export const mockSkillsData = [
  { skill: 'JavaScript', employees: 8, avgLevel: 85, growth: 12 },
  { skill: 'React', employees: 6, avgLevel: 82, growth: 15 },
  { skill: 'Python', employees: 4, avgLevel: 78, growth: 8 },
  { skill: 'UI/UX Design', employees: 4, avgLevel: 87, growth: 10 },
  { skill: 'Digital Marketing', employees: 4, avgLevel: 79, growth: 18 },
  { skill: 'Sales', employees: 3, avgLevel: 86, growth: 7 },
  { skill: 'Product Management', employees: 2, avgLevel: 81, growth: 14 },
  { skill: 'Data Analysis', employees: 3, avgLevel: 76, growth: 20 }
];

// Attendance patterns
export const mockAttendanceData = [
  { day: 'Monday', present: 18, absent: 2, late: 1 },
  { day: 'Tuesday', present: 19, absent: 1, late: 1 },
  { day: 'Wednesday', present: 20, absent: 1, late: 0 },
  { day: 'Thursday', present: 19, absent: 1, late: 1 },
  { day: 'Friday', present: 17, absent: 2, late: 2 }
];

// Productivity heatmap data (hour by day)
export const mockProductivityHeatmap = [
  { hour: '09:00', monday: 78, tuesday: 82, wednesday: 85, thursday: 83, friday: 79 },
  { hour: '10:00', monday: 85, tuesday: 88, wednesday: 90, thursday: 87, friday: 84 },
  { hour: '11:00', monday: 92, tuesday: 94, wednesday: 95, thursday: 93, friday: 90 },
  { hour: '12:00', monday: 87, tuesday: 89, wednesday: 91, thursday: 88, friday: 85 },
  { hour: '13:00', monday: 65, tuesday: 68, wednesday: 70, thursday: 67, friday: 64 },
  { hour: '14:00', monday: 88, tuesday: 90, wednesday: 92, thursday: 89, friday: 86 },
  { hour: '15:00', monday: 91, tuesday: 93, wednesday: 94, thursday: 92, friday: 89 },
  { hour: '16:00', monday: 86, tuesday: 88, wednesday: 89, thursday: 87, friday: 84 },
  { hour: '17:00', monday: 82, tuesday: 84, wednesday: 85, thursday: 83, friday: 80 }
];

// Goal tracking data
export const mockGoalsData = [
  { 
    id: '1', 
    employeeId: '1', 
    title: 'Complete React certification', 
    progress: 75, 
    deadline: '2024-12-31',
    status: 'on-track'
  },
  { 
    id: '2', 
    employeeId: '3', 
    title: 'Lead 3 UX research sessions', 
    progress: 67, 
    deadline: '2024-12-15',
    status: 'on-track'
  },
  { 
    id: '3', 
    employeeId: '13', 
    title: 'Increase content engagement by 25%', 
    progress: 90, 
    deadline: '2024-11-30',
    status: 'ahead'
  },
  { 
    id: '4', 
    employeeId: '16', 
    title: 'Close $500K in sales', 
    progress: 45, 
    deadline: '2024-12-31',
    status: 'at-risk'
  }
];

// Team collaboration metrics
export const mockCollaborationData = [
  { employee: 'John Smith', meetings: 24, messages: 156, reviews: 8, mentoring: 3 },
  { employee: 'Sarah Johnson', meetings: 32, messages: 89, reviews: 15, mentoring: 7 },
  { employee: 'Mike Davis', meetings: 18, messages: 134, reviews: 6, mentoring: 2 },
  { employee: 'Emily Chen', meetings: 28, messages: 98, reviews: 12, mentoring: 5 }
];