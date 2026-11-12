
import React, { useMemo, useState } from 'react';
import {
  Search,
  Filter,
  RefreshCw,
  Download,
  Eye,
  Trash2,
  ChevronDown,
  Mail,
  MessageSquare,
  Globe,
  Calendar,
  X,
  FileSpreadsheet,
  Users,
  ArrowUpDown,
  Clock3,
  CheckCircle2,
  CircleDot,
} from 'lucide-react';
import type { Lead, LeadStatus } from '../../types/crm';
import { ConfirmDialog } from './ConfirmDialog';

interface LeadsTableViewProps {
  leads: Lead[];
  loading: boolean;
  onRefresh: () => void;
  onSelectLead: (lead: Lead) => void;
  onUpdateStatus: (id: string, newStatus: LeadStatus) => Promise<void>;
  onDeleteLead: (id: string) => Promise<void>;
}

const STATUS_OPTIONS: LeadStatus[] = [
  'New',
  'Contacted',
  'In Discussion',
  'Converted',
  'Not Interested',
];

const getStatusStyle = (status: LeadStatus) => {
  switch (status) {
    case 'New':
      return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
    case 'Contacted':
      return 'bg-sky-400/10 text-sky-400 border-sky-400/20';
    case 'In Discussion':
      return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
    case 'Converted':
      return 'bg-lime-400/10 text-lime-400 border-lime-400/20';
    case 'Not Interested':
      return 'bg-slate-400/10 text-slate-400 border-slate-400/20';
    default:
      return 'bg-white/5 text-slate-400 border-white/10';
  }
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const formatSource = (source: string) =>
  source === 'consultation_popup' ? 'Consultation' : 'Contact';

export const LeadsTableView: React.FC<LeadsTableViewProps> = ({
  leads,
  loading,
  onRefresh,
  onSelectLead,
  onUpdateStatus,
  onDeleteLead,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const availableServices = useMemo(
    () => Array.from(new Set(leads.map((lead) => lead.service).filter(Boolean))),
    [leads]
  );

  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        if (statusFilter !== 'All' && lead.status !== statusFilter) {
          return false;
        }

        if (sourceFilter !== 'All' && lead.source !== sourceFilter) {
          return false;
        }

        if (
          serviceFilter !== 'All' &&
          !lead.service.toLowerCase().includes(serviceFilter.toLowerCase())
        ) {
          return false;
        }

        if (search.trim()) {
          const query = search.trim().toLowerCase();

          const matches =
            lead.id.toLowerCase().includes(query) ||
            lead.fullName.toLowerCase().includes(query) ||
            lead.email.toLowerCase().includes(query) ||
            lead.service.toLowerCase().includes(query) ||
            (lead.websiteUrl &&
              lead.websiteUrl.toLowerCase().includes(query)) ||
            (lead.whatsappNumber &&
              lead.whatsappNumber.toLowerCase().includes(query));

          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();

        return sortBy === 'oldest'
          ? timeA - timeB
          : timeB - timeA;
      });
  }, [leads, search, statusFilter, sourceFilter, serviceFilter, sortBy]);

  const statusCounts = useMemo(() => {
    return {
      total: leads.length,
      new: leads.filter((lead) => lead.status === 'New').length,
      contacted: leads.filter((lead) => lead.status === 'Contacted').length,
      converted: leads.filter((lead) => lead.status === 'Converted').length,
    };
  }, [leads]);

  const isFiltered =
    search.trim() !== '' ||
    statusFilter !== 'All' ||
    sourceFilter !== 'All' ||
    serviceFilter !== 'All' ||
    sortBy !== 'newest';

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setSourceFilter('All');
    setServiceFilter('All');
    setSortBy('newest');
  };

  const handleExportCSV = () => {
    if (filteredLeads.length === 0) return;

    const headers = [
      'Lead ID',
      'Full Name',
      'Email',
      'WhatsApp Number',
      'Website URL',
      'Service',
      'Monthly Budget',
      'Source',
      'Status',
      'Preferred Date',
      'Preferred Time',
      'Timezone',
      'Project Details',
      'Internal Notes',
      'Created At',
      'Updated At',
    ];

    const escapeCSV = (value: unknown) =>
      `"${String(value ?? '').replace(/"/g, '""')}"`;

    const rows = filteredLeads.map((lead) => [
      lead.id,
      lead.fullName,
      lead.email,
      lead.whatsappNumber,
      lead.websiteUrl,
      lead.service,
      lead.monthlyBudget,
      lead.source,
      lead.status,
      lead.preferredDate,
      lead.preferredTime,
      lead.timezone,
      lead.projectDetails,
      lead.notes,
      lead.createdAt,
      lead.updatedAt,
    ]);

    const csvContent = [
      headers.map(escapeCSV).join(','),
      ...rows.map((row) => row.map(escapeCSV).join(',')),
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `zahidul-leads-export-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleConfirmDelete = async () => {
    if (!leadToDelete) return;

    setIsDeleting(true);

    try {
      await onDeleteLead(leadToDelete.id);
      setLeadToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderStatusSelect = (lead: Lead) => (
    <div className="relative inline-flex items-center">
      <select
        value={lead.status}
        onChange={(event) =>
          onUpdateStatus(lead.id, event.target.value as LeadStatus)
        }
        aria-label={`Update status for ${lead.fullName}`}
        className={`
          appearance-none
          pl-2.5 pr-7 py-1.5
          rounded-lg border
          text-[10px] font-bold
          outline-none cursor-pointer
          transition-colors
          bg-[#0B1018]
          ${getStatusStyle(lead.status)}
        `}
      >
        {STATUS_OPTIONS.map((status) => (
          <option
            key={status}
            value={status}
            className="bg-[#111722] text-slate-200"
          >
            {status}
          </option>
        ))}
      </select>

      <ChevronDown className="absolute right-2 w-3 h-3 text-slate-500 pointer-events-none" />
    </div>
  );

  const renderActions = (lead: Lead) => (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => onSelectLead(lead)}
        title="View lead details"
        aria-label={`View ${lead.fullName}`}
        className="
          w-8 h-8 flex items-center justify-center
          rounded-lg
          bg-white/[0.035]
          border border-white/[0.06]
          text-slate-400
          hover:text-lime-400 hover:bg-lime-400/[0.08]
          hover:border-lime-400/20
          transition-all cursor-pointer
        "
      >
        <Eye className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => setLeadToDelete(lead)}
        title="Delete lead"
        aria-label={`Delete ${lead.fullName}`}
        className="
          w-8 h-8 flex items-center justify-center
          rounded-lg
          bg-white/[0.035]
          border border-white/[0.06]
          text-slate-500
          hover:text-rose-400 hover:bg-rose-400/[0.08]
          hover:border-rose-400/20
          transition-all cursor-pointer
        "
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  return (
    <div className="space-y-5 font-sans">

      {/* Page Summary */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          {
            label: 'Total Leads',
            value: statusCounts.total,
            icon: Users,
            color: 'text-slate-300',
            iconBg: 'bg-white/[0.05]',
          },
          {
            label: 'New Leads',
            value: statusCounts.new,
            icon: CircleDot,
            color: 'text-emerald-400',
            iconBg: 'bg-emerald-400/[0.08]',
          },
          {
            label: 'Contacted',
            value: statusCounts.contacted,
            icon: MessageSquare,
            color: 'text-sky-400',
            iconBg: 'bg-sky-400/[0.08]',
          },
          {
            label: 'Converted',
            value: statusCounts.converted,
            icon: CheckCircle2,
            color: 'text-lime-400',
            iconBg: 'bg-lime-400/[0.08]',
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="
                p-4 rounded-2xl
                bg-[#111722]
                border border-white/[0.07]
                flex items-center justify-between
                gap-3
              "
            >
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  {item.label}
                </p>

                <p className="text-xl font-bold text-white mt-1 tabular-nums">
                  {item.value}
                </p>
              </div>

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBg}`}
              >
                <Icon className={`w-[18px] h-[18px] ${item.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="
        p-4 sm:p-5
        rounded-2xl
        bg-[#111722]
        border border-white/[0.07]
        space-y-4
      ">
        <div className="flex flex-col xl:flex-row gap-3">

          {/* Search */}
          <div className="flex-1 relative min-w-0">
            <Search className="
              absolute left-3.5 top-1/2 -translate-y-1/2
              w-4 h-4 text-slate-500
              pointer-events-none
            " />

            <input
              type="text"
              placeholder="Search by name, email, service or lead ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="
                w-full h-11
                pl-10 pr-10
                rounded-xl
                bg-[#0B1018]
                border border-white/[0.07]
                text-[11px] text-slate-200
                placeholder:text-slate-600
                outline-none
                focus:border-lime-400/40
                focus:ring-2 focus:ring-lime-400/[0.06]
                transition-all
              "
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-slate-500 hover:text-white
                  cursor-pointer
                "
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">

            <button
              type="button"
              onClick={handleExportCSV}
              disabled={filteredLeads.length === 0}
              className="
                h-10 px-3
                rounded-xl
                bg-lime-400/[0.08]
                border border-lime-400/15
                text-lime-400
                text-[11px] font-bold
                flex items-center gap-2
                hover:bg-lime-400/[0.14]
                transition-all cursor-pointer
                disabled:opacity-30 disabled:cursor-not-allowed
              "
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={onRefresh}
              title="Refresh leads"
              aria-label="Refresh leads"
              className="
                h-10 w-10
                rounded-xl
                bg-white/[0.035]
                border border-white/[0.07]
                text-slate-400
                flex items-center justify-center
                hover:text-white hover:bg-white/[0.07]
                transition-all cursor-pointer
              "
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  loading ? 'animate-spin text-lime-400' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">

          <div className="flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Filters
            </span>
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="
              h-9 px-3
              rounded-lg
              bg-[#0B1018]
              border border-white/[0.07]
              text-[10px] font-semibold text-slate-300
              outline-none focus:border-lime-400/40
              cursor-pointer
            "
          >
            <option value="All">All Statuses</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={sourceFilter}
            onChange={(event) => setSourceFilter(event.target.value)}
            className="
              h-9 px-3
              rounded-lg
              bg-[#0B1018]
              border border-white/[0.07]
              text-[10px] font-semibold text-slate-300
              outline-none focus:border-lime-400/40
              cursor-pointer
            "
          >
            <option value="All">All Channels</option>
            <option value="consultation_popup">Consultation Popup</option>
            <option value="contact_section">Contact Section</option>
          </select>

          {availableServices.length > 0 && (
            <select
              value={serviceFilter}
              onChange={(event) => setServiceFilter(event.target.value)}
              className="
                h-9 px-3 max-w-[180px]
                rounded-lg
                bg-[#0B1018]
                border border-white/[0.07]
                text-[10px] font-semibold text-slate-300
                outline-none focus:border-lime-400/40
                cursor-pointer
              "
            >
              <option value="All">All Services</option>
              {availableServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          )}

          <div className="relative">
            <ArrowUpDown className="
              absolute left-2.5 top-1/2 -translate-y-1/2
              w-3 h-3 text-slate-500 pointer-events-none
            " />

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as 'newest' | 'oldest')
              }
              className="
                h-9 pl-7 pr-3
                rounded-lg
                bg-[#0B1018]
                border border-white/[0.07]
                text-[10px] font-semibold text-slate-300
                outline-none focus:border-lime-400/40
                cursor-pointer
              "
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={resetFilters}
              className="
                h-9 px-3
                rounded-lg
                text-[10px] font-semibold
                text-slate-400
                hover:text-white hover:bg-white/[0.05]
                transition-all cursor-pointer
              "
            >
              <span className="flex items-center gap-1.5">
                <X className="w-3 h-3" />
                Clear filters
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Leads Table */}
      <div className="
        rounded-2xl
        bg-[#111722]
        border border-white/[0.07]
        overflow-hidden
      ">

        {/* Table Heading */}
        <div className="
          px-5 py-4
          flex flex-col sm:flex-row
          sm:items-center sm:justify-between
          gap-2
          border-b border-white/[0.06]
        ">
          <div>
            <h3 className="text-[13px] font-bold text-white">
              Lead Directory
            </h3>
            <p className="text-[10px] text-slate-500 mt-1">
              Manage and track your client inquiries.
            </p>
          </div>

          <div className="
            inline-flex items-center gap-1.5
            self-start sm:self-auto
            px-2.5 py-1.5 rounded-lg
            bg-white/[0.035]
            border border-white/[0.06]
            text-[10px] text-slate-400
          ">
            <Users className="w-3 h-3" />
            <span>{filteredLeads.length} records</span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="
                bg-[#0D131D]
                border-b border-white/[0.06]
                text-[9px] font-bold
                uppercase tracking-[0.13em]
                text-slate-500
              ">
                <th className="py-4 px-5">Lead Information</th>
                <th className="py-4 px-4">Client Contact</th>
                <th className="py-4 px-4">Service & Budget</th>
                <th className="py-4 px-4">Source</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.045]">
              {loading && leads.length === 0 ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    {Array.from({ length: 6 }).map((_, cell) => (
                      <td key={cell} className="px-5 py-5">
                        <div className="h-3.5 w-24 rounded bg-white/[0.07]" />
                        <div className="h-2.5 w-16 rounded bg-white/[0.04] mt-2" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="flex flex-col items-center max-w-sm mx-auto px-5">
                      <div className="
                        w-12 h-12 rounded-2xl
                        bg-white/[0.035]
                        border border-white/[0.07]
                        flex items-center justify-center
                        text-slate-500 mb-4
                      ">
                        <Search className="w-5 h-5" />
                      </div>

                      <h4 className="text-sm font-bold text-white">
                        No leads found
                      </h4>

                      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                        No submissions match your current search or filter settings.
                      </p>

                      {isFiltered && (
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="
                            mt-4 px-4 py-2
                            rounded-lg
                            bg-lime-400 text-[#090D14]
                            text-[10px] font-bold
                            hover:bg-lime-300
                            transition-colors cursor-pointer
                          "
                        >
                          Reset Filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => onSelectLead(lead)}
                    className="
                      group cursor-pointer
                      hover:bg-white/[0.018]
                      transition-colors
                    "
                  >
                    {/* Lead Information */}
                    <td className="px-5 py-4">
                      <p className="
                        text-[11px] font-bold font-mono
                        text-slate-300
                        group-hover:text-lime-400
                        transition-colors
                      ">
                        {lead.id}
                      </p>

                      <p className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1.5">
                        <Calendar className="w-3 h-3" />
                        {formatDate(lead.createdAt)}
                      </p>
                    </td>

                    {/* Client Contact */}
                    <td className="px-4 py-4">
                      <p className="
                        text-[11px] font-bold text-slate-200
                        group-hover:text-white transition-colors
                      ">
                        {lead.fullName}
                      </p>

                      <p className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1.5">
                        <Mail className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate max-w-[180px]">
                          {lead.email}
                        </span>
                      </p>

                      {lead.whatsappNumber && (
                        <p className="flex items-center gap-1.5 text-[10px] text-emerald-400 mt-1">
                          <MessageSquare className="w-3 h-3" />
                          {lead.whatsappNumber}
                        </p>
                      )}
                    </td>

                    {/* Service & Budget */}
                    <td className="px-4 py-4">
                      <p className="text-[11px] font-semibold text-slate-300 max-w-[190px] truncate">
                        {lead.service}
                      </p>

                      <p className="text-[10px] text-lime-400 mt-1.5">
                        {lead.monthlyBudget || 'Spend unspecified'}
                      </p>
                    </td>

                    {/* Source */}
                    <td className="px-4 py-4">
                      <span className={`
                        inline-flex items-center gap-1.5
                        px-2 py-1 rounded-md
                        text-[9px] font-bold
                        border
                        ${
                          lead.source === 'consultation_popup'
                            ? 'bg-sky-400/[0.07] text-sky-400 border-sky-400/15'
                            : 'bg-purple-400/[0.07] text-purple-400 border-purple-400/15'
                        }
                      `}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {formatSource(lead.source)}
                      </span>
                    </td>

                    {/* Status */}
                    <td
                      className="px-4 py-4"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {renderStatusSelect(lead)}
                    </td>

                    {/* Actions */}
                    <td
                      className="px-5 py-4"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="flex justify-end">
                        {renderActions(lead)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet Lead Cards */}
        <div className="lg:hidden divide-y divide-white/[0.05]">
          {loading && leads.length === 0 ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="p-4 animate-pulse space-y-3">
                <div className="h-3 w-28 rounded bg-white/[0.07]" />
                <div className="h-4 w-40 rounded bg-white/[0.07]" />
                <div className="h-3 w-52 rounded bg-white/[0.04]" />
              </div>
            ))
          ) : filteredLeads.length === 0 ? (
            <div className="py-16 px-5 text-center">
              <div className="
                w-12 h-12 rounded-2xl mx-auto mb-4
                bg-white/[0.035]
                border border-white/[0.07]
                flex items-center justify-center
                text-slate-500
              ">
                <Search className="w-5 h-5" />
              </div>

              <h4 className="text-sm font-bold text-white">
                No leads found
              </h4>

              <p className="text-[11px] text-slate-500 mt-2">
                Try adjusting your search or filters.
              </p>

              {isFiltered && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="
                    mt-4 px-4 py-2 rounded-lg
                    bg-lime-400 text-[#090D14]
                    text-[10px] font-bold
                    cursor-pointer
                  "
                >
                  Reset Filters
                </button>
              )}
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="
                  p-4 sm:p-5
                  hover:bg-white/[0.015]
                  transition-colors
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectLead(lead)}
                    className="min-w-0 text-left cursor-pointer"
                  >
                    <p className="text-[9px] font-mono font-bold text-slate-500">
                      {lead.id}
                    </p>

                    <h4 className="text-[13px] font-bold text-white mt-1.5 truncate">
                      {lead.fullName}
                    </h4>

                    <p className="text-[10px] text-slate-500 mt-1 truncate">
                      {lead.email}
                    </p>
                  </button>

                  <span className={`
                    flex-shrink-0
                    px-2 py-1 rounded-md
                    text-[9px] font-bold border
                    ${
                      lead.source === 'consultation_popup'
                        ? 'bg-sky-400/[0.07] text-sky-400 border-sky-400/15'
                        : 'bg-purple-400/[0.07] text-purple-400 border-purple-400/15'
                    }
                  `}>
                    {formatSource(lead.source)}
                  </span>
                </div>

                <div className="
                  grid grid-cols-2 gap-3
                  mt-4 py-3
                  border-y border-white/[0.05]
                ">
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                      Service
                    </p>
                    <p className="text-[10px] font-semibold text-slate-300 mt-1.5 truncate">
                      {lead.service}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                      Monthly Budget
                    </p>
                    <p className="text-[10px] font-semibold text-lime-400 mt-1.5 truncate">
                      {lead.monthlyBudget || 'Not specified'}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                      Submitted
                    </p>
                    <p className="flex items-center gap-1 text-[10px] text-slate-400 mt-1.5">
                      <Clock3 className="w-3 h-3" />
                      {formatDate(lead.createdAt)}
                    </p>
                  </div>

                  {lead.whatsappNumber && (
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                        WhatsApp
                      </p>
                      <p className="text-[10px] text-emerald-400 mt-1.5 truncate">
                        {lead.whatsappNumber}
                      </p>
                    </div>
                  )}
                </div>

                <div className="
                  flex flex-wrap items-center
                  justify-between gap-3
                  mt-3
                ">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600 mb-2">
                      Pipeline Status
                    </p>
                    {renderStatusSelect(lead)}
                  </div>

                  <div
                    onClick={(event) => event.stopPropagation()}
                    className="flex items-end gap-2"
                  >
                    {renderActions(lead)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Table Footer */}
        <div className="
          px-4 sm:px-5 py-3.5
          bg-[#0D131D]
          border-t border-white/[0.06]
          flex flex-col sm:flex-row
          sm:items-center sm:justify-between
          gap-2
        ">
          <p className="text-[10px] text-slate-500">
            Showing{' '}
            <span className="font-bold text-slate-200">
              {filteredLeads.length}
            </span>{' '}
            of{' '}
            <span className="font-bold text-slate-200">
              {leads.length}
            </span>{' '}
            leads
          </p>

          <div className="flex items-center gap-1.5 text-[9px] text-slate-600">
            <Globe className="w-3 h-3" />
            <span>Powered by Supabase PostgreSQL</span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {leadToDelete && (
        <ConfirmDialog
          isOpen={Boolean(leadToDelete)}
          title={`Delete ${leadToDelete.fullName}?`}
          message={`Are you sure you want to delete lead ${leadToDelete.id}? This will permanently remove the record from Supabase.`}
          confirmLabel="Delete Lead"
          isDestructive
          isLoading={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setLeadToDelete(null)}
        />
      )}
    </div>
  );
};
