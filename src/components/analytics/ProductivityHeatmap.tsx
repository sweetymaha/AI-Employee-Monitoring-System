import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Activity } from 'lucide-react';

interface ProductivityHeatmapProps {
  data: any[];
}

export function ProductivityHeatmap({ data }: ProductivityHeatmapProps) {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const getIntensityColor = (value: number) => {
    const intensity = Math.max(0, Math.min(1, (value - 60) / 40)); // Scale 60-100 to 0-1
    const hue = 120; // Green hue
    const saturation = 70;
    const lightness = 90 - (intensity * 40); // From light to dark
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Productivity Heatmap
        </CardTitle>
        <CardDescription>
          Hourly productivity patterns throughout the week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Header with day labels */}
          <div className="grid grid-cols-6 gap-1 mb-2">
            <div className="text-xs text-muted-foreground text-right pr-2">Time</div>
            {dayLabels.map((day) => (
              <div key={day} className="text-xs text-center text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          {data.map((hourData, index) => (
            <div key={index} className="grid grid-cols-6 gap-1">
              <div className="text-xs text-muted-foreground text-right pr-2 py-1">
                {hourData.hour}
              </div>
              {days.map((day) => (
                <div
                  key={`${hourData.hour}-${day}`}
                  className="w-full h-8 rounded flex items-center justify-center text-xs font-medium border"
                  style={{
                    backgroundColor: getIntensityColor(hourData[day]),
                    color: hourData[day] > 80 ? '#ffffff' : '#1f2937'
                  }}
                  title={`${dayLabels[days.indexOf(day)]} ${hourData.hour}: ${hourData[day]}% productivity`}
                >
                  {hourData[day]}%
                </div>
              ))}
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t">
            <span className="text-xs text-muted-foreground">Low</span>
            <div className="flex gap-1">
              {[60, 70, 80, 90, 95].map((value) => (
                <div
                  key={value}
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: getIntensityColor(value) }}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">High</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}