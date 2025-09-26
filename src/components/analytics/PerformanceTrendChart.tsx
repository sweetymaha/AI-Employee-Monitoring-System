import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface PerformanceTrendChartProps {
  data: any[];
  title?: string;
  height?: number;
}

export function PerformanceTrendChart({ data, title = "Performance Trends", height = 300 }: PerformanceTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Monthly performance trends across all departments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[70, 100]} />
              <Tooltip 
                formatter={(value: number, name: string) => [`${value}%`, name]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="engineering" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Engineering"
              />
              <Line 
                type="monotone" 
                dataKey="design" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Design"
              />
              <Line 
                type="monotone" 
                dataKey="marketing" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Marketing"
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Sales"
              />
              <Line 
                type="monotone" 
                dataKey="product" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Product"
              />
              <Line 
                type="monotone" 
                dataKey="overall" 
                stroke="#1f2937" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Overall Average"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}