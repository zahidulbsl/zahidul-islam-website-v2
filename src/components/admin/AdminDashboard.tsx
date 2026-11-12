import React, { useState, useEffect, useCallback } from 'react';
import {
  AdminSidebar,
  type CrmTab,
} from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { OverviewView } from './OverviewView';
import { LeadsTableView } from './LeadsTableView';
import { PipelineKanbanView } from './PipelineKanbanView';
import { AnalyticsView } from './AnalyticsView';
import { SettingsView } from './SettingsView';
import { LeadDetailDrawer } from './LeadDetailDrawer';
import type { Lead, LeadStatus, LeadStats } from '../../types/crm';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onBackToSite: () => void;
}

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onBackToSite,
}) => {
  // Navigation & Shell State
  const [currentTab, setCurrentTab] = useState<CrmTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // CRM Data State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [isEmailConfigured, setIsEmailConfigured] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Global Search State
  const [globalSearch, setGlobalSearch] = useState('');

  // Toast Notification System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (text: string, type: 'success' | 'error' | 'info' = 'success') => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, text, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch leads and stats from Supabase backend
  const fetchCrmData = useCallback(async () => {
    try {
      setLoading(true);

      const [leadsRes, statsRes] = await Promise.all([
        fetch('/api/leads?sortBy=newest'),
        fetch('/api/leads/stats'),
      ]);

      if (leadsRes.status === 401 || statsRes.status === 401) {
        onLogout();
        return;
      }

      let leadsData: any = null;
      let statsData: any = null;
      try {
        leadsData = await leadsRes.json();
      } catch {}
      try {
        statsData = await statsRes.json();
      } catch {}

      if (leadsData && leadsData.success) {
        setLeads(leadsData.leads || []);
      }
      if (statsData && statsData.success) {
        setStats(statsData.stats);
        setIsEmailConfigured(Boolean(statsData.isEmailConfigured));
      }
    } catch (err: any) {
      console.error('Failed to load CRM data from Supabase:', err);
      addToast('Failed to sync CRM pipeline with database.', 'error');
    } finally {
      setLoading(false);
    }
  }, [onLogout, addToast]);

  useEffect(() => {
    fetchCrmData();
  }, [fetchCrmData]);

  // Handle lead status updates
  const handleUpdateStatus = async (
    id: string,
    newStatus: LeadStatus,
    notes?: string
  ) => {
    try {
      const res = await fetch(`/api/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to update lead');
      }

      const data = await res.json().catch(() => null);
      if (data && data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)));
        if (selectedLead?.id === id) {
          setSelectedLead(data.lead);
        }
      }

      addToast(`Lead status updated to ${newStatus}.`, 'success');

      // Refresh stats
      const statsRes = await fetch('/api/leads/stats');
      const statsData = await statsRes.json().catch(() => null);
      if (statsData && statsData.success) {
        setStats(statsData.stats);
      }
    } catch (err: any) {
      console.error('Status update error:', err);
      addToast(err?.message || 'Could not update status.', 'error');
    }
  };

  // Handle lead deletion
  const handleDeleteLead = async (id: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || 'Failed to delete lead');
      }

      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }

      addToast('Lead deleted permanently from Supabase.', 'info');

      // Refresh stats
      const statsRes = await fetch('/api/leads/stats');
      const statsData = await statsRes.json().catch(() => null);
      if (statsData && statsData.success) {
        setStats(statsData.stats);
      }
    } catch (err: any) {
      console.error('Delete error:', err);
      addToast(err?.message || 'Failed to delete lead.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#090B10] text-[#F1F5F9] flex font-sans selection:bg-lime-400 selection:text-[#090B10]">
      {/* 1. App Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        stats={stats}
        onBackToSite={onBackToSite}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {/* Top Header */}
        <AdminHeader
          currentTab={currentTab}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          isEmailConfigured={isEmailConfigured}
          onLogout={onLogout}
          onBackToSite={onBackToSite}
          searchQuery={globalSearch}
          onSearchChange={(q) => {
            setGlobalSearch(q);
            if (currentTab !== 'all') {
              setCurrentTab('all');
            }
          }}
          onFocusSearch={() => {
            if (currentTab !== 'all') {
              setCurrentTab('all');
            }
          }}
        />

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'overview' && (
            <OverviewView
              stats={stats}
              leads={leads}
              onSelectLead={setSelectedLead}
              onNavigateTab={setCurrentTab}
              onUpdateStatus={async (id, st) => handleUpdateStatus(id, st)}
            />
          )}

          {currentTab === 'all' && (
            <LeadsTableView
              leads={leads}
              loading={loading}
              onRefresh={fetchCrmData}
              onSelectLead={setSelectedLead}
              onUpdateStatus={handleUpdateStatus}
              onDeleteLead={handleDeleteLead}
            />
          )}

          {currentTab === 'pipeline' && (
            <PipelineKanbanView
              leads={leads}
              onSelectLead={setSelectedLead}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView stats={stats} leads={leads} />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              isEmailConfigured={isEmailConfigured}
              onLogout={onLogout}
            />
          )}
        </main>
      </div>

      {/* 3. Lead Property Inspector Drawer */}
      <LeadDetailDrawer
        lead={selectedLead}
        isOpen={Boolean(selectedLead)}
        onClose={() => setSelectedLead(null)}
        onUpdateStatus={handleUpdateStatus}
        onDeleteLead={handleDeleteLead}
      />

      {/* 4. Floating Toast Notification Stack */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl border text-xs font-semibold shadow-2xl backdrop-blur-xl animate-slideUp transition-all ${
              toast.type === 'success'
                ? 'bg-[#111722]/95 border-lime-400/30 text-lime-400 shadow-lime-400/10'
                : toast.type === 'error'
                ? 'bg-[#111722]/95 border-rose-500/30 text-rose-300 shadow-rose-500/10'
                : 'bg-[#111722]/95 border-sky-500/30 text-sky-300 shadow-sky-500/10'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
            {toast.type === 'error' && <AlertTriangle className="w-4 h-4 flex-shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 flex-shrink-0" />}

            <span className="text-white">{toast.text}</span>

            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-slate-500 hover:text-white p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
