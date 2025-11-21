"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DashboardNav() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/tasks", label: "Tasks" },
    { href: "/dashboard/sessions", label: "Sessions" },
    { href: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <nav className="space-y-1">
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/dashboard" && pathname.startsWith(link.href));

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition
              ${
                isActive
                  ? "bg-emerald-500 text-slate-950 font-semibold"
                  : "text-slate-300 hover:bg-slate-800 hover:text-slate-50"
              }
            `}
          >
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 border-r border-slate-800 bg-slate-950/80 flex-col">
        <div className="px-4 py-4 border-b border-slate-800 flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-bold">
            DF
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight">DevFlow</p>
            <p className="text-[11px] text-slate-400">Developer tracker</p>
          </div>
        </div>

        <div className="flex-1 px-3 py-4">
          <DashboardNav />
        </div>

        <div className="px-4 py-4 border-t border-slate-800 text-[11px] text-slate-500">
          <p>Signed in as</p>
          <p className="font-medium text-slate-300 truncate">dev@example.com</p>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Dev dashboard
              </p>
              <h1 className="text-lg font-semibold">Overview</h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-md border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800">
                View week
              </button>
              <button className="rounded-full h-8 w-8 border border-slate-700 flex items-center justify-center text-xs text-slate-300 hover:bg-slate-800">
                DF
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
