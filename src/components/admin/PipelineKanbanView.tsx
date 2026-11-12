
import React, { useRef, useState } from 'react';
import {
  Sparkles,
  UserCheck,
  MessageSquare,
  Trophy,
  XCircle,
  Calendar,
  Globe,
  ExternalLink,
  ChevronDown,
  Mail,
  DollarSign,
  ArrowRight,
  GripVertical,
  Layers,
  MoveRight,
} from 'lucide-react';

import type { Lead, LeadStatus } from '../../types/crm';

interface PipelineKanbanViewProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onUpdateStatus: (id: string, newStatus: LeadStatus) => Promise<void>;
}

const COLUMNS: {
  id: LeadStatus;
  title: string;
  subtitle: string;
  dot: string;
  badge: string;
  border: string;
  headerBg: string;
  icon: React.ElementType;
}[] = [
  {
    id: 'New',
    title: 'New Inquiries',
    subtitle: 'Recently received',
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400',
    border: 'border-emerald-500/20',
    headerBg: 'bg-emerald-500/[0.04]',
    icon: Sparkles,
  },
  {
    id: 'Contacted',
    title: 'Contacted',
    subtitle: 'Initial contact made',
    dot: 'bg-sky-400',
    badge: 'bg-sky-500/10 text-sky-400',
    border: 'border-sky-500/20',
    headerBg: 'bg-sky-500/[0.04]',
    icon: UserCheck,
  },
  {
    id: 'In Discussion',
    title: 'In Discussion',
    subtitle: 'Active conversations',
    dot: 'bg-amber-400',
    badge: 'bg-amber-500/10 text-amber-400',
    border: 'border-amber-500/20',
    headerBg: 'bg-amber-500/[0.04]',
    icon: MessageSquare,
  },
  {
    id: 'Converted',
    title: 'Converted',
    subtitle: 'Successfully closed',
    dot: 'bg-lime-400',
    badge: 'bg-lime-400/15 text-lime-400',
    border: 'border-lime-400/30',
    headerBg: 'bg-lime-400/[0.04]',
    icon: Trophy,
  },
  {
    id: 'Not Interested',
    title: 'Closed / Lost',
    subtitle: 'Unconverted leads',
    dot: 'bg-slate-400',
    badge: 'bg-slate-500/10 text-slate-400',
    border: 'border-slate-500/20',
    headerBg: 'bg-slate-500/[0.04]',
    icon: XCircle,
  },
];

const ALL_STATUSES: LeadStatus[] = [
  'New',
  'Contacted',
  'In Discussion',
  'Converted',
  'Not Interested',
];

