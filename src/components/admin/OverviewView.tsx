import React from 'react';
import {
  Users,
  Sparkles,
  CalendarCheck,
  Send,
  UserCheck,
  Trophy,
  ArrowUpRight,
  TrendingUp,
  Layers,
  CheckCircle2,
  Eye,
  Inbox,
  ChevronRight,
} from 'lucide-react';
import type { Lead, LeadStats, LeadStatus } from '../../types/crm';

interface OverviewViewProps {
  stats: LeadStats | null;
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onNavigateTab: (tab: 'all' | 'pipeline' | 'analytics' | 'settings') => void;
  onUpdateStatus: (id: string, newStatus: LeadStatus) => Promise<void>;
}

const cardClass =
  'rounded-2xl border border-white/[0.07] bg-[#111722] shadow-[0_8px_30px_rgba(0,0,0,0.12)]';

const statusStyles: Record<string, string> = {
  New: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
  Contacted: 'border-sky-400/20 bg-sky-400/10 text-sky-300',
  'In Discussion': 'border-amber-400/20 bg-amber-400/10 text-amber-300',
  Converted: 'border-lime-400/25 bg-lime-400/10 text-lime-300',
  'Not Interested': 'border-slate-500/20 bg-slate-500/10 text-slate-400',
};

const MetricCard: React.FC<{
  label: string;
  value: number | string;
  helper: string;
  icon: React.ElementType;
  accent: string;
}> = ({ label, value, helper, icon: Icon, accent }) => (
  <div className={`${cardClass} group relative min-w-0 overflow-hidden p-4 sm:p-5 transition-colors duration-200 hover:border-white/[0.13]`}>
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          {label}
        </p>
        <p className="mt-3 text-[27px] font-semibold leading-none tracking-tight text-white tabular-nums sm:text-[30px]">
          {value}
        </p>
      </div>
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] ${accent}`}>
        <Icon className="h-[17px] w-[17px]" strokeWidth={1.8} />
      </div>
    </div>
    <p className="mt-3 text-[11px] leading-5 text-slate-500">{helper}</p>
  </div>
);

export const OverviewView: React.FC<OverviewViewProps> = ({
  stats,
  leads,
  onSelectLead,
  onNavigateTab,
  onUpdateStatus,
}) => {
  const newLeadsQueue = leads.filter((lead) => lead.status === 'New').slice(0, 5);

  const serviceCounts: Record<string, number> = {};
  leads.forEach((lead) => {
    serviceCounts[lead.service] = (serviceCounts[lead.service] || 0) + 1;
  });

  const topServices = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const totalLeadsCount = stats?.totalLeads ?? leads.length;
  const consultCount =
    stats?.consultationRequests ??
    leads.filter((lead) => lead.source === 'consultation_popup').length;
  const inquiryCount =
    stats?.projectInquiries ??
    leads.filter((lead) => lead.source === 'contact_section').length;

  const consultPct =
    totalLeadsCount > 0
      ? Math.min(100, Math.round((consultCount / totalLeadsCount) * 100))
      : 0;
  const inquiryPct =
    totalLeadsCount > 0
      ? Math.min(100, Math.round((inquiryCount / totalLeadsCount) * 100))
      : 0;

  const statusCounts = {
    New: leads.filter((lead) => lead.status === 'New').length,
    Contacted: leads.filter((lead) => lead.status === 'Contacted').length,
    'In Discussion': leads.filter((lead) => lead.status === 'In Discussion').length,
    Converted: leads.filter((lead) => lead.status === 'Converted').length,
    'Not Interested': leads.filter((lead) => lead.status === 'Not Interested').length,
  };

  const metrics = [
    {
      label: 'Total leads',
      value: stats?.totalLeads ?? '—',
      helper: 'All recorded inquiries',
      icon: Users,
      accent: 'bg-lime-400/10 text-lime-300',
    },
    {
      label: 'New inquiries',
      value: stats?.newLeads ?? '—',
      helper: 'Awaiting first contact',
      icon: Sparkles,
      accent: 'bg-emerald-400/10 text-emerald-300',
    },
    {
      label: 'Consultations',
      value: stats?.consultationRequests ?? '—',
      helper: 'Submitted through popup',
      icon: CalendarCheck,
      accent: 'bg-sky-400/10 text-sky-300',
    },
    {
      label: 'Contact inquiries',
      value: stats?.projectInquiries ?? '—',
      helper: 'Submitted through contact form',
      icon: Send,
      accent: 'bg-violet-400/10 text-violet-300',
    },
    {
      label: 'Contacted',
      value: stats?.contactedLeads ?? '—',
      helper: 'Outreach already started',
      icon: UserCheck,
      accent: 'bg-amber-400/10 text-amber-300',
    },
    {
      label: 'Converted',
      value: stats?.convertedLeads ?? '—',
      helper: 'Moved to converted stage',
      icon: Trophy,
      accent: 'bg-lime-400/10 text-lime-300',
    },
  ];

  return (
    <div className="space-y-5 pb-6 sm:space-y-6">
      {/* Overview introduction */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lime-300">
              Business snapshot
            </span>
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Your business at a glance
          </h2>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-400 sm:text-[13px]">
            A clear view of incoming inquiries, client activity and your current pipeline.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigateTab('all')}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.035] px-3.5 py-2.5 text-xs font-semibold text-slate-300 transition-colors hover:border-lime-400/30 hover:bg-lime-400/[0.06] hover:text-lime-200"
        >
          View all leads
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </section>

      {/* KPI cards */}
      <section aria-label="Lead metrics" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      {/* Main insight panels */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Acquisition channels and pipeline */}
        <div className={`${cardClass} p-4 sm:p-5`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-white">Acquisition channels</h3>
              <p className="mt-1 text-[11px] text-slate-500">
                Where your inquiries are coming from
              </p>
            </div>
            <div className="rounded-lg bg-white/[0.04] p-2 text-slate-400">
              <Layers className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-[#202A38]">
              <div
                style={{ width: `${consultPct}%` }}
                className="h-full bg-sky-400 transition-all duration-500"
                title={`Consultations: ${consultPct}%`}
              />
              <div
                style={{ width: `${inquiryPct}%` }}
                className="h-full bg-violet-400 transition-all duration-500"
                title={`Contact form: ${inquiryPct}%`}
              />
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-sky-400" />
                  <span className="truncate text-xs text-slate-300">Consultation popup</span>
                  <span className="text-xs tabular-nums text-slate-500">{consultCount}</span>
                </div>
                <span className="text-xs font-semibold tabular-nums text-sky-300">{consultPct}%</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-violet-400" />
                  <span className="truncate text-xs text-slate-300">Contact section</span>
                  <span className="text-xs tabular-nums text-slate-500">{inquiryCount}</span>
                </div>
                <span className="text-xs font-semibold tabular-nums text-violet-300">{inquiryPct}%</span>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/[0.07] pt-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">
                Pipeline distribution
              </p>
              <button
                type="button"
                onClick={() => onNavigateTab('pipeline')}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-lime-300 transition-colors hover:text-lime-200"
              >
                Open pipeline <ChevronRight className="h-3 w-3" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'New', value: statusCounts.New, color: 'text-emerald-300' },
                { label: 'Contacted', value: statusCounts.Contacted, color: 'text-sky-300' },
                { label: 'In discussion', value: statusCounts['In Discussion'], color: 'text-amber-300' },
                { label: 'Converted', value: statusCounts.Converted, color: 'text-lime-300' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.025] px-3 py-2.5"
                >
                  <span className="text-[11px] text-slate-400">{item.label}</span>
                  <span className={`text-sm font-semibold tabular-nums ${item.color}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Requested services */}
        <div className={`${cardClass} flex flex-col p-4 sm:p-5`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-white">Top requested services</h3>
              <p className="mt-1 text-[11px] text-slate-500">
                Most frequently selected services
              </p>
            </div>
            <div className="rounded-lg bg-lime-400/[0.08] p-2 text-lime-300">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>

          {topServices.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
              <div className="mb-3 rounded-xl bg-white/[0.04] p-3 text-slate-500">
                <Inbox className="h-5 w-5" />
              </div>
              <p className="text-xs font-medium text-slate-300">No service data yet</p>
              <p className="mt-1 text-[11px] text-slate-500">
                Service insights will appear when leads arrive.
              </p>
            </div>
          ) : (
            <div className="mt-6 flex-1 space-y-5">
              {topServices.map(([serviceName, count], index) => {
                const pct =
                  totalLeadsCount > 0
                    ? Math.min(100, Math.round((count / totalLeadsCount) * 100))
                    : 0;

                return (
                  <div key={serviceName}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-600">
                          0{index + 1}
                        </span>
                        <span className="truncate text-xs font-medium text-slate-200">
                          {serviceName}
                        </span>
                      </div>
                      <span className="shrink-0 text-[11px] tabular-nums text-slate-400">
                        {count} <span className="text-slate-600">·</span> {pct}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#202A38]">
                      <div
                        style={{ width: `${pct}%` }}
                        className="h-full rounded-full bg-lime-400 transition-all duration-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <button
            type="button"
            onClick={() => onNavigateTab('analytics')}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-xs font-semibold text-slate-300 transition-colors hover:border-lime-400/25 hover:bg-lime-400/[0.05] hover:text-lime-200"
          >
            View analytics
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* New leads requiring attention */}
        <div className={`${cardClass} p-4 sm:p-5`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-white">Requires attention</h3>
              <p className="mt-1 text-[11px] text-slate-500">
                New inquiries awaiting a response
              </p>
            </div>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-2.5 py-1 text-[10px] font-semibold tabular-nums text-emerald-300">
              {newLeadsQueue.length} new
            </span>
          </div>

          <div className="mt-5 space-y-2">
            {newLeadsQueue.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-3 rounded-xl bg-lime-400/[0.08] p-3 text-lime-300">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-slate-200">You’re all caught up</p>
                <p className="mt-1 text-[11px] text-slate-500">
                  There are no new leads waiting for contact.
                </p>
              </div>
            ) : (
              newLeadsQueue.map((lead) => (
                <div
                  key={lead.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectLead(lead)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onSelectLead(lead);
                    }
                  }}
                  className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 transition-colors hover:border-white/[0.12] hover:bg-white/[0.045] focus:outline-none focus:ring-2 focus:ring-lime-400/40"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-100 transition-colors group-hover:text-lime-200">
                      {lead.fullName}
                    </p>
                    <p className="mt-1 truncate text-[10px] text-slate-500">
                      {lead.service} · {lead.monthlyBudget || 'Budget not specified'}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        void onUpdateStatus(lead.id, 'Contacted');
                      }}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-semibold text-slate-300 transition-colors hover:border-lime-400/25 hover:bg-lime-400/[0.08] hover:text-lime-200"
                      title="Mark lead as contacted"
                    >
                      Mark contacted
                    </button>
                    <Eye className="hidden h-3.5 w-3.5 text-slate-600 sm:block" />
                  </div>
                </div>
              ))
            )}
          </div>

          {newLeadsQueue.length > 0 && (
            <button
              type="button"
              onClick={() => onNavigateTab('all')}
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-lime-300 transition-colors hover:text-lime-200"
            >
              Review all leads <ArrowUpRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </section>

      {/* Recent lead activity */}
      <section className={`${cardClass} overflow-hidden`}>
        <div className="flex flex-col gap-3 border-b border-white/[0.07] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h3 className="text-sm font-semibold text-white">Recent lead activity</h3>
            <p className="mt-1 text-[11px] text-slate-500">
              The latest consultations and project inquiries
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('all')}
            className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-lime-300 transition-colors hover:text-lime-200"
          >
            View all {leads.length} leads
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
            <div className="mb-3 rounded-xl bg-white/[0.04] p-3 text-slate-500">
              <Inbox className="h-5 w-5" />
            </div>
            <p className="text-xs font-medium text-slate-300">No leads to display</p>
            <p className="mt-1 text-[11px] text-slate-500">
              New form submissions will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile-friendly lead cards */}
            <div className="divide-y divide-white/[0.06] md:hidden">
              {leads.slice(0, 5).map((lead) => (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => onSelectLead(lead)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.025]"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold text-white">
                      {lead.fullName}
                    </span>
                    <span className="mt-1 block truncate text-[11px] text-slate-500">
                      {lead.service} · {lead.email}
                    </span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1.5">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold ${statusStyles[lead.status] || statusStyles['Not Interested']}`}
                    >
                      {lead.status}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                  </span>
                </button>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-white/[0.02]">
                  <tr className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    <th className="px-5 py-3.5">Lead ID</th>
                    <th className="px-4 py-3.5">Client</th>
                    <th className="px-4 py-3.5">Service</th>
                    <th className="px-4 py-3.5">Budget</th>
                    <th className="px-4 py-3.5">Source</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.055]">
                  {leads.slice(0, 5).map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => onSelectLead(lead)}
                      className="cursor-pointer transition-colors hover:bg-white/[0.025]"
                    >
                      <td className="whitespace-nowrap px-5 py-4 font-mono text-[10px] text-slate-500">
                        {lead.id}
                      </td>
                      <td className="px-4 py-4">
                        <p className="max-w-[180px] truncate text-xs font-semibold text-slate-100">
                          {lead.fullName}
                        </p>
                        <p className="mt-1 max-w-[180px] truncate text-[10px] text-slate-500">
                          {lead.email}
                        </p>
                      </td>
                      <td className="max-w-[180px] truncate px-4 py-4 text-xs text-slate-300">
                        {lead.service}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-xs text-slate-400">
                        {lead.monthlyBudget || 'Not specified'}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-semibold ${
                            lead.source === 'consultation_popup'
                              ? 'border-sky-400/20 bg-sky-400/10 text-sky-300'
                              : 'border-violet-400/20 bg-violet-400/10 text-violet-300'
                          }`}
                        >
                          {lead.source === 'consultation_popup' ? 'Consultation' : 'Contact'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-[9px] font-semibold ${statusStyles[lead.status] || statusStyles['Not Interested']}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            onSelectLead(lead);
                          }}
                          aria-label={`View ${lead.fullName}`}
                          className="rounded-lg border border-white/[0.07] bg-white/[0.035] p-2 text-slate-400 transition-colors hover:border-lime-400/25 hover:bg-lime-400/[0.08] hover:text-lime-200"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  );
};
