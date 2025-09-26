import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Phone, 
  Edit3, 
  Save, 
  X,
  Award,
  TrendingUp,
  Target,
  CheckCircle
} from 'lucide-react';
import { Employee } from '../../types';

interface ProfilePageProps {
  currentUser: Employee;
}

export function ProfilePage({ currentUser }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUser);

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(currentUser);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const mockSkills = [
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 78 },
    { name: 'Node.js', level: 82 },
    { name: 'Python', level: 65 }
  ];

  const mockAchievements = [
    { title: 'Employee of the Month', date: 'November 2024', description: 'Outstanding performance in Q4' },
    { title: 'React Certification', date: 'October 2024', description: 'Advanced React Development Certificate' },
    { title: 'Team Player Award', date: 'September 2024', description: 'Excellent collaboration and mentoring' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar and Basic Info */}
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h2 className="text-xl">{currentUser.name}</h2>
                <p className="text-muted-foreground">{currentUser.position}</p>
                <Badge variant="secondary">{currentUser.department}</Badge>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    id="email"
                    value={isEditing ? editedUser.email : currentUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    id="phone"
                    value="+1 (555) 123-4567"
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    id="location"
                    value="San Francisco, CA"
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hireDate">Hire Date</Label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    id="hireDate"
                    value={new Date(currentUser.hireDate).toLocaleDateString()}
                    disabled
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value="Passionate software developer with 5+ years of experience in full-stack development. Specializes in React, Node.js, and cloud technologies. Enjoys mentoring junior developers and contributing to open-source projects."
                disabled={!isEditing}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{currentUser.performanceScore}%</div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Productivity</span>
                    <span>{currentUser.productivity}%</span>
                  </div>
                  <Progress value={currentUser.productivity} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Attendance</span>
                    <span>{currentUser.attendance}%</span>
                  </div>
                  <Progress value={currentUser.attendance} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Task Completion</span>
                    <span>{currentUser.taskCompletion}%</span>
                  </div>
                  <Progress value={currentUser.taskCompletion} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Engagement</span>
                    <span>{currentUser.engagement}%</span>
                  </div>
                  <Progress value={currentUser.engagement} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Current Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h4 className="text-sm mb-2">Complete React Certification</h4>
                <Progress value={75} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">75% complete</p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="text-sm mb-2">Mentor 2 Junior Developers</h4>
                <Progress value={50} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">50% complete</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Skills and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills & Expertise</CardTitle>
            <CardDescription>Your technical and professional skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSkills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Achievements
            </CardTitle>
            <CardDescription>Recent accomplishments and awards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAchievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}