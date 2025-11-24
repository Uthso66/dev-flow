export type TaskStatus = "todo" | "in_progress" | "done" | "blocked";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  estimateHours?: number;
  tags?: string[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  dueDate?: string; // ISO string
}

export type SessionType = "coding" | "debugging" | "review" | "reading";

export interface Session {
  id: string;
  taskId?: string;
  type: SessionType;
  startedAt: string; // ISO
  endedAt: string; // ISO
  durationMinutes: number;
}

export const dummyTasks: Task[] = [
  {
    id: "task-1",
    title: "Refactor auth middleware",
    description: "Improve error handling and logging for auth routes.",
    status: "in_progress",
    priority: "high",
    estimateHours: 2,
    tags: ["backend", "auth"],
    createdAt: "2025-11-18T08:30:00.000Z",
    updatedAt: "2025-11-21T09:15:00.000Z",
  },
  {
    id: "task-2",
    title: "Implement task filters",
    description: "Allow filtering by status, priority, and tags.",
    status: "todo",
    priority: "medium",
    estimateHours: 1.5,
    tags: ["frontend", "ui"],
    createdAt: "2025-11-19T10:00:00.000Z",
    updatedAt: "2025-11-19T10:00:00.000Z",
  },
  {
    id: "task-3",
    title: "Fix session time rounding bug",
    description: "Session durations sometimes show 59m instead of 1h.",
    status: "blocked",
    priority: "high",
    estimateHours: 1,
    tags: ["bug", "backend"],
    createdAt: "2025-11-20T09:45:00.000Z",
    updatedAt: "2025-11-20T11:00:00.000Z",
  },
  {
    id: "task-4",
    title: "Polish dashboard layout",
    description: "Adjust spacing and typography on overview page.",
    status: "done",
    priority: "low",
    estimateHours: 0.5,
    tags: ["frontend"],
    createdAt: "2025-11-18T07:15:00.000Z",
    updatedAt: "2025-11-18T09:00:00.000Z",
  },
  {
    id: "task-5",
    title: "Add streak calculation",
    description: "Compute daily streak based on logged sessions.",
    status: "done",
    priority: "medium",
    estimateHours: 1,
    tags: ["metrics"],
    createdAt: "2025-11-17T13:00:00.000Z",
    updatedAt: "2025-11-19T14:30:00.000Z",
  },
];

export const dummySessions: Session[] = [
  {
    id: "sess-1",
    taskId: "task-1",
    type: "coding",
    startedAt: "2025-11-21T09:10:00.000Z",
    endedAt: "2025-11-21T10:00:00.000Z",
    durationMinutes: 50,
  },
  {
    id: "sess-2",
    taskId: "task-3",
    type: "debugging",
    startedAt: "2025-11-21T10:15:00.000Z",
    endedAt: "2025-11-21T10:45:00.000Z",
    durationMinutes: 30,
  },
  {
    id: "sess-3",
    taskId: "task-4",
    type: "review",
    startedAt: "2025-11-21T11:00:00.000Z",
    endedAt: "2025-11-21T11:25:00.000Z",
    durationMinutes: 25,
  },
  {
    id: "sess-4",
    type: "reading",
    startedAt: "2025-11-20T16:00:00.000Z",
    endedAt: "2025-11-20T16:40:00.000Z",
    durationMinutes: 40,
  },
];
