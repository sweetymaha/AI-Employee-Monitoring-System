import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { User, Users, UserCheck } from 'lucide-react';

interface LoginProps {
  onLogin: (userId: string, role: 'employee' | 'manager' | 'hr') => void;
}

export function Login({ onLogin }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState<'employee' | 'manager' | 'hr'>('employee');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    try {
      // In a real app, this would validate credentials
      // For demo, we'll use predefined user IDs based on role
      const userIdMap = {
        employee: '1', // John Smith
        manager: '2',  // Sarah Johnson
        hr: '5'        // David Wilson
      };
      
      onLogin(userIdMap[selectedRole], selectedRole);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const roleOptions = [
    {
      value: 'employee',
      label: 'Employee',
      icon: User,
      description: 'Access your dashboard, check-in/out, manage tasks',
      demo: 'john.smith@company.com'
    },
    {
      value: 'manager',
      label: 'Manager',
      icon: Users,
      description: 'Manage team, assign tasks, view team analytics',
      demo: 'sarah.johnson@company.com'
    },
    {
      value: 'hr',
      label: 'HR',
      icon: UserCheck,
      description: 'Full access to employee data, performance analytics',
      demo: 'david.wilson@company.com'
    }
  ] as const;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">AI Employee Monitor</CardTitle>
          <CardDescription>
            Advanced HR Analytics & Performance Tracking System
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Select Role (Demo)</Label>
            <Select value={selectedRole} onValueChange={(value: 'employee' | 'manager' | 'hr') => setSelectedRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your role" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <option.icon className="w-4 h-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedRole && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {roleOptions.find(r => r.value === selectedRole)?.icon && (
                  <div className="p-1 bg-primary rounded">
                    {(() => {
                      const Icon = roleOptions.find(r => r.value === selectedRole)!.icon;
                      return <Icon className="w-4 h-4 text-primary-foreground" />;
                    })()}
                  </div>
                )}
                <Badge variant="secondary">{roleOptions.find(r => r.value === selectedRole)?.label}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {roleOptions.find(r => r.value === selectedRole)?.description}
              </p>
              <p className="text-xs text-muted-foreground">
                Demo email: {roleOptions.find(r => r.value === selectedRole)?.demo}
              </p>
            </div>
          )}

          <Button 
            onClick={handleLogin} 
            className="w-full"
            disabled={!email || !selectedRole}
          >
            Sign In
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              This is a demo system with simulated AI analytics
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}