import { Task } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

const statusColors = {
  pending: 'bg-task-pending text-white',
  'in-progress': 'bg-task-in-progress text-white',
  completed: 'bg-task-completed text-white',
  cancelled: 'bg-task-cancelled text-white',
};

const priorityColors = {
  low: 'border-l-priority-low',
  medium: 'border-l-priority-medium',
  high: 'border-l-priority-high',
};

export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
  const isOverdue = task.dueDate && task.dueDate < new Date() && task.status !== 'completed';

  return (
    <Card className={cn(
      "p-4 border-l-4 shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in",
      priorityColors[task.priority],
      isOverdue && "ring-2 ring-destructive/50"
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-foreground line-clamp-1">{task.title}</h3>
            <Badge className={statusColors[task.status]} variant="secondary">
              {task.status.replace('-', ' ')}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {task.priority}
            </Badge>
          </div>
          
          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
          )}
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Created {task.createdAt.toLocaleDateString()}</span>
            </div>
            {task.dueDate && (
              <div className={cn(
                "flex items-center gap-1",
                isOverdue && "text-destructive font-medium"
              )}>
                <Calendar className="h-3 w-3" />
                <span>Due {task.dueDate.toLocaleDateString()}</span>
                {isOverdue && <span className="text-destructive">• Overdue</span>}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="h-8 w-8 p-0"
          >
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {task.status !== 'completed' && task.status !== 'cancelled' && (
        <div className="mt-3 flex gap-2">
          {task.status === 'pending' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(task.id, 'in-progress')}
              className="text-xs"
            >
              Start Task
            </Button>
          )}
          {task.status === 'in-progress' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(task.id, 'completed')}
              className="text-xs"
            >
              Mark Complete
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};