import React, { useState } from 'react';
import {
  Lock,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  Fingerprint,
} from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onSuccess,
  onBackToSite,
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setError('Please enter the admin password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const rawText = await res.text();
      let data: any = null;

      try {
        data = JSON.parse(rawText);
      } catch {
        data = null;
      }

      if (!res.ok) {
        if (data && data.error) {
          throw new Error(data.error);
        }

        if (res.status === 401) {
          throw new Error(
            'Invalid admin credentials. Please verify your username and password.',
          );
        }

        if (res.status === 404) {
          throw new Error(
            'Authentication endpoint not found. Please verify Vercel serverless deployment.',
          );
        }

        throw new Error(
          `Authentication service returned an unexpected response (Status ${res.status}).`,
        );
      }

      onSuccess();
    } catch (err: any) {
      setError(err?.message || 'Failed to authenticate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080B11] px-4 py-10 font-sans text-neutral-100 selection:bg-lime-400/25">

      {/* Atmospheric Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-lime-400/[0.055] blur-[130px]" />

        <div className="absolute -bottom-64 -left-40 h-[420px] w-[420px] rounded-full bg-emerald-500/[0.035] blur-[130px]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.28)_100%)]" />

        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      </div>

      <div className="relative z-10 w-full max-w-[430px]">

        {/* Back to Portfolio */}
        <button
          onClick={onBackToSite}
          type="button"
          className="group mb-6 inline-flex items-center gap-2 rounded-lg py-2 pr-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-400 transition-colors hover:text-lime-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/50"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to portfolio
        </button>

        {/* Login Card */}
        <section className="relative overflow-hidden rounded-[26px] border border-white/[0.09] bg-[#0E141E]/95 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.48)] backdrop-blur-2xl sm:p-9">

          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-lime-400/80 to-transparent" />

          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-lime-400/[0.035] blur-3xl" />

          {/* Branding */}
          <div className="relative text-center">
            <div className="mx-auto mb-5 flex h-[58px] w-[58px] items-center justify-center rounded-[19px] border border-lime-400/20 bg-lime-400/[0.085] text-lime-300 shadow-[0_8px_30px_rgba(163,230,53,0.08)]">
              <Lock className="h-[23px] w-[23px]" strokeWidth={1.7} />
            </div>

            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-lime-300">
              Zahidul Pro · Private Workspace
            </p>

            <h1 className="text-[25px] font-semibold tracking-[-0.04em] text-white sm:text-[28px]">
              Welcome back
            </h1>

            <p className="mt-2 text-[13px] leading-5 text-slate-400">
              Sign in to access your business dashboard.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="relative mt-7 flex items-start gap-3 rounded-xl border border-rose-400/20 bg-rose-400/[0.075] px-4 py-3.5 text-[12px] leading-5 text-rose-200"
            >
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="relative mt-8 space-y-5">

            {/* Username */}
            <div>
              <label
                htmlFor="admin-username"
                className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-300"
              >
                Admin username
              </label>

              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="h-[50px] w-full rounded-xl border border-white/[0.09] bg-[#090E16] px-4 text-[13px] text-white outline-none transition-all placeholder:text-slate-600 hover:border-white/[0.15] focus:border-lime-400/60 focus:ring-4 focus:ring-lime-400/[0.07]"
                placeholder="Enter admin username"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="admin-password"
                  className="block text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-300"
                >
                  Master password
                </label>

                <span className="text-[10px] text-slate-600">
                  Protected access
                </span>
              </div>

              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-[50px] w-full rounded-xl border border-white/[0.09] bg-[#090E16] pl-4 pr-[78px] text-[13px] tracking-[0.12em] text-white outline-none transition-all placeholder:tracking-normal placeholder:text-slate-600 hover:border-white/[0.15] focus:border-lime-400/60 focus:ring-4 focus:ring-lime-400/[0.07]"
                  placeholder="Enter your password"
                />

                <KeyRound className="pointer-events-none absolute right-[47px] top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-lime-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/50"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-2 flex h-[51px] w-full items-center justify-center gap-2.5 rounded-xl bg-lime-400 px-5 text-[13px] font-bold text-[#10160A] shadow-[0_8px_24px_rgba(163,230,53,0.13)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-lime-300 hover:shadow-[0_12px_30px_rgba(163,230,53,0.2)] focus:outline-none focus-visible:ring-4 focus-visible:ring-lime-400/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#10160A]/25 border-t-[#10160A]" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign in to dashboard</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Security Footer */}
          <div className="relative mt-7 flex items-center justify-center gap-2 border-t border-white/[0.07] pt-5">
            <ShieldCheck className="h-3.5 w-3.5 text-lime-400/75" />

            <span className="text-[10px] tracking-wide text-slate-500">
              Private access · Your workspace is protected
            </span>
          </div>
        </section>

        {/* Bottom Security Label */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-slate-600">
          <Fingerprint className="h-3.5 w-3.5" />
          <span>AUTHORIZED PERSONNEL ONLY</span>
        </div>
      </div>
    </main>
  );
};