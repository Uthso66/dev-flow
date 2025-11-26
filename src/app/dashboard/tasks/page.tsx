"use client";

import { useMemo, useState } from "react";
import { dummyTasks, Task, TaskStatus, TaskPriority } from "@/lib/devflow-data";

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

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

function formatDate(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleString();
}

export default function TasksPage() {
  // Local state for tasks (so we can mutate)
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);

  // Filter / sort state
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"updated" | "priority">("updated");

  // Derived list
  const visibleTasks = useMemo(() => {
    let list = [...tasks];

    if (statusFilter !== "all") {
      list = list.filter((t) => t.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      list = list.filter((t) => t.priority === priorityFilter);
    }

    if (sortBy === "updated") {
      list.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    } else if (sortBy === "priority") {
      const order: TaskPriority[] = ["high", "medium", "low"];
      list.sort(
        (a, b) =>
          order.indexOf(a.priority) - order.indexOf(b.priority) ||
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    }

    return list;
  }, [tasks, statusFilter, priorityFilter, sortBy]);

  // Change status helper
  function cycleStatus(task: Task): TaskStatus {
    const order: TaskStatus[] = ["todo", "in_progress", "blocked", "done"];
    const idx = order.indexOf(task.status);
    const nextIndex = (idx + 1) % order.length;
    return order[nextIndex];
  }

  function handleToggleStatus(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: cycleStatus(task),
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  }

  return (
    <div className="space-y-4">
      {/* Header + "New task" (fake for now) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold">Tasks</h1>
          <p className="text-[11px] text-slate-500">
            Client-side filters & status changes. Next step will be to persist
            this in a real database.
          </p>
        </div>

        <button className="rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400">
          + New task
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs">
        {/* Status filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Status:</span>
          <div className="flex gap-1">
            <FilterChip
              label="All"
              active={statusFilter === "all"}
              onClick={() => setStatusFilter("all")}
            />
            <FilterChip
              label="Todo"
              active={statusFilter === "todo"}
              onClick={() => setStatusFilter("todo")}
            />
            <FilterChip
              label="In progress"
              active={statusFilter === "in_progress"}
              onClick={() => setStatusFilter("in_progress")}
            />
            <FilterChip
              label="Blocked"
              active={statusFilter === "blocked"}
              onClick={() => setStatusFilter("blocked")}
            />
            <FilterChip
              label="Done"
              active={statusFilter === "done"}
              onClick={() => setStatusFilter("done")}
            />
          </div>
        </div>

        {/* Priority filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Priority:</span>
          <div className="flex gap-1">
            <FilterChip
              label="All"
              active={priorityFilter === "all"}
              onClick={() => setPriorityFilter("all")}
            />
            <FilterChip
              label="High"
              active={priorityFilter === "high"}
              onClick={() => setPriorityFilter("high")}
            />
            <FilterChip
              label="Medium"
              active={priorityFilter === "medium"}
              onClick={() => setPriorityFilter("medium")}
            />
            <FilterChip
              label="Low"
              active={priorityFilter === "low"}
              onClick={() => setPriorityFilter("low")}
            />
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Sort by:</span>
          <div className="flex gap-1">
            <FilterChip
              label="Last updated"
              active={sortBy === "updated"}
              onClick={() => setSortBy("updated")}
            />
            <FilterChip
              label="Priority"
              active={sortBy === "priority"}
              onClick={() => setSortBy("priority")}
            />
          </div>
        </div>
      </div>

      {/* Task list */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm">
        {/* Header row (desktop) */}
        <div className="hidden md:grid grid-cols-[2fr,1fr,1fr,1fr] gap-3 border-b border-slate-800 pb-2 mb-2 text-[11px] uppercase tracking-wide text-slate-500">
          <span>Task</span>
          <span>Status</span>
          <span>Priority</span>
          <span>Updated</span>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {visibleTasks.length === 0 ? (
            <p className="text-[12px] text-slate-500 px-2 py-3">
              No tasks match the current filters.
            </p>
          ) : (
            visibleTasks.map((task) => (
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

                {/* Status (clickable) */}
                <div>
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(task.id)}
                    className={`inline-flex items-center rounded-full border px-2 py-1 text-[11px] ${
                      STATUS_COLORS[task.status]
                    } hover:brightness-110 transition`}
                    title="Click to cycle status"
                  >
                    {STATUS_LABELS[task.status]}
                  </button>
                </div>

                {/* Priority */}
                <div>
                  <span className="text-[11px] text-slate-300">
                    {PRIORITY_LABELS[task.priority]} priority
                  </span>
                </div>

                {/* Updated */}
                <div>
                  <p className="text-[11px] text-slate-400">
                    {formatDate(task.updatedAt)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Tiny chip component for filters
function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2 py-1 ${
        active
          ? "bg-emerald-500 text-slate-950 border-emerald-400"
          : "bg-slate-950 text-slate-300 border-slate-700 hover:bg-slate-800"
      } transition`}
    >
      {label}
    </button>
  );
}
