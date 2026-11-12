
import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Target,
  Trophy,
  Users,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  UserCheck,
  MessageSquare,
  BriefcaseBusiness,
  DollarSign,
  Activity,
  Sparkles,
  CircleDot,
} from 'lucide-react';

import type { Lead, LeadStats } from '../../types/crm';

interface AnalyticsViewProps {
  stats: LeadStats | null;
  leads: Lead[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  stats,
  leads,
}) => {
  // Core Metrics
  const total = stats?.totalLeads || leads.length;

  const converted =
    stats?.convertedLeads ||
    leads.filter((l) => l.status === 'Converted').length;

  const inDiscussion = leads.filter(
    (l) => l.status === 'In Discussion'
  ).length;

  const contacted =
    stats?.contactedLeads ||
    leads.filter((l) => l.status === 'Contacted').length;

  const newLeads =
    stats?.newLeads ||
    leads.filter((l) => l.status === 'New').length;

  const conversionRate =
    total > 0 ? ((converted / total) * 100).toFixed(1) : '0.0';

  const qualificationRate =
    total > 0
      ? (((converted + inDiscussion) / total) * 100).toFixed(1)
      : '0.0';

  const activeOpportunities = newLeads + contacted + inDiscussion;

  // Service Breakdown
  const serviceMap: Record<string, number> = {};

  leads.forEach((lead) => {
    const service = lead.service || 'Unspecified';
    serviceMap[service] = (serviceMap[service] || 0) + 1;
  });

  const servicesRanked = Object.entries(serviceMap).sort(
    (a, b) => b[1] - a[1]
  );

  // Budget Breakdown
  const budgetMap: Record<string, number> = {};

  leads.forEach((lead) => {
    const budget = lead.monthlyBudget || 'Unspecified';
    budgetMap[budget] = (budgetMap[budget] || 0) + 1;
  });

  const budgetsRanked = Object.entries(budgetMap).sort(
    (a, b) => b[1] - a[1]
  );

  // Recent Timeline
  const dateMap: Record<string, number> = {};

  leads.forEach((lead) => {
    const parsedDate = new Date(lead.createdAt);

    if (Number.isNaN(parsedDate.getTime())) return;

    const date = parsedDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });

    dateMap[date] = (dateMap[date] || 0) + 1;
  });

  const recentDays = Object.entries(dateMap).slice(0, 7);

  // Acquisition Channels
  const consultCount =
    stats?.consultationRequests ||
    leads.filter((l) => l.source === 'consultation_popup').length;

  const inquiryCount =
    stats?.projectInquiries ||
    leads.filter((l) => l.source === 'contact_section').length;

  const primaryChannel =
    consultCount >= inquiryCount ? 'Consultations' : 'Contact Forms';

  const primaryChannelCount = Math.max(consultCount, inquiryCount);

  const consultationPercentage =
    total > 0 ? Math.round((consultCount / total) * 100) : 0;

  const inquiryPercentage =
    total > 0 ? Math.round((inquiryCount / total) * 100) : 0;

  // Funnel Percentages
  const contactedPercentage =
    total > 0
      ? Math.round(
          ((contacted + inDiscussion + converted) / total) * 100
        )
      : 0;

  const discussionPercentage =
    total > 0
      ? Math.round(((inDiscussion + converted) / total) * 100)
      : 0;

  // Reusable empty state
  const EmptyState = ({ message }: { message: string }) => (
    <div className="min-h-[150px] flex flex-col items-center justify-center text-center">
      <div className="w-10 h-10 rounded-xl bg-white/[0.035] border border-white/[0.05] flex items-center justify-center mb-3">
        <Activity className="w-4 h-4 text-slate-500" />
      </div>
      <p className="text-xs text-slate-500">{message}</p>
    </div>
  );

  // Metric Card
  const MetricCard = ({
    label,
    value,
    description,
    icon: Icon,
    color,
    accent,
  }: {
    label: string;
    value: string | number;
    description: string;
    icon: React.ElementType;
    color: string;
    accent: string;
  }) => (
    <div className="relative p-5 rounded-2xl bg-[#111722] border border-white/[0.07] overflow-hidden group hover:border-white/[0.14] transition-all duration-300">
      <div
        className={`absolute -right-8 -top-8 w-28 h-28 rounded-full blur-3xl opacity-[0.07] ${accent}`}
      />

      <div className="relative flex items-center justify-between gap-3">
        <span className="text-xs text-slate-400 font-medium">
          {label}
        </span>

        <div className={`w-9 h-9 rounded-xl bg-white/[0.035] flex items-center justify-center ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className={`relative text-2xl sm:text-3xl font-bold tracking-tight mt-4 ${color}`}>
        {value}
      </div>

      <p className="relative text-[11px] text-slate-500 mt-2">
        {description}
      </p>
    </div>
  );

  return (
    <div className="space-y-5">

      {/* Analytics Header */}
      <div className="relative p-5 sm:p-6 rounded-2xl bg-[#111722] border border-white/[0.07] overflow-hidden">

        <div className="absolute right-0 top-0 w-64 h-40 bg-lime-400/[0.035] blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-lime-400/10 border border-lime-400/15 flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5 text-lime-400" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Analytics & Performance
                </h2>

                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-lime-400/10 border border-lime-400/20 text-lime-400">
                  Overview
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-1.5 max-w-lg">
                Monitor lead acquisition, service demand, pipeline
                progression and conversion performance.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 self-start sm:self-center px-3 py-2 rounded-xl bg-white/[0.025] border border-white/[0.07]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
            </span>

            <span className="text-[10px] text-slate-300 font-medium">
              Live Database Records
            </span>

            <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
          </div>

        </div>

        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/[0.06]">

          <div>
            <p className="text-[10px] text-slate-500">Total Records</p>
            <p className="text-sm font-bold text-white mt-1">{total}</p>
          </div>

          <div>
            <p className="text-[10px] text-slate-500">Active Pipeline</p>
            <p className="text-sm font-bold text-sky-400 mt-1">
              {activeOpportunities}
            </p>
          </div>

          <div>
            <p className="text-[10px] text-slate-500">Converted</p>
            <p className="text-sm font-bold text-lime-400 mt-1">
              {converted}
            </p>
          </div>

          <div>
            <p className="text-[10px] text-slate-500">Primary Channel</p>
            <p className="text-sm font-bold text-purple-400 mt-1">
              {primaryChannel}
            </p>
          </div>

        </div>
      </div>

      {/* KPI Cards */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="text-sm font-bold text-white">
              Key Performance Indicators
            </h3>
            <p className="text-[10px] text-slate-500 mt-1">
              Essential metrics across your lead pipeline
            </p>
          </div>

          <Target className="w-4 h-4 text-slate-500" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

          <MetricCard
            label="Conversion Rate"
            value={`${conversionRate}%`}
            description={`${converted} converted out of ${total} total leads`}
            icon={Trophy}
            color="text-lime-400"
            accent="bg-lime-400"
          />

          <MetricCard
            label="Qualified Pipeline"
            value={`${qualificationRate}%`}
            description="In discussion or converted leads"
            icon={Target}
            color="text-sky-400"
            accent="bg-sky-400"
          />

          <MetricCard
            label="Active Opportunities"
            value={activeOpportunities}
            description="New, contacted and discussion stages"
            icon={Layers}
            color="text-amber-400"
            accent="bg-amber-400"
          />

          <MetricCard
            label="Primary Acquisition"
            value={primaryChannel}
            description={`${primaryChannelCount} leads through primary channel`}
            icon={TrendingUp}
            color="text-purple-400"
            accent="bg-purple-400"
          />

        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Service Demand */}
        <div className="p-5 rounded-2xl bg-[#111722] border border-white/[0.07]">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-white">
                Service Demand
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">
                Most requested services
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-lime-400/[0.07] flex items-center justify-center">
              <BriefcaseBusiness className="w-4 h-4 text-lime-400" />
            </div>
          </div>

          {servicesRanked.length === 0 ? (
            <EmptyState message="No service data available yet." />
          ) : (
            <div className="space-y-5">

              {servicesRanked.map(([service, count], index) => {
                const percentage =
                  total > 0 ? Math.round((count / total) * 100) : 0;

                return (
                  <div key={service} className="space-y-2">

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[10px] font-mono text-slate-600">
                          0{index + 1}
                        </span>

                        <span className="text-xs font-medium text-slate-200 truncate">
                          {service}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-slate-500">
                          {count} leads
                        </span>

                        <span className="text-[11px] font-bold text-lime-400 w-9 text-right">
                          {percentage}%
                        </span>
                      </div>
                    </div>

                    <div className="h-2 w-full rounded-full bg-[#1B2431] overflow-hidden">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="h-full bg-gradient-to-r from-lime-600 to-lime-400 rounded-full transition-all duration-700"
                      />
                    </div>

                  </div>
                );
              })}

            </div>
          )}
        </div>

        {/* Budget Breakdown */}
        <div className="p-5 rounded-2xl bg-[#111722] border border-white/[0.07]">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-white">
                Monthly Ad Spend Tiers
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">
                Lead distribution by submitted budget
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-sky-400/[0.07] flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-sky-400" />
            </div>
          </div>

          {budgetsRanked.length === 0 ? (
            <EmptyState message="No budget information available yet." />
          ) : (
            <div className="space-y-5">

              {budgetsRanked.map(([tier, count], index) => {
                const percentage =
                  total > 0 ? Math.round((count / total) * 100) : 0;

                return (
                  <div key={tier} className="space-y-2">

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[10px] font-mono text-slate-600">
                          0{index + 1}
                        </span>

                        <span className="text-xs font-medium text-slate-200 truncate">
                          {tier}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-slate-500">
                          {count} clients
                        </span>

                        <span className="text-[11px] font-bold text-sky-400 w-9 text-right">
                          {percentage}%
                        </span>
                      </div>
                    </div>

                    <div className="h-2 w-full rounded-full bg-[#1B2431] overflow-hidden">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="h-full bg-gradient-to-r from-sky-600 to-sky-400 rounded-full transition-all duration-700"
                      />
                    </div>

                  </div>
                );
              })}

            </div>
          )}
        </div>

        {/* Pipeline Funnel */}
        <div className="p-5 rounded-2xl bg-[#111722] border border-white/[0.07]">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-white">
                Pipeline Conversion Funnel
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">
                Progression across lead stages
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-amber-400/[0.07] flex items-center justify-center">
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
          </div>

          <div className="space-y-3">

            {/* Total Leads */}
            <div className="p-3.5 rounded-xl bg-[#171F2B] border border-white/[0.055]">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-medium text-slate-300">
                    Total Inquiries Captured
                  </span>
                </div>

                <span className="text-xs font-bold text-white font-mono">
                  {total}
                </span>
              </div>

              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full w-full bg-slate-400 rounded-full" />
              </div>
            </div>

            {/* Contacted */}
            <div className="p-3.5 rounded-xl bg-[#171F2B] border border-white/[0.055]">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-xs font-medium text-slate-300">
                    Reached / Contacted
                  </span>
                </div>

                <span className="text-xs font-bold text-sky-400 font-mono">
                  {contacted + inDiscussion + converted} ({contactedPercentage}%)
                </span>
              </div>

              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-sky-400 rounded-full transition-all duration-700"
                  style={{ width: `${contactedPercentage}%` }}
                />
              </div>
            </div>

            {/* Discussion */}
            <div className="p-3.5 rounded-xl bg-[#171F2B] border border-white/[0.055]">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-medium text-slate-300">
                    Strategy Discussions
                  </span>
                </div>

                <span className="text-xs font-bold text-amber-400 font-mono">
                  {inDiscussion + converted} ({discussionPercentage}%)
                </span>
              </div>

              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-700"
                  style={{ width: `${discussionPercentage}%` }}
                />
              </div>
            </div>

            {/* Converted */}
            <div className="p-3.5 rounded-xl bg-lime-400/[0.035] border border-lime-400/15">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-3.5 h-3.5 text-lime-400" />
                  <span className="text-xs font-semibold text-lime-400">
                    Converted Client Accounts
                  </span>
                </div>

                <span className="text-xs font-bold text-lime-400 font-mono">
                  {converted} ({conversionRate}%)
                </span>
              </div>

              <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                <div
                  className="h-full bg-lime-400 rounded-full transition-all duration-700"
                  style={{ width: `${Number(conversionRate)}%` }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Acquisition Channels */}
        <div className="p-5 rounded-2xl bg-[#111722] border border-white/[0.07]">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-white">
                Acquisition Channels
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">
                Where your inquiries originate
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-purple-400/[0.07] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
          </div>

          <div className="space-y-4">

            <div className="p-4 rounded-xl bg-[#171F2B] border border-white/[0.055]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-medium text-slate-300">
                    Consultation Requests
                  </span>
                </div>

                <span className="text-sm font-bold text-sky-400">
                  {consultCount}
                </span>
              </div>

              <div className="h-2 rounded-full bg-white/[0.06] mt-3 overflow-hidden">
                <div
                  className="h-full rounded-full bg-sky-400 transition-all duration-700"
                  style={{ width: `${consultationPercentage}%` }}
                />
              </div>

              <p className="text-[10px] text-slate-500 mt-2">
                {consultationPercentage}% of total leads
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#171F2B] border border-white/[0.055]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-medium text-slate-300">
                    Project Inquiries
                  </span>
                </div>

                <span className="text-sm font-bold text-purple-400">
                  {inquiryCount}
                </span>
              </div>

              <div className="h-2 rounded-full bg-white/[0.06] mt-3 overflow-hidden">
                <div
                  className="h-full rounded-full bg-purple-400 transition-all duration-700"
                  style={{ width: `${inquiryPercentage}%` }}
                />
              </div>

              <p className="text-[10px] text-slate-500 mt-2">
                {inquiryPercentage}% of total leads
              </p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-white/[0.055] bg-white/[0.02]">
              <div>
                <p className="text-[10px] text-slate-500">
                  Leading Acquisition Channel
                </p>
                <p className="text-xs font-bold text-white mt-1">
                  {primaryChannel}
                </p>
              </div>

              <ArrowUpRight className="w-4 h-4 text-lime-400" />
            </div>

          </div>
        </div>

      </div>

      {/* Recent Activity Timeline */}
      <div className="p-5 rounded-2xl bg-[#111722] border border-white/[0.07]">

        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-white">
              Recent Lead Activity
            </h3>
            <p className="text-[10px] text-slate-500 mt-1">
              Recorded lead volume by submission date
            </p>
          </div>

          <div className="w-9 h-9 rounded-xl bg-lime-400/[0.07] flex items-center justify-center">
            <Activity className="w-4 h-4 text-lime-400" />
          </div>
        </div>

        {recentDays.length === 0 ? (
          <EmptyState message="No recent activity records available." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {recentDays.map(([day, count], index) => (
              <div
                key={day}
                className="relative p-4 rounded-xl bg-[#171F2B] border border-white/[0.055] hover:border-lime-400/20 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">
                    {day}
                  </span>

                  <CircleDot
                    className={`w-3.5 h-3.5 ${
                      index === 0 ? 'text-lime-400' : 'text-slate-600'
                    }`}
                  />
                </div>

                <div className="flex items-end justify-between mt-4">
                  <div>
                    <p className="text-2xl font-bold text-white tabular-nums">
                      {count}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {count === 1 ? 'New lead' : 'New leads'}
                    </p>
                  </div>

                  <span className="text-[10px] font-bold text-lime-400">
                    +{count}
                  </span>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>

      {/* Analytics Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
          <p className="text-[10px] text-slate-500">
            Analytics calculated from available CRM lead records.
          </p>
        </div>

        <p className="text-[10px] text-slate-600">
          {total} total records
        </p>
      </div>

    </div>
  );
};
