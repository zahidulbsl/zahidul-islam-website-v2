
import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Database,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Server,
  LogOut,
  ExternalLink,
  Settings,
  Mail,
  Activity,
  Fingerprint,
  KeyRound,
  Clock,
  ShieldCheck,
  ChevronRight,
  Layers,
  Globe,
  Terminal,
} from 'lucide-react';

import { ConfirmDialog } from './ConfirmDialog';

interface SettingsViewProps {
  isEmailConfigured: boolean;
  onLogout: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isEmailConfigured,
  onLogout,
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const SectionHeader = ({
    icon: Icon,
    title,
    description,
    color,
  }: {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
  }) => (
    <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
      <div
        className={`w-9 h-9 rounded-xl bg-white/[0.035] flex items-center justify-center ${color}`}
      >
        <Icon className="w-4 h-4" />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <p className="text-[10px] text-slate-500 mt-1">{description}</p>
      </div>
    </div>
  );

  const InfoCard = ({
    label,
    value,
    description,
    icon: Icon,
    color = 'text-slate-300',
  }: {
    label: string;
    value: string;
    description: string;
    icon: React.ElementType;
    color?: string;
  }) => (
    <div className="p-4 rounded-xl bg-[#171F2B] border border-white/[0.055] hover:border-white/[0.11] transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-slate-500 font-medium">
          {label}
        </span>

        <Icon className={`w-4 h-4 ${color}`} />
      </div>

      <p className={`text-sm font-bold ${color}`}>{value}</p>

      <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
        {description}
      </p>
    </div>
  );

  const StatusBadge = ({
    active,
    activeLabel,
    inactiveLabel,
  }: {
    active: boolean;
    activeLabel: string;
    inactiveLabel: string;
  }) => (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1.5 rounded-full
        text-[10px] font-semibold border shrink-0
        ${
          active
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        }
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          active ? 'bg-emerald-400' : 'bg-amber-400'
        }`}
      />

      {active ? activeLabel : inactiveLabel}
    </span>
  );

  return (
    <div className="max-w-5xl space-y-5">

      {/* Page Header */}
      <div className="relative p-5 sm:p-6 rounded-2xl bg-[#111722] border border-white/[0.07] overflow-hidden">

        <div className="absolute right-0 top-0 w-56 h-40 bg-lime-400/[0.035] blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-lime-400/10 border border-lime-400/15 flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5 text-lime-400" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Platform Settings
                </h2>

                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-lime-400/10 border border-lime-400/20 text-lime-400">
                  Admin
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-1.5 max-w-lg">
                Manage your administrator profile, security configuration,
                notifications and database infrastructure.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center px-3 py-2 rounded-xl bg-white/[0.025] border border-white/[0.07]">
            <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
            <span className="text-[10px] text-slate-300 font-medium">
              Administration Center
            </span>
          </div>

        </div>

        {/* System Overview */}
        <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/[0.06]">

          <div>
            <p className="text-[10px] text-slate-500">Admin Access</p>
            <p className="text-xs font-bold text-lime-400 mt-1">
              Super Administrator
            </p>
          </div>

          <div>
            <p className="text-[10px] text-slate-500">Database</p>
            <p className="text-xs font-bold text-emerald-400 mt-1">
              Supabase / PostgreSQL
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <p className="text-[10px] text-slate-500">Email Transport</p>
            <div className="mt-1">
              <StatusBadge
                active={isEmailConfigured}
                activeLabel="SMTP Configured"
                inactiveLabel="Console Mode"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Administrator Profile */}
      <section className="p-5 rounded-2xl bg-[#111722] border border-white/[0.07] space-y-5">

        <SectionHeader
          icon={User}
          title="Administrator Profile"
          description="Your administrator identity and access permissions"
          color="text-lime-400"
        />

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-[#171F2B] border border-white/[0.055]">

          <div className="w-14 h-14 rounded-2xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-lime-400">Z</span>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white">
              Zahidul Islam
            </h4>

            <p className="text-[11px] text-slate-400 mt-1">
              Google Ads &amp; Meta Ads Specialist
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-[9px] px-2 py-1 rounded-md bg-lime-400/10 text-lime-400 border border-lime-400/15 font-semibold">
                Super Administrator
              </span>

              <span className="text-[9px] px-2 py-1 rounded-md bg-white/[0.035] text-slate-400 border border-white/[0.06]">
                Primary Operator
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-emerald-400 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Account Active
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <InfoCard
            label="Access Level"
            value="Full Administrator"
            description="Read, write, update and delete permissions"
            icon={Shield}
            color="text-lime-400"
          />

          <InfoCard
            label="Account Role"
            value="Super Administrator"
            description="Primary administrative account"
            icon={Fingerprint}
            color="text-sky-400"
          />

        </div>
      </section>

      {/* Security & Authentication */}
      <section className="p-5 rounded-2xl bg-[#111722] border border-white/[0.07] space-y-5">

        <SectionHeader
          icon={Shield}
          title="Security & Authentication"
          description="Authentication architecture and session security"
          color="text-sky-400"
        />

        <div className="space-y-3">

          {/* Session Model */}
          <div className="p-4 rounded-xl bg-[#171F2B] border border-white/[0.055]">

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-sky-400/10 flex items-center justify-center shrink-0">
                  <KeyRound className="w-4 h-4 text-sky-400" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white">
                    Session Authentication
                  </h4>

                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    Cryptographic HMAC-SHA256 stateless session token
                    with 7-day TTL.
                  </p>
                </div>
              </div>

              <StatusBadge
                active
                activeLabel="Active"
                inactiveLabel="Inactive"
              />
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.05] text-[10px] text-slate-500">
              <Clock className="w-3 h-3" />
              Session validity: 7 days
            </div>
          </div>

          {/* Serverless Compatibility */}
          <div className="p-4 rounded-xl bg-[#171F2B] border border-white/[0.055]">

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-purple-400/10 flex items-center justify-center shrink-0">
                  <Server className="w-4 h-4 text-purple-400" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white">
                    Serverless Compatibility
                  </h4>

                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    Zero in-memory session dependencies. Designed for
                    Vercel serverless environments.
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-semibold px-2.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                Vercel Ready
              </span>
            </div>

          </div>

        </div>

        {/* Logout */}
        <div className="p-4 rounded-xl border border-rose-500/15 bg-rose-500/[0.035] flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-rose-400" />
            </div>

            <div>
              <h4 className="text-xs font-bold text-white">
                End Administrative Session
              </h4>

              <p className="text-[10px] text-slate-500 mt-1">
                Sign out of your current administrator session.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="
              px-4 py-2.5 rounded-xl
              bg-rose-500/10 hover:bg-rose-500/20
              border border-rose-500/20
              text-rose-300 text-[11px] font-semibold
              flex items-center justify-center gap-2
              transition-all duration-200
              cursor-pointer shrink-0
            "
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>

        </div>
      </section>

      {/* Notification Configuration */}
      <section className="p-5 rounded-2xl bg-[#111722] border border-white/[0.07] space-y-5">

        <SectionHeader
          icon={Bell}
          title="Notification Configuration"
          description="Lead notification delivery and email transport"
          color="text-purple-400"
        />

        {/* Notification Recipient */}
        <div className="p-4 rounded-xl bg-[#171F2B] border border-white/[0.055]">

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-400/10 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-purple-400" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white">
                Primary Notification Recipient
              </h4>

              <p className="text-[10px] text-slate-500 mt-1">
                New consultation and contact form submissions are
                configured to notify this address.
              </p>

              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <code className="text-[11px] text-lime-400 bg-black/30 border border-white/[0.05] px-3 py-2 rounded-lg break-all">
                  zahidul.pro.bd@gmail.com
                </code>
              </div>
            </div>
          </div>

        </div>

        {/* SMTP Status */}
        <div className="p-4 rounded-xl bg-[#171F2B] border border-white/[0.055]">

          <div className="flex items-center justify-between gap-3">

            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                isEmailConfigured
                  ? 'bg-emerald-400/10'
                  : 'bg-amber-400/10'
              }`}>
                <Activity className={`w-4 h-4 ${
                  isEmailConfigured
                    ? 'text-emerald-400'
                    : 'text-amber-400'
                }`} />
              </div>

              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white">
                  SMTP Transport Status
                </h4>

                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  {isEmailConfigured
                    ? 'Authenticated live SMTP server transport is configured.'
                    : 'SMTP environment variables were not detected. Notifications are running in console mode.'}
                </p>
              </div>
            </div>

            <StatusBadge
              active={isEmailConfigured}
              activeLabel="SMTP Live"
              inactiveLabel="Console Mode"
            />

          </div>

          <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center gap-2">
            {isEmailConfigured ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            )}

            <p className="text-[10px] text-slate-500">
              {isEmailConfigured
                ? 'Email transport configuration detected.'
                : 'Email delivery configuration requires attention.'}
            </p>
          </div>

        </div>
      </section>

      {/* Database Infrastructure */}
      <section className="p-5 rounded-2xl bg-[#111722] border border-white/[0.07] space-y-5">

        <SectionHeader
          icon={Database}
          title="Database & Infrastructure"
          description="Database engine, access protection and persistence"
          color="text-emerald-400"
        />

        {/* Database Status */}
        <div className="p-4 rounded-xl bg-[#171F2B] border border-white/[0.055]">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-emerald-400" />
            </div>

            <div>
              <h4 className="text-xs font-bold text-white">
                Supabase Database
              </h4>

              <p className="text-[10px] text-slate-400 mt-1">
                PostgreSQL Persistence Engine
              </p>
            </div>

            <div className="ml-auto">
              <span className="text-[10px] font-semibold text-emerald-400 px-2.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Configured
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between gap-3">
            <span className="text-[10px] text-slate-500">
              Project Identifier
            </span>

            <code className="text-[10px] text-slate-300 font-mono">
              zahidul-pro-crm
            </code>
          </div>

        </div>

        {/* Infrastructure Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <InfoCard
            label="Row Level Security"
            value="Enabled"
            description="Protected by Supabase Service Role Key"
            icon={ShieldCheck}
            color="text-emerald-400"
          />

          <InfoCard
            label="Database Timestamps"
            value="Auto updated_at"
            description="PostgreSQL timestamp trigger configuration"
            icon={Clock}
            color="text-sky-400"
          />

          <InfoCard
            label="Database Engine"
            value="PostgreSQL"
            description="Managed through Supabase infrastructure"
            icon={Layers}
            color="text-purple-400"
          />

          <InfoCard
            label="Application Hosting"
            value="Vercel"
            description="Serverless application deployment environment"
            icon={Globe}
            color="text-slate-300"
          />

        </div>

        {/* Infrastructure Note */}
        <div className="p-3.5 rounded-xl bg-sky-400/[0.035] border border-sky-400/10 flex items-start gap-3">
          <Terminal className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />

          <p className="text-[10px] text-slate-400 leading-relaxed">
            Infrastructure details shown here represent the existing
            application configuration. This panel does not perform
            live database health checks or modify infrastructure settings.
          </p>
        </div>

      </section>

      {/* Account Actions */}
      <div className="p-4 rounded-2xl bg-[#111722] border border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-3">

        <div>
          <p className="text-xs font-semibold text-white">
            Administration Workspace
          </p>

          <p className="text-[10px] text-slate-500 mt-1">
            Manage your CRM platform from one central location.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
          Secure Administration
          <ChevronRight className="w-3 h-3" />
        </div>

      </div>

      {/* Logout Confirmation */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Sign Out of Admin Portal?"
        message="Your active session cookie and authentication token will be cleared. You will need to sign in with your admin master password to regain access."
        confirmLabel="Yes, Sign Out"
        onConfirm={onLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />

    </div>
  );
};
