export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'In Discussion'
  | 'Converted'
  | 'Not Interested';

export type LeadSource = 'consultation_popup' | 'contact_section';

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  whatsappNumber?: string;
  websiteUrl?: string;
  service: string;
  monthlyBudget?: string;
  projectDetails: string;
  preferredDate?: string;
  preferredTime?: string;
  timezone?: string;
  source: LeadSource;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadPayload {
  source: LeadSource;
  fullName: string;
  email: string;
  whatsappNumber?: string;
  websiteUrl?: string;
  service: string;
  monthlyBudget?: string;
  projectDetails?: string;
  preferredDate?: string;
  preferredTime?: string;
  timezone?: string;
}

export interface LeadStats {
  totalLeads: number;
  newLeads: number;
  consultationRequests: number;
  projectInquiries: number;
  contactedLeads: number;
  convertedLeads: number;
}
