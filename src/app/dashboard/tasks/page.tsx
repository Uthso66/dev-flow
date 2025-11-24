import { dummyTasks, Task, TaskStatus } from "@/lib/devflow-data";

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
  blocked: "Blocked",
};

const STATUS_COLORS: Record<TaskStatus, string> = {
  todo: "bg-slate-800 text-slate-200 border-slate-600",
  in_progress: "bg-amber-500/10 text-amber-300 border-amber-500/40",
  done: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
  blocked: "bg-rose-500/10 text-rose-300 border-rose-500/40",
};

function formatDate(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleString();
}

export default function TasksPage() {
  const tasks: Task[] = dummyTasks;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold">Tasks</h1>
          <p className="text-[11px] text-slate-500">
            This is currently using in-memory dummy data. We&apos;ll connect it
            to a database later.
          </p>
        </div>

        <button className="rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400">
          + New task
        </button>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm">
        <div className="hidden md:grid grid-cols-[2fr,1fr,1fr,1fr] gap-3 border-b border-slate-800 pb-2 mb-2 text-[11px] uppercase tracking-wide text-slate-500">
          <span>Task</span>
          <span>Status</span>
          <span>Priority</span>
          <span>Updated</span>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="grid gap-2 md:grid-cols-[2fr,1fr,1fr,1fr] items-center rounded-lg bg-slate-950 px-3 py-2 border border-slate-800"
            >
              {/* Title & description */}
              <div>
                <p className="font-medium">{task.title}</p>
                {task.description && (
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {task.description}
                  </p>
                )}
                {task.tags && task.tags.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] rounded-full bg-slate-800 px-2 py-[2px] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Status */}
              <div>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-1 text-[11px] ${
                    STATUS_COLORS[task.status]
                  }`}
                >
                  {STATUS_LABELS[task.status]}
                </span>
              </div>

              {/* Priority */}
              <div>
                <span className="text-[11px] text-slate-300">
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}{" "}
                  priority
                </span>
              </div>

              {/* Updated */}
              <div>
                <p className="text-[11px] text-slate-400">
                  {formatDate(task.updatedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
