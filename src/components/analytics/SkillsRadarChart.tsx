import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Brain, TrendingUp } from 'lucide-react';

interface SkillsRadarChartProps {
  data: any[];
}

export function SkillsRadarChart({ data }: SkillsRadarChartProps) {
  const getGrowthColor = (growth: number) => {
    if (growth >= 15) return 'text-green-600';
    if (growth >= 10) return 'text-blue-600';
    if (growth >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 85) return 'bg-green-500';
    if (level >= 75) return 'bg-blue-500';
    if (level >= 65) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Skills Analysis
        </CardTitle>
        <CardDescription>
          Team skill levels and growth trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((skill, index) => (
            <div key={index} className="p-4 border rounded-lg bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h4>{skill.skill}</h4>
                  <Badge variant="outline" className="text-xs">
                    {skill.employees} employees
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className={`w-4 h-4 ${getGrowthColor(skill.growth)}`} />
                  <span className={getGrowthColor(skill.growth)}>
                    +{skill.growth}% growth
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Average Skill Level</span>
                  <span>{skill.avgLevel}%</span>
                </div>
                <div className="relative">
                  <Progress value={skill.avgLevel} className="h-3" />
                  <div 
                    className={`absolute top-0 left-0 h-3 rounded-full ${getSkillLevelColor(skill.avgLevel)}`}
                    style={{ width: `${skill.avgLevel}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-4 text-center">
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-lg">{skill.employees}</p>
                  <p className="text-xs text-muted-foreground">Team Members</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-lg">{skill.avgLevel}%</p>
                  <p className="text-xs text-muted-foreground">Avg Level</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className={`text-lg ${getGrowthColor(skill.growth)}`}>+{skill.growth}%</p>
                  <p className="text-xs text-muted-foreground">Growth</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}