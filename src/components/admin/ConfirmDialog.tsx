import React from 'react';
import {
  AlertTriangle,
  X,
  Loader2,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const accentColor = isDestructive
    ? 'rose'
    : 'lime';

  const Icon = isDestructive ? ShieldAlert : CheckCircle2;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-[5px] animate-fadeIn"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className="relative w-full max-w-[420px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101722] shadow-[0_24px_100px_rgba(0,0,0,0.55)] animate-scaleIn"
      >
        {/* Top Accent */}
        <div
          className={`absolute inset-x-0 top-0 h-[2px] ${
            isDestructive
              ? 'bg-rose-400'
              : 'bg-lime-400'
          }`}
        />

        {/* Ambient Background */}
        <div
          className={`pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full blur-3xl ${
            isDestructive
              ? 'bg-rose-500/[0.06]'
              : 'bg-lime-400/[0.06]'
          }`}
        />

        {/* Header */}
        <div className="relative flex items-start justify-between gap-4 px-5 pt-6 sm:px-6 sm:pt-7">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
                isDestructive
                  ? 'border-rose-400/20 bg-rose-400/[0.09]'
                  : 'border-lime-400/20 bg-lime-400/[0.09]'
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  isDestructive
                    ? 'text-rose-400'
                    : 'text-lime-400'
                }`}
              />
            </div>

            <div className="min-w-0 pt-0.5">
              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                  isDestructive
                    ? 'text-rose-400'
                    : 'text-lime-400'
                }`}
              >
                {isDestructive
                  ? 'Destructive Action'
                  : 'Confirmation Required'}
              </p>

              <h3
                id="confirm-dialog-title"
                className="mt-1.5 text-base font-bold tracking-tight text-white sm:text-lg"
              >
                {title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            aria-label="Close confirmation dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-slate-500 transition hover:border-white/[0.12] hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Message */}
        <div className="relative px-5 pb-5 pt-4 sm:px-6">
          <p
            id="confirm-dialog-description"
            className="text-xs leading-6 text-slate-400"
          >
            {message}
          </p>

          {isDestructive && (
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-rose-400/10 bg-rose-400/[0.045] p-3">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" />

              <p className="text-[10px] leading-5 text-rose-300/80">
                This action may be permanent. Please review before proceeding.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="relative flex flex-col-reverse gap-2 border-t border-white/[0.07] bg-[#0D141E] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex h-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 text-xs font-semibold text-slate-400 transition hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex h-10 items-center justify-center gap-2 rounded-xl px-5 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
              isDestructive
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/10 hover:bg-rose-400'
                : 'bg-lime-400 text-[#0B1018] shadow-lg shadow-lime-400/10 hover:bg-lime-300'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {confirmLabel}
                {isDestructive && (
                  <AlertTriangle className="h-3.5 w-3.5" />
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};