import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { TaskCard } from '@/components/TaskCard';
import { TaskDialog } from '@/components/TaskDialog';
import { TaskFilters } from '@/components/TaskFilters';
import { TaskStats } from '@/components/TaskStats';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    taskStats,
  } = useTasks();

  const handleCreateTask = () => {
    setSelectedTask(undefined);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast({
      title: "Task deleted",
      description: "The task has been successfully deleted.",
    });
  };

  const handleStatusChange = (id: string, status: Task['status']) => {
    updateTask(id, { status });
    toast({
      title: "Task updated",
      description: `Task status changed to ${status.replace('-', ' ')}.`,
    });
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    addTask(taskData);
    toast({
      title: "Task created",
      description: "Your new task has been successfully created.",
    });
  };

  const handleUpdateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    updateTask(id, updates);
    toast({
      title: "Task updated",
      description: "Your task has been successfully updated.",
    });
  };

  const handleSortChange = (newSortBy: typeof sortBy, newDirection: typeof sortDirection) => {
    setSortBy(newSortBy);
    setSortDirection(newDirection);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Task Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Organize, track, and complete your tasks efficiently
              </p>
            </div>
            <Button onClick={handleCreateTask} className="gap-2 shadow-elegant">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <TaskStats stats={taskStats} />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <TaskFilters
            filters={filters}
            onFiltersChange={setFilters}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
            taskCount={tasks.length}
          />
        </div>

        {/* Tasks Grid */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  {Object.keys(filters).some(key => filters[key as keyof typeof filters])
                    ? "Try adjusting your filters to see more tasks."
                    : "Get started by creating your first task!"}
                </p>
                {!Object.keys(filters).some(key => filters[key as keyof typeof filters]) && (
                  <Button onClick={handleCreateTask} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Task
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>

        {/* Task Dialog */}
        <TaskDialog
          task={selectedTask}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSaveTask}
          onUpdate={handleUpdateTask}
        />
      </div>
    </div>
  );
};

export default Index;