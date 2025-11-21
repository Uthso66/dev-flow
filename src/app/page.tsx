import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-bold">
              DF
            </span>
            <span className="font-semibold tracking-tight">DevFlow</span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-slate-300">
            <Link href="#features" className="hover:text-emerald-300">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-emerald-300">
              How it works
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Go to app
            </Link>
          </nav>
        </div>
      </header>

      <section className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-16 grid gap-10 md:grid-cols-[3fr,2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-3">
              Developer Productivity
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Ship faster with a tracker that actually understands dev work.
            </h1>
            <p className="text-sm md:text-base text-slate-300 mb-6">
              DevFlow combines tasks, focus sessions, and metrics into one
              minimal dashboard so you can see where your time really goes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Open dashboard
              </Link>
              <a
                href="#features"
                className="text-sm text-slate-300 py-2 hover:text-emerald-300"
              >
                View features →
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-sm">
            <p className="text-xs font-medium text-slate-400 mb-2">
              Today&apos;s snapshot
            </p>
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Focus time</span>
                <span>3h 20m</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Tasks completed</span>
                <span>5</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Active tasks</span>
                <span>8</span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-slate-400 mb-1">Status breakdown</p>
                <div className="flex h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="bg-emerald-500" style={{ width: "40%" }} />
                  <div className="bg-amber-400" style={{ width: "30%" }} />
                  <div className="bg-slate-600" style={{ width: "30%" }} />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-slate-400">
                  <span>Done</span>
                  <span>In progress</span>
                  <span>Todo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-t border-slate-800 bg-slate-900 py-10"
      >
        <div className="mx-auto max-w-5xl px-4 grid gap-6 md:grid-cols-3 text-sm">
          <div>
            <h2 className="font-semibold mb-2">Task-first workflow</h2>
            <p className="text-slate-300">
              Capture tasks with status, priority, and estimates tailored for
              dev work instead of generic to-do lists.
            </p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Focus sessions</h2>
            <p className="text-slate-300">
              Log focused coding, debugging, and review sessions to see where
              your day actually goes.
            </p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Metrics that matter</h2>
            <p className="text-slate-300">
              Track completed tasks and time spent over the week with a clear
              dashboard built for engineers.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-4 text-[11px] text-slate-500 flex justify-between">
          <span>© {new Date().getFullYear()} DevFlow</span>
          <span>Built with Next.js, TypeScript, Tailwind</span>
        </div>
      </footer>
    </main>
  );
}
