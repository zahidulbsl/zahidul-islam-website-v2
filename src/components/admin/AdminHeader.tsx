
import React from 'react';
import {
  Menu,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  LogOut,
  Database,
} from 'lucide-react';
import type { CrmTab } from './AdminSidebar';

interface AdminHeaderProps {
  currentTab: CrmTab;
  onOpenMobileSidebar: () => void;
  isEmailConfigured: boolean;
  onLogout: () => void;
  onBackToSite: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onFocusSearch: () => void;
}

const TAB_TITLES: Record<
  CrmTab,
  { title: string; subtitle: string }
> = {
  overview: {
    title: 'Workspace Overview',
    subtitle: 'Your business performance and CRM activity at a glance.',
  },
  all: {
    title: 'All Leads',
    subtitle: 'Manage and organize all your client inquiries.',
  },
  pipeline: {
    title: 'Lead Pipeline',
    subtitle: 'Track leads through every stage of your sales process.',
  },
  analytics: {
    title: 'Analytics & Reporting',
    subtitle: 'Understand performance, lead sources, and service demand.',
  },
  settings: {
    title: 'Platform Settings',
    subtitle: 'Manage your CRM preferences and platform configuration.',
  },
};

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentTab,
  onOpenMobileSidebar,
  isEmailConfigured,
  onLogout,
  onBackToSite,
  searchQuery,
  onSearchChange,
  onFocusSearch,
}) => {
  const meta = TAB_TITLES[currentTab];

  return (
    <header
      className="
        sticky top-0 z-20
        min-h-[76px]
        bg-[#0B1018]/90
        backdrop-blur-xl
        border-b border-white/[0.07]
        px-4 sm:px-6 lg:px-8
        flex items-center justify-between
        gap-4
        font-sans
      "
    >
      {/* Left: Navigation & Page Information */}
      <div className="flex items-center gap-3 min-w-0">

        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Open navigation"
          title="Open Navigation"
          className="
            md:hidden flex-shrink-0
            w-9 h-9 flex items-center justify-center
            rounded-xl
            bg-white/[0.04]
            border border-white/[0.07]
            text-slate-400
            hover:text-white hover:bg-white/[0.08]
            transition-all duration-200
            cursor-pointer
          "
        >
          <Menu className="w-[18px] h-[18px]" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              Workspace
            </span>

            <span className="hidden sm:inline text-slate-700 text-xs">
              /
            </span>

            <h1 className="text-[14px] sm:text-[15px] font-bold text-slate-100 tracking-tight truncate">
              {meta.title}
            </h1>
          </div>

          <p className="hidden sm:block text-[11px] text-slate-500 mt-1 truncate">
            {meta.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Search & Actions */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

        {/* Global Search */}
        <div className="relative hidden sm:block w-40 md:w-52 lg:w-64">
          <Search
            className="
              absolute left-3 top-1/2 -translate-y-1/2
              w-3.5 h-3.5 text-slate-500
              pointer-events-none
            "
          />

          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={onFocusSearch}
            aria-label="Search leads"
            className="
              w-full h-9
              pl-9 pr-3
              rounded-xl
              bg-[#111722]
              border border-white/[0.07]
              text-[11px] text-slate-200
              placeholder:text-slate-600
              outline-none
              transition-all duration-200
              focus:border-lime-400/40
              focus:ring-2 focus:ring-lime-400/[0.07]
            "
          />
        </div>

        {/* System Status */}
        <div className="hidden xl:flex items-center gap-2">

          {/* Database */}
          <div
            title="Connected to Supabase PostgreSQL with Row Level Security active"
            className="
              inline-flex items-center gap-1.5
              h-8 px-2.5
              rounded-lg
              bg-emerald-400/[0.05]
              border border-emerald-400/[0.12]
              text-emerald-400
            "
          >
            <Database className="w-3 h-3" />
            <span className="text-[10px] font-semibold">
              Supabase
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>

          {/* Email Status */}
          <div
            title={
              isEmailConfigured
                ? 'SMTP transport active: alerts delivered to zahidul.pro.bd@gmail.com'
                : 'SMTP not configured in environment; running in safe console mode'
            }
            className={`
              inline-flex items-center gap-1.5
              h-8 px-2.5
              rounded-lg
              border
              ${
                isEmailConfigured
                  ? 'bg-emerald-400/[0.05] border-emerald-400/[0.12] text-emerald-400'
                  : 'bg-amber-400/[0.05] border-amber-400/[0.12] text-amber-400'
              }
            `}
          >
            {isEmailConfigured ? (
              <CheckCircle2 className="w-3 h-3" />
            ) : (
              <AlertTriangle className="w-3 h-3" />
            )}

            <span className="text-[10px] font-semibold">
              {isEmailConfigured ? 'Email Live' : 'Console Sim'}
            </span>
          </div>
        </div>

        {/* Website */}
        <button
          type="button"
          onClick={onBackToSite}
          title="Back to website"
          className="
            hidden sm:inline-flex
            items-center justify-center gap-1.5
            h-9 px-3
            rounded-xl
            bg-white/[0.035]
            border border-white/[0.07]
            text-[11px] font-semibold
            text-slate-400
            hover:text-white hover:bg-white/[0.07]
            transition-all duration-200
            cursor-pointer
          "
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Website</span>
        </button>

        {/* Sign Out */}
        <button
          type="button"
          onClick={onLogout}
          title="Sign out of Admin CRM"
          className="
            inline-flex items-center justify-center gap-1.5
            h-9 px-2.5 sm:px-3
            rounded-xl
            bg-rose-500/[0.07]
            border border-rose-500/[0.13]
            text-[11px] font-semibold
            text-rose-300
            hover:bg-rose-500/[0.13]
            hover:border-rose-500/25
            transition-all duration-200
            cursor-pointer
          "
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
};
