export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top row of cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-400 mb-1">Today&apos;s focus time</p>
          <p className="text-2xl font-bold">3h 20m</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Goal: 4h / day · 1h 10m remaining
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-400 mb-1">Tasks</p>
          <p className="text-2xl font-bold">5 / 12 done</p>
          <p className="text-[11px] text-slate-500 mt-1">
            3 in progress · 4 blocked
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-400 mb-1">Active streak</p>
          <p className="text-2xl font-bold">7 days</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Logged focus time every day this week.
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
            <li className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2">
              <div>
                <p className="font-medium">Refactor auth middleware</p>
                <p className="text-[11px] text-slate-500">
                  In progress · Backend · 2h est.
                </p>
              </div>
              <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[11px] text-amber-300 border border-amber-500/40">
                In progress
              </span>
            </li>

            <li className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2">
              <div>
                <p className="font-medium">Implement task filters</p>
                <p className="text-[11px] text-slate-500">
                  Todo · Frontend · 1.5h est.
                </p>
              </div>
              <span className="rounded-full bg-slate-700/60 px-2 py-1 text-[11px] text-slate-200 border border-slate-600">
                Todo
              </span>
            </li>

            <li className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2">
              <div>
                <p className="font-medium">Fix session time rounding bug</p>
                <p className="text-[11px] text-slate-500">
                  Blocked · Backend · 1h est.
                </p>
              </div>
              <span className="rounded-full bg-rose-500/10 px-2 py-1 text-[11px] text-rose-300 border border-rose-500/40">
                Blocked
              </span>
            </li>
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
            <li className="flex justify-between rounded-lg bg-slate-900 px-3 py-2">
              <div>
                <p className="font-medium">Feature branch cleanup</p>
                <p className="text-[11px] text-slate-500">Coding · 50 min</p>
              </div>
              <span className="text-[11px] text-slate-400">09:10 – 10:00</span>
            </li>

            <li className="flex justify-between rounded-lg bg-slate-900 px-3 py-2">
              <div>
                <p className="font-medium">API error handling review</p>
                <p className="text-[11px] text-slate-500">Review · 30 min</p>
              </div>
              <span className="text-[11px] text-slate-400">10:15 – 10:45</span>
            </li>

            <li className="flex justify-between rounded-lg bg-slate-900 px-3 py-2">
              <div>
                <p className="font-medium">Docs + cleanup</p>
                <p className="text-[11px] text-slate-500">Docs · 25 min</p>
              </div>
              <span className="text-[11px] text-slate-400">11:00 – 11:25</span>
            </li>
          </ul>

          <p className="mt-3 text-[11px] text-slate-500">
            This data is static for now. We&apos;ll wire it up to real sessions
            and charts soon.
          </p>
        </div>
      </div>
    </div>
  );
}
