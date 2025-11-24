import { dummyTasks, dummySessions, Task, Session } from "@/lib/devflow-data";

function getTodayMinutes(sessions: Session[]): number {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  const d = today.getDate();

  return sessions
    .filter((sess) => {
      const start = new Date(sess.startedAt);
      return (
        start.getFullYear() === y &&
        start.getMonth() === m &&
        start.getDate() === d
      );
    })
    .reduce((sum, sess) => sum + sess.durationMinutes, 0);
}

function getTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const blocked = tasks.filter((t) => t.status === "blocked").length;
  const todo = tasks.filter((t) => t.status === "todo").length;

  return { total, done, inProgress, blocked, todo };
}

export default function DashboardPage() {
  const tasks = dummyTasks;
  const sessions = dummySessions;

  const todayMinutes = getTodayMinutes(sessions);
  const todayHours = Math.floor(todayMinutes / 60);
  const todayRemainMinutes = todayMinutes % 60;
  const todayLabel =
    todayMinutes === 0
      ? "No focus time logged yet."
      : `${todayHours > 0 ? `${todayHours}h ` : ""}${
          todayRemainMinutes > 0 ? `${todayRemainMinutes}m` : ""
        } today`;

  const goalMinutes = 4 * 60;
  const remaining = Math.max(goalMinutes - todayMinutes, 0);
  const remainingHours = Math.floor(remaining / 60);
  const remainingRemainMinutes = remaining % 60;

  const { total, done, inProgress, blocked, todo } = getTaskStats(tasks);

  const recentTasks = tasks
    .slice()
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 3);

  const todaySessions = sessions
    .slice()
    .sort(
      (a, b) =>
        new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    )
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Top row of cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Focus time card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-400 mb-1">Today&apos;s focus time</p>
          <p className="text-2xl font-bold">
            {todayMinutes === 0
              ? "0m"
              : `${todayHours > 0 ? `${todayHours}h ` : ""}${
                  todayRemainMinutes > 0 ? `${todayRemainMinutes}m` : ""
                }`}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {todayMinutes >= goalMinutes
              ? "Goal reached for today. Nice."
              : `Goal: 4h / day · ${
                  remaining === 0
                    ? "0m remaining"
                    : `${remainingHours > 0 ? `${remainingHours}h ` : ""}${
                        remainingRemainMinutes > 0
                          ? `${remainingRemainMinutes}m`
                          : ""
                      } remaining`
                }`}
          </p>
        </div>

        {/* Tasks card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-400 mb-1">Tasks</p>
          <p className="text-2xl font-bold">
            {done} / {total} done
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {inProgress} in progress · {blocked} blocked · {todo} todo
          </p>
        </div>

        {/* Streak card (fake for now) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-400 mb-1">Active streak</p>
          <p className="text-2xl font-bold">7 days</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Streak logic will be computed from session history later.
          </p>
        </div>
      </div>

      {/* Two-column: tasks + sessions preview */}
      <div className="grid gap-6 md:grid-cols-[2fr,1.5fr]">
        {/* Recent tasks */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Recent tasks</h2>
            <span className="text-[11px] text-slate-400 cursor-pointer hover:text-slate-200">
              View all →
            </span>
          </div>

          <ul className="space-y-2 text-sm">
            {recentTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2"
              >
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-[11px] text-slate-500">
                    {task.status} · {task.priority} priority
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-[11px] border
                    ${
                      task.status === "done"
                        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/40"
                        : task.status === "in_progress"
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/40"
                        : task.status === "blocked"
                        ? "bg-rose-500/10 text-rose-300 border-rose-500/40"
                        : "bg-slate-700/60 text-slate-200 border-slate-600"
                    }
                  `}
                >
                  {task.status.replace("_", " ")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Focus sessions preview */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Today&apos;s sessions</h2>
            <span className="text-[11px] text-slate-400 cursor-pointer hover:text-slate-200">
              View log →
            </span>
          </div>

          <ul className="space-y-2 text-sm">
            {todaySessions.map((sess) => {
              const start = new Date(sess.startedAt);
              const end = new Date(sess.endedAt);
              const startLabel = start.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              const endLabel = end.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <li
                  key={sess.id}
                  className="flex justify-between rounded-lg bg-slate-900 px-3 py-2"
                >
                  <div>
                    <p className="font-medium">
                      {sess.taskId
                        ? dummyTasks.find((t) => t.id === sess.taskId)?.title ??
                          "Linked task"
                        : "General session"}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {sess.type} · {sess.durationMinutes} min
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {startLabel} – {endLabel}
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="mt-3 text-[11px] text-slate-500">{todayLabel}</p>
        </div>
      </div>
    </div>
  );
}
