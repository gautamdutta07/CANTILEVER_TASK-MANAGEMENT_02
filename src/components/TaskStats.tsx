import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, Play, AlertCircle } from 'lucide-react';

interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
  };
}

export const TaskStats = ({ stats }: TaskStatsProps) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: AlertCircle,
      color: 'text-foreground',
      bgColor: 'bg-muted',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: Play,
      color: 'text-task-in-progress',
      bgColor: 'bg-task-in-progress/10',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'text-task-pending',
      bgColor: 'bg-task-pending/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
      
      {stats.total > 0 && (
        <Card className="p-4 md:col-span-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
              <span className="text-sm font-bold">{completionRate}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};