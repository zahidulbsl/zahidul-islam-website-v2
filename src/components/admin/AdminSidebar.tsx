
import React from 'react';
import {
  LayoutDashboard,
  Users,
  Kanban,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import type { LeadStats } from '../../types/crm';

export type CrmTab =
  | 'overview'
  | 'all'
  | 'pipeline'
  | 'analytics'
  | 'settings';

interface AdminSidebarProps {
  currentTab: CrmTab;
  onSelectTab: (tab: CrmTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  stats: LeadStats | null;
  onBackToSite: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  stats,
  onBackToSite,
  mobileOpen,
  onCloseMobile,
}) => {
  const navItems: {
    id: CrmTab;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
    badgeColor?: string;
  }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'all',
      label: 'All Leads',
      icon: Users,
      badge: stats?.totalLeads,
      badgeColor: 'bg-white/[0.06] text-slate-400',
    },
    {
      id: 'pipeline',
      label: 'Pipeline',
      icon: Kanban,
      badge: stats?.newLeads
        ? `${stats.newLeads} new`
        : undefined,
      badgeColor:
        'bg-lime-400/10 text-lime-400 border border-lime-400/15',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  const handleNavClick = (tab: CrmTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between px-3 py-5 font-sans">

      {/* Brand & Navigation */}
      <div className="space-y-9">

        {/* Brand */}
        <div
          className={`h-10 flex items-center ${
            collapsed ? 'justify-center' : 'justify-between px-1'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-9 h-9 rounded-xl bg-lime-400 flex items-center justify-center text-[#090D14] font-black text-base shadow-lg shadow-lime-400/10 flex-shrink-0">
              Z
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#0D1118] border-2 border-[#0D1118]" />
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-white tracking-tight leading-tight">
                  Zahidul Pro
                </p>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-lime-400 mt-1">
                  CRM Workspace
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div>
          {!collapsed && (
            <p className="px-3 mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
              Workspace
            </p>
          )}

          <nav className="space-y-1" aria-label="Main navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  title={collapsed ? item.label : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  className={`
                    relative w-full min-h-[42px]
                    flex items-center gap-3
                    px-3 py-2.5 rounded-xl
                    text-[12px] font-semibold
                    transition-all duration-200
                    cursor-pointer group
                    ${
                      collapsed
                        ? 'justify-center'
                        : 'justify-between'
                    }
                    ${
                      isActive
                        ? 'bg-lime-400/[0.09] text-lime-300'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.035]'
                    }
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r-full bg-lime-400" />
                  )}

                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      strokeWidth={isActive ? 2.2 : 1.8}
                      className={`
                        w-[17px] h-[17px] flex-shrink-0
                        transition-colors duration-200
                        ${
                          isActive
                            ? 'text-lime-400'
                            : 'text-slate-500 group-hover:text-slate-200'
                        }
                      `}
                    />

                    {!collapsed && (
                      <span className="truncate">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {!collapsed && item.badge !== undefined && (
                    <span
                      className={`
                        px-2 py-1 rounded-md
                        text-[9px] font-bold tracking-wide
                        whitespace-nowrap
                        ${item.badgeColor}
                      `}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-3">

        {/* Portfolio Link */}
        <button
          type="button"
          onClick={onBackToSite}
          title="Back to Public Portfolio"
          className={`
            w-full min-h-[40px]
            flex items-center gap-3
            px-3 py-2.5 rounded-xl
            text-[11px] font-semibold
            text-slate-500
            hover:text-white hover:bg-white/[0.04]
            transition-all duration-200 cursor-pointer
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>View Portfolio</span>}
        </button>

        {/* Divider */}
        <div className="border-t border-white/[0.07]" />

        {/* Admin Profile */}
        <div
          className={`
            flex items-center gap-3
            p-2.5 rounded-xl
            bg-white/[0.025]
            border border-white/[0.06]
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          <div className="relative w-9 h-9 rounded-lg bg-lime-400/[0.10] border border-lime-400/20 flex items-center justify-center text-lime-400 font-bold text-[11px] flex-shrink-0">
            ZI
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#111722]" />
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-slate-200 truncate">
                Zahidul Islam
              </p>

              <div className="flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3 h-3 text-lime-400" />
                <span className="text-[9px] font-medium text-slate-500">
                  Super Admin
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="
            hidden md:flex w-full
            items-center justify-center
            gap-2 p-2 rounded-lg
            text-slate-600
            hover:text-slate-300
            hover:bg-white/[0.04]
            transition-all duration-200 cursor-pointer
          "
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[10px] font-semibold">
                Collapse sidebar
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden md:block fixed inset-y-0 left-0 z-30
          bg-[#0B1018]
          border-r border-white/[0.07]
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
        `}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="
            md:hidden fixed inset-0 z-40
            bg-black/65 backdrop-blur-[3px]
            animate-fadeIn
          "
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        aria-label="Mobile navigation"
        className={`
          md:hidden fixed inset-y-0 left-0 z-50
          w-72 bg-[#0B1018]
          border-r border-white/[0.07]
          shadow-2xl shadow-black/40
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
