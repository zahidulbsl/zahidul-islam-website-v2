import React, { useEffect, useState } from 'react';
import {
  X,
  Mail,
  ExternalLink,
  MessageSquare,
  Calendar,
  Clock,
  Globe,
  DollarSign,
  Copy,
  Check,
  Trash2,
  Save,
  ChevronDown,
  Briefcase,
  Layers,
  User,
  FileText,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Loader2,
} from 'lucide-react';

import type { Lead, LeadStatus } from '../../types/crm';
import { ConfirmDialog } from './ConfirmDialog';

interface LeadDetailDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (
    id: string,
    newStatus: LeadStatus,
    notes?: string
  ) => Promise<void>;
  onDeleteLead: (id: string) => Promise<void>;
}

const ALL_STATUSES: LeadStatus[] = [
  'New',
  'Contacted',
  'In Discussion',
  'Converted',
  'Not Interested',
];

const STATUS_CONFIG: Record<
  LeadStatus,
  {
    label: string;
    badge: string;
    dot: string;
    border: string;
    accent: string;
  }
> = {
  New: {
    label: 'New Lead',
    badge: 'bg-emerald-400/10 text-emerald-400',
    dot: 'bg-emerald-400',
    border: 'border-emerald-400/20',
    accent: 'bg-emerald-400',
  },
  Contacted: {
    label: 'Contacted',
    badge: 'bg-sky-400/10 text-sky-400',
    dot: 'bg-sky-400',
    border: 'border-sky-400/20',
    accent: 'bg-sky-400',
  },
  'In Discussion': {
    label: 'In Discussion',
    badge: 'bg-amber-400/10 text-amber-400',
    dot: 'bg-amber-400',
    border: 'border-amber-400/20',
    accent: 'bg-amber-400',
  },
  Converted: {
    label: 'Converted',
    badge: 'bg-lime-400/10 text-lime-400',
    dot: 'bg-lime-400',
    border: 'border-lime-400/20',
    accent: 'bg-lime-400',
  },
  'Not Interested': {
    label: 'Not Interested',
    badge: 'bg-slate-400/10 text-slate-400',
    dot: 'bg-slate-400',
    border: 'border-slate-400/20',
    accent: 'bg-slate-400',
  },
};

