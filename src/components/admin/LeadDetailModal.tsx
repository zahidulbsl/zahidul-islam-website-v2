import React from 'react';
import { LeadDetailDrawer } from './LeadDetailDrawer';
import type { Lead, LeadStatus } from '../../types/crm';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: LeadStatus, notes?: string) => Promise<void>;
  onDeleteLead: (id: string) => Promise<void>;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  onClose,
  onUpdateStatus,
  onDeleteLead,
}) => {
  return (
    <LeadDetailDrawer
      lead={lead}
      isOpen={Boolean(lead)}
      onClose={onClose}
      onUpdateStatus={onUpdateStatus}
      onDeleteLead={onDeleteLead}
    />
  );
};