export const PipelineKanbanView: React.FC<PipelineKanbanViewProps> = ({
  leads,
  onSelectLead,
  onUpdateStatus,
}) => {
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<LeadStatus | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const draggedLeadRef = useRef<string | null>(null);
  const didDragRef = useRef(false);

  const totalLeads = leads.length;
  const convertedCount = leads.filter(
    (lead) => lead.status === 'Converted'
  ).length;

  const activeCount = leads.filter(
    (lead) => lead.status !== 'Not Interested' && lead.status !== 'Converted'
  ).length;

  const conversionRate =
    totalLeads > 0
      ? Math.round((convertedCount / totalLeads) * 100)
      : 0;

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    lead: Lead
  ) => {
    draggedLeadRef.current = lead.id;
    didDragRef.current = true;

    setDraggedLeadId(lead.id);

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', lead.id);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    status: LeadStatus
  ) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    if (dragOverColumn !== status) {
      setDragOverColumn(status);
    }
  };

  const handleDrop = async (
    event: React.DragEvent<HTMLDivElement>,
    targetStatus: LeadStatus
  ) => {
    event.preventDefault();

    const leadId =
      event.dataTransfer.getData('text/plain') ||
      draggedLeadRef.current;

    const draggedLead = leads.find((lead) => lead.id === leadId);

    setDragOverColumn(null);
    setDraggedLeadId(null);
    draggedLeadRef.current = null;

    if (
      !draggedLead ||
      draggedLead.status === targetStatus ||
      isUpdating
    ) {
      return;
    }

    try {
      setIsUpdating(true);
      await onUpdateStatus(draggedLead.id, targetStatus);
    } catch (error) {
      console.error('Failed to update lead status:', error);
    } finally {
      setIsUpdating(false);
    }

    window.setTimeout(() => {
      didDragRef.current = false;
    }, 100);
  };

  const handleDragEnd = () => {
    setDraggedLeadId(null);
    setDragOverColumn(null);
    draggedLeadRef.current = null;

    window.setTimeout(() => {
      didDragRef.current = false;
    }, 100);
  };

  const handleLeadClick = (lead: Lead) => {
    if (didDragRef.current) return;
    onSelectLead(lead);
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return '—';
    }

    return parsedDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getWebsiteDisplay = (website: string) => {
    return website.replace(/^https?:\/\//, '').replace(/\/$/, '');
  };

  return (
    <div className="space-y-5">

      {/* Pipeline Overview */}
      <div className="rounded-2xl bg-[#111722] border border-white/[0.07] overflow-hidden">

        <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">

          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-lime-400/10 border border-lime-400/15 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-lime-400" />
            </div>

            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Lead Stage Pipeline
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Manage your leads and track their progress across every stage.
              </p>

              <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
                <GripVertical className="w-3 h-3 text-lime-400" />
                Drag and drop cards to update lead stages
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">

            <div className="px-3 py-2.5 rounded-xl bg-white/[0.025] border border-white/[0.06] min-w-0">
              <p className="text-[10px] text-slate-500">Total Leads</p>
              <p className="text-xl font-bold text-white mt-1 tabular-nums">
                {totalLeads}
              </p>
            </div>

            <div className="px-3 py-2.5 rounded-xl bg-white/[0.025] border border-white/[0.06] min-w-0">
              <p className="text-[10px] text-slate-500">Active</p>
              <p className="text-xl font-bold text-sky-400 mt-1 tabular-nums">
                {activeCount}
              </p>
            </div>

            <div className="px-3 py-2.5 rounded-xl bg-white/[0.025] border border-white/[0.06] min-w-0">
              <p className="text-[10px] text-slate-500">Converted</p>
              <p className="text-xl font-bold text-lime-400 mt-1 tabular-nums">
                {convertedCount}
              </p>
            </div>

          </div>
        </div>

        {/* Conversion Progress */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-500 font-medium">
              Overall conversion progress
            </span>

            <span className="text-[10px] text-lime-400 font-semibold tabular-nums">
              {conversionRate}%
            </span>
          </div>

          <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-lime-400 transition-all duration-500"
              style={{ width: `${conversionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory">

        {COLUMNS.map((col) => {
          const colLeads = leads.filter(
            (lead) => lead.status === col.id
          );

          const ColumnIcon = col.icon;
          const isDropTarget = dragOverColumn === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(event) => handleDragOver(event, col.id)}
              onDrop={(event) => handleDrop(event, col.id)}
              onDragLeave={(event) => {
                if (
                  !event.currentTarget.contains(
                    event.relatedTarget as Node | null
                  )
                ) {
                  setDragOverColumn(null);
                }
              }}
              className={`
                flex flex-col flex-shrink-0 snap-start
                w-[280px] sm:w-[290px]
                min-h-[460px]
                rounded-2xl overflow-hidden
                transition-all duration-200
                ${
                  isDropTarget
                    ? 'bg-lime-400/[0.045] border border-lime-400/50 ring-2 ring-lime-400/10'
                    : 'bg-[#111722] border border-white/[0.07]'
                }
              `}
            >

              {/* Column Header */}
              <div
                className={`
                  p-3.5 border-b border-white/[0.07]
                  flex items-center justify-between
                  ${col.headerBg}
                `}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                    <ColumnIcon className={`w-4 h-4 ${col.dot.replace('bg-', 'text-')}`} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-white truncate">
                      {col.title}
                    </h3>

                    <p className="text-[9px] text-slate-500 mt-0.5">
                      {col.subtitle}
                    </p>
                  </div>
                </div>

                <span
                  className={`
                    text-[11px] font-mono font-bold
                    px-2.5 py-1 rounded-full border shrink-0
                    ${col.badge} ${col.border}
                  `}
                >
                  {colLeads.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="flex-1 p-3 space-y-3 min-h-[380px] max-h-[72vh] overflow-y-auto">

                {colLeads.length === 0 ? (
                  <div
                    className={`
                      min-h-[150px] rounded-xl
                      border border-dashed
                      flex flex-col items-center justify-center
                      text-center p-4 transition-all duration-200
                      ${
                        isDropTarget
                          ? 'border-lime-400/40 bg-lime-400/[0.04]'
                          : 'border-white/[0.07]'
                      }
                    `}
                  >
                    <div className="w-9 h-9 rounded-full bg-white/[0.035] flex items-center justify-center mb-2">
                      <MoveRight className="w-4 h-4 text-slate-500" />
                    </div>

                    <span className="text-xs text-slate-400">
                      {isDropTarget ? 'Drop lead here' : 'No leads in this stage'}
                    </span>

                    <span className="text-[10px] text-slate-600 mt-1">
                      {isDropTarget
                        ? 'Release to update status'
                        : 'Drag a lead card here'}
                    </span>
                  </div>
                ) : (
                  colLeads.map((lead) => {
                    const formattedDate = formatDate(lead.createdAt);

                    const isDragging = draggedLeadId === lead.id;

                    return (
                      <div
                        key={lead.id}
                        draggable={!isUpdating}
                        onDragStart={(event) => handleDragStart(event, lead)}
                        onDragEnd={handleDragEnd}
                        onClick={() => handleLeadClick(lead)}
                        className={`
                          p-3.5 rounded-xl
                          bg-[#171F2B]
                          border border-white/[0.055]
                          shadow-sm
                          transition-all duration-200
                          group relative
                          ${
                            isDragging
                              ? 'opacity-35 scale-[0.97] border-lime-400/40 cursor-grabbing'
                              : 'hover:bg-[#1E293B] hover:border-white/[0.14] hover:-translate-y-0.5 cursor-grab active:cursor-grabbing'
                          }
                        `}
                      >

                        {/* Card Top */}
                        <div className="flex items-center justify-between gap-2 mb-3">

                          <div className="flex items-center gap-1.5 min-w-0">
                            <GripVertical className="w-3.5 h-3.5 text-slate-600 shrink-0 group-hover:text-lime-400 transition-colors" />

                            <span className="font-mono text-[10px] text-slate-500 truncate">
                              {lead.id}
                            </span>
                          </div>

                          <span
                            className={`
                              text-[9px] font-bold uppercase tracking-wider
                              px-1.5 py-0.5 rounded border shrink-0
                              ${
                                lead.source === 'consultation_popup'
                                  ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                                  : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                              }
                            `}
                          >
                            {lead.source === 'consultation_popup'
                              ? 'Call'
                              : 'Inquiry'}
                          </span>
                        </div>

                        {/* Client Name */}
                        <h4 className="text-xs font-bold text-white group-hover:text-lime-400 transition-colors truncate">
                          {lead.fullName}
                        </h4>

                        {/* Website / Email */}
                        <div className="mt-1.5 flex items-center gap-1.5 min-w-0">
                          {lead.websiteUrl ? (
                            <>
                              <Globe className="w-3 h-3 text-slate-500 shrink-0" />

                              <span className="text-[11px] text-slate-400 truncate">
                                {getWebsiteDisplay(lead.websiteUrl)}
                              </span>
                            </>
                          ) : (
                            <>
                              <Mail className="w-3 h-3 text-slate-500 shrink-0" />

                              <span className="text-[11px] text-slate-400 truncate">
                                {lead.email}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Service and Date */}
                        <div className="mt-3 pt-2.5 border-t border-white/[0.055] flex items-center justify-between gap-2">

                          <span className="text-[11px] text-lime-400 font-medium truncate max-w-[150px]">
                            {lead.service}
                          </span>

                          <span className="text-[10px] text-slate-500 font-mono shrink-0 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formattedDate}
                          </span>
                        </div>

                        {/* Budget */}
                        {lead.monthlyBudget && (
                          <div className="mt-2 flex items-center gap-1.5 text-[10px]">
                            <DollarSign className="w-3 h-3 text-slate-500" />

                            <span className="text-slate-500">
                              Budget:
                            </span>

                            <span className="text-slate-300 font-medium">
                              {lead.monthlyBudget}
                            </span>
                          </div>
                        )}

                        {/* Quick Status Selector */}
                        <div
                          className="mt-3 pt-2.5 border-t border-white/[0.055] flex items-center justify-between gap-2"
                          onClick={(event) => event.stopPropagation()}
                          onDragStart={(event) => event.stopPropagation()}
                        >
                          <span className="text-[10px] text-slate-500">
                            Move to
                          </span>

                          <div className="relative flex items-center">
                            <select
                              value={lead.status}
                              disabled={isUpdating}
                              onChange={(event) =>
                                onUpdateStatus(
                                  lead.id,
                                  event.target.value as LeadStatus
                                )
                              }
                              className="
                                appearance-none
                                text-[10px] font-semibold
                                bg-[#111722]
                                border border-white/10
                                text-slate-300
                                rounded-lg
                                pl-2.5 pr-7 py-1.5
                                outline-none
                                cursor-pointer
                                hover:border-lime-400/50
                                focus:border-lime-400/60
                                disabled:opacity-50
                                transition-colors
                              "
                            >
                              {ALL_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>

                            <ChevronDown className="absolute right-2 w-3 h-3 text-slate-500 pointer-events-none" />
                          </div>
                        </div>

                      </div>
                    );
                  })
                )}

              </div>

              {/* Column Footer */}
              <div className="px-3.5 py-2.5 border-t border-white/[0.055] flex items-center justify-between">
                <span className="text-[9px] text-slate-500">
                  {colLeads.length} {colLeads.length === 1 ? 'lead' : 'leads'}
                </span>

                <span className="text-[9px] text-slate-600 flex items-center gap-1">
                  <GripVertical className="w-3 h-3" />
                  Drag to move
                </span>
              </div>

            </div>
          );
        })}

      </div>

      {/* Board Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-1">
        <p className="text-[10px] text-slate-500">
          Lead status changes are saved through your existing CRM system.
        </p>

        <p className="text-[10px] text-slate-600">
          {totalLeads} total opportunities
        </p>
      </div>

    </div>
  );
};