const formatDate = (date: string | Date) => {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return 'Not available';

  return parsed.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getInitials = (name: string) => {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const normalizeWebsite = (url: string) => {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const SectionHeader = ({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-3 mb-4">
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-lime-400" />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-white tracking-tight">
          {title}
        </h3>

        {description && (
          <p className="text-[11px] text-slate-500 mt-0.5">
            {description}
          </p>
        )}
      </div>
    </div>

    {action}
  </div>
);

const InfoItem = ({
  icon: Icon,
  label,
  value,
  copyValue,
  copied,
  onCopy,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  copyValue?: string;
  copied?: boolean;
  onCopy?: (value: string, field: string) => void;
}) => (
  <div className="flex items-start justify-between gap-4 py-3 border-b border-white/[0.045] last:border-0">
    <div className="flex items-center gap-2.5 text-xs text-slate-500 shrink-0">
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </div>

    <div className="flex items-center gap-2 min-w-0 text-right">
      <div className="text-xs font-medium text-slate-200 break-all">
        {value}
      </div>

      {copyValue && onCopy && (
        <button
          type="button"
          onClick={() => onCopy(copyValue, label)}
          title={`Copy ${label}`}
          className="shrink-0 text-slate-500 hover:text-lime-400 transition-colors"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-lime-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      )}
    </div>
  </div>
);

const DetailCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={`rounded-2xl border border-white/[0.07] bg-[#101722] p-4 sm:p-5 ${className}`}
  >
    {children}
  </section>
);

// Keep hooks inside this component so the parent can safely return null.
const LeadDetailDrawerContent: React.FC<
  LeadDetailDrawerProps & { lead: Lead }
> = ({
  lead,
  onClose,
  onUpdateStatus,
  onDeleteLead,
}) => {
  const [currentStatus, setCurrentStatus] = useState<LeadStatus>(
    lead.status
  );

  const [notes, setNotes] = useState(lead.notes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setCurrentStatus(lead.status);
    setNotes(lead.notes || '');
  }, [lead.id, lead.status, lead.notes]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !showDeleteConfirm) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, showDeleteConfirm]);

  const statusConfig = STATUS_CONFIG[currentStatus];

  const cleanPhone = lead.whatsappNumber
    ? lead.whatsappNumber.replace(/[^0-9+]/g, '')
    : '';

  const waLink = cleanPhone
    ? `https://wa.me/${cleanPhone.replace('+', '')}`
    : null;

  const websiteLink = lead.websiteUrl
    ? normalizeWebsite(lead.websiteUrl)
    : null;

  const hasUnsavedNotes = notes !== (lead.notes || '');

  const handleCopy = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);

      window.setTimeout(() => {
        setCopiedField((current) =>
          current === field ? null : current
        );
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (newStatus === currentStatus || isUpdatingStatus) return;

    const previousStatus = currentStatus;

    setCurrentStatus(newStatus);
    setIsUpdatingStatus(true);

    try {
      await onUpdateStatus(lead.id, newStatus, notes);
    } catch (error) {
      console.error('Failed to update status:', error);
      setCurrentStatus(previousStatus);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (isSavingNotes || !hasUnsavedNotes) return;

    setIsSavingNotes(true);

    try {
      await onUpdateStatus(lead.id, currentStatus, notes);
    } catch (error) {
      console.error('Failed to save notes:', error);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    try {
      await onDeleteLead(lead.id);
      setShowDeleteConfirm(false);
      onClose();
    } catch (error) {
      console.error('Failed to delete lead:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const initials = getInitials(lead.fullName);
  const formattedCreated = formatDate(lead.createdAt);
  const formattedUpdated = formatDate(lead.updatedAt);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/65 backdrop-blur-[3px] animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Lead details for ${lead.fullName}`}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[620px] flex-col overflow-hidden border-l border-white/[0.08] bg-[#0B1018] shadow-2xl font-sans animate-slideLeft"
      >
        {/* Top Bar */}
        <header className="flex h-[68px] shrink-0 items-center justify-between gap-3 border-b border-white/[0.07] bg-[#0E1520] px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-lime-400/15 bg-lime-400/[0.08]">
              <User className="h-4 w-4 text-lime-400" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                CRM Workspace
              </p>

              <p className="truncate text-xs font-medium text-slate-300">
                Lead Profile
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopy(lead.id, 'id')}
              title="Copy Lead ID"
              className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.035] px-2.5 py-2 font-mono text-[10px] text-slate-400 transition hover:border-lime-400/20 hover:text-lime-400"
            >
              <span>{lead.id}</span>
              {copiedField === 'id' ? (
                <Check className="h-3 w-3 text-lime-400" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-slate-400 transition hover:border-white/15 hover:bg-white/[0.08] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="space-y-5 p-4 sm:p-6">

            {/* Profile Header */}
            <section className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#172231] via-[#111A27] to-[#101722] p-5 sm:p-6">
              <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-lime-400/[0.06] blur-3xl" />

              <div className="relative flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-lime-400/25 bg-lime-400/[0.10] text-lg font-bold tracking-wide text-lime-400 shadow-lg shadow-lime-400/[0.04]">
                  {initials}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                      {lead.fullName}
                    </h2>

                    <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                      {lead.source === 'consultation_popup'
                        ? 'Consultation'
                        : 'Project Inquiry'}
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs text-slate-400">
                    {lead.service}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
                    <Clock className="h-3 w-3" />
                    <span>Submitted {formattedCreated}</span>
                  </div>
                </div>
              </div>

              {/* Status Control */}
              <div className="relative mt-5 flex flex-col gap-2 border-t border-white/[0.07] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Lead Status
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Update the current pipeline stage
                  </p>
                </div>

                <div className="relative">
                  <select
                    value={currentStatus}
                    disabled={isUpdatingStatus}
                    onChange={(event) =>
                      handleStatusChange(
                        event.target.value as LeadStatus
                      )
                    }
                    className={`w-full appearance-none rounded-xl border py-2.5 pl-3 pr-9 text-xs font-semibold outline-none transition disabled:cursor-wait disabled:opacity-60 sm:w-auto ${statusConfig.badge} ${statusConfig.border}`}
                  >
                    {ALL_STATUSES.map((status) => (
                      <option
                        key={status}
                        value={status}
                        className="bg-[#111722] text-slate-200"
                      >
                        {status}
                      </option>
                    ))}
                  </select>

                  {isUpdatingStatus ? (
                    <Loader2 className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin text-slate-400" />
                  ) : (
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  )}
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section>
              <SectionHeader
                icon={Sparkles}
                title="Quick Actions"
                description="Contact this potential client"
              />

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                <a
                  href={`mailto:${lead.email}?subject=Regarding%20Your%20Inquiry%20-%20Zahidul%20Islam`}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-[#131C29] text-xs font-semibold text-slate-300 transition hover:border-lime-400/20 hover:bg-lime-400/[0.06] hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                  <ArrowUpRight className="h-3 w-3 text-slate-500" />
                </a>

                {waLink ? (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] text-xs font-semibold text-emerald-400 transition hover:bg-emerald-400/[0.12]"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    WhatsApp
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                ) : (
                  <div className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.04] bg-white/[0.02] text-xs text-slate-600">
                    <MessageSquare className="h-3.5 w-3.5" />
                    No WhatsApp
                  </div>
                )}

                {websiteLink ? (
                  <a
                    href={websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-[#131C29] text-xs font-semibold text-slate-300 transition hover:border-lime-400/20 hover:bg-lime-400/[0.06] hover:text-white sm:col-span-1"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    Website
                    <ExternalLink className="h-3 w-3 text-slate-500" />
                  </a>
                ) : (
                  <div className="col-span-2 flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.04] bg-white/[0.02] text-xs text-slate-600 sm:col-span-1">
                    <Globe className="h-3.5 w-3.5" />
                    No Website
                  </div>
                )}
              </div>
            </section>

            {/* Client Information */}
            <DetailCard>
              <SectionHeader
                icon={Layers}
                title="Client Information"
                description="Contact and commercial details"
              />

              <div>
                <InfoItem
                  icon={Mail}
                  label="Email Address"
                  value={lead.email}
                  copyValue={lead.email}
                  copied={copiedField === 'Email Address'}
                  onCopy={handleCopy}
                />

                <InfoItem
                  icon={MessageSquare}
                  label="WhatsApp"
                  value={
                    lead.whatsappNumber || (
                      <span className="italic text-slate-600">
                        Not provided
                      </span>
                    )
                  }
                  copyValue={lead.whatsappNumber || undefined}
                  copied={copiedField === 'WhatsApp'}
                  onCopy={handleCopy}
                />

                <InfoItem
                  icon={Globe}
                  label="Website / Store"
                  value={
                    websiteLink ? (
                      <a
                        href={websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-lime-400 hover:underline"
                      >
                        {lead.websiteUrl}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="italic text-slate-600">
                        Not provided
                      </span>
                    )
                  }
                />

                <InfoItem
                  icon={Briefcase}
                  label="Service"
                  value={
                    <span className="font-semibold text-lime-400">
                      {lead.service}
                    </span>
                  }
                />

                <InfoItem
                  icon={DollarSign}
                  label="Monthly Spend"
                  value={
                    lead.monthlyBudget || (
                      <span className="italic text-slate-600">
                        Not specified
                      </span>
                    )
                  }
                />

                <InfoItem
                  icon={Clock}
                  label="Last Updated"
                  value={
                    <span className="font-mono text-[10px] text-slate-400">
                      {formattedUpdated}
                    </span>
                  }
                />
              </div>
            </DetailCard>

            {/* Consultation Schedule */}
            {(lead.preferredDate ||
              lead.preferredTime ||
              lead.timezone) && (
              <DetailCard>
                <SectionHeader
                  icon={Calendar}
                  title="Consultation Schedule"
                  description="Client's preferred meeting time"
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/[0.05] bg-[#0B121D] p-3.5">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                      Preferred Date
                    </p>
                    <p className="mt-2 text-xs font-semibold text-white">
                      {lead.preferredDate || 'Flexible'}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.05] bg-[#0B121D] p-3.5">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                      Time Window
                    </p>
                    <p className="mt-2 text-xs font-semibold text-white">
                      {lead.preferredTime || 'Flexible'}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.05] bg-[#0B121D] p-3.5">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                      Time Zone
                    </p>
                    <p className="mt-2 break-words text-xs font-semibold text-white">
                      {lead.timezone || 'Not specified'}
                    </p>
                  </div>
                </div>
              </DetailCard>
            )}

            {/* Project Details */}
            <DetailCard>
              <SectionHeader
                icon={FileText}
                title="Project Scope"
                description="Original message submitted by the client"
                action={
                  lead.projectDetails ? (
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(lead.projectDetails, 'details')
                      }
                      className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 transition hover:text-lime-400"
                    >
                      {copiedField === 'details' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-lime-400" />
                          <span className="text-lime-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  ) : undefined
                }
              />

              <div className="rounded-xl border border-white/[0.05] bg-[#0B121D] p-4 text-xs leading-7 text-slate-300">
                {lead.projectDetails || (
                  <span className="italic text-slate-600">
                    No project details provided.
                  </span>
                )}
              </div>
            </DetailCard>

            {/* Internal Notes */}
            <DetailCard>
              <SectionHeader
                icon={ShieldCheck}
                title="Internal CRM Notes"
                description="Private notes visible only to the administrator"
                action={
                  <span className="rounded-md border border-lime-400/15 bg-lime-400/[0.06] px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-lime-400">
                    Private
                  </span>
                }
              />

              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={5}
                placeholder="Add discovery call notes, client requirements, ad spend details, proposal milestones, or follow-up reminders..."
                className="w-full resize-y rounded-xl border border-white/[0.08] bg-[#0B121D] p-4 text-xs leading-6 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-lime-400/40 focus:ring-2 focus:ring-lime-400/[0.06]"
              />

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-[10px]">
                  {hasUnsavedNotes ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span className="text-amber-400">
                        Unsaved changes
                      </span>
                    </>
                  ) : (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-slate-500">
                        Notes are up to date
                      </span>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes || !hasUnsavedNotes}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl bg-lime-400 px-4 text-xs font-bold text-[#0B1018] shadow-lg shadow-lime-400/[0.08] transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isSavingNotes ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}

                  {isSavingNotes ? 'Saving Notes...' : 'Save Notes'}
                </button>
              </div>
            </DetailCard>

            {/* Record Timeline */}
            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <Clock className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-[10px] text-slate-500">
                  Record created
                </span>
              </div>

              <span className="text-[10px] font-medium text-slate-400">
                {formattedCreated}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex min-h-[72px] shrink-0 items-center justify-between gap-3 border-t border-white/[0.07] bg-[#0E1520] px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="flex h-10 items-center gap-2 rounded-xl border border-rose-400/15 bg-rose-400/[0.06] px-3.5 text-xs font-semibold text-rose-400 transition hover:border-rose-400/30 hover:bg-rose-400/[0.12]"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete Lead
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.09] hover:text-white"
          >
            Close
            <X className="h-3.5 w-3.5" />
          </button>
        </footer>
      </aside>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title={`Delete Lead ${lead.id}?`}
        message={`This will permanently remove ${lead.fullName}'s inquiry from Supabase PostgreSQL. This action cannot be undone.`}
        confirmLabel="Yes, Delete Permanently"
        isDestructive
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
};

export const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({
  lead,
  isOpen,
  onClose,
  onUpdateStatus,
  onDeleteLead,
}) => {
  if (!isOpen || !lead) return null;

  return (
    <LeadDetailDrawerContent
      lead={lead}
      isOpen={isOpen}
      onClose={onClose}
      onUpdateStatus={onUpdateStatus}
      onDeleteLead={onDeleteLead}
    />
  );
};