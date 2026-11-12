import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Lead, CreateLeadPayload, LeadStatus, LeadStats } from '../types/crm.js';

let supabaseInstance: SupabaseClient | null = null;

function isSupabaseConfigured(): boolean {
  const url = process.env.SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return (
    url.startsWith('https://') &&
    !url.includes('your-project-ref') &&
    !key.includes('your-supabase') &&
    key.length > 20
  );
}

function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabaseUrl = process.env.SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  try {
    supabaseInstance = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    return supabaseInstance;
  } catch (err) {
    console.warn('[Supabase DB] Failed to initialize client, fallback to in-memory store:', err);
    return null;
  }
}

interface LeadRow {
  id: string;
  source: 'consultation_popup' | 'contact_section';
  full_name: string;
  email: string;
  whatsapp_number: string | null;
  website_url: string | null;
  service: string;
  monthly_budget: string | null;
  project_details: string;
  preferred_date: string | null;
  preferred_time: string | null;
  timezone: string | null;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

function mapRowToLead(row: LeadRow): Lead {
  return {
    id: row.id,
    source: row.source,
    fullName: row.full_name,
    email: row.email,
    whatsappNumber: row.whatsapp_number || undefined,
    websiteUrl: row.website_url || undefined,
    service: row.service,
    monthlyBudget: row.monthly_budget || undefined,
    projectDetails: row.project_details || '',
    preferredDate: row.preferred_date || undefined,
    preferredTime: row.preferred_time || undefined,
    timezone: row.timezone || undefined,
    status: row.status,
    notes: row.notes || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// In-Memory fallback store for AI Studio container environment
const inMemoryLeads: Map<string, Lead> = new Map([
  [
    'LEAD-20250215-A101',
    {
      id: 'LEAD-20250215-A101',
      source: 'consultation_popup',
      fullName: 'Liam Vance',
      email: 'liam.vance@nordicstyle.co',
      whatsappNumber: '+1 (555) 234-5678',
      websiteUrl: 'https://nordicstyle.co',
      service: 'Google Ads & Shopping Campaign Management',
      monthlyBudget: '$5,000 - $10,000 / mo',
      projectDetails:
        'Looking to scale Google Shopping and Search campaigns for our Shopify home decor store ahead of Q2.',
      preferredDate: '2025-02-20',
      preferredTime: '02:00 PM - 04:00 PM',
      timezone: 'America/New_York (UTC-5)',
      status: 'In Discussion',
      notes: 'Scheduled call for Feb 20. Store current monthly revenue is $60k, goal is $150k with 4.5+ ROAS.',
      createdAt: '2025-02-15T14:32:00.000Z',
      updatedAt: '2025-02-15T16:10:00.000Z',
    },
  ],
  [
    'LEAD-20250214-B204',
    {
      id: 'LEAD-20250214-B204',
      source: 'contact_section',
      fullName: 'Sophia Martinez',
      email: 'sophia@solarglowskincare.com',
      whatsappNumber: '+44 7700 900123',
      websiteUrl: 'https://solarglowskincare.com',
      service: 'Meta Ads & High-ROAS Performance Scaling',
      monthlyBudget: '$10,000 - $25,000 / mo',
      projectDetails:
        'Need help optimizing Advantage+ shopping campaigns and fixing iOS 14.5 attribution drop-off.',
      preferredDate: '2025-02-18',
      preferredTime: '10:00 AM - 12:00 PM',
      timezone: 'Europe/London (UTC+0)',
      status: 'New',
      notes: undefined,
      createdAt: '2025-02-14T11:15:00.000Z',
      updatedAt: '2025-02-14T11:15:00.000Z',
    },
  ],
  [
    'LEAD-20250212-C309',
    {
      id: 'LEAD-20250212-C309',
      source: 'consultation_popup',
      fullName: 'Alexander Wright',
      email: 'a.wright@fintechnexus.io',
      whatsappNumber: '+1 (415) 890-1122',
      websiteUrl: 'https://fintechnexus.io',
      service: 'Server-Side Tracking & Meta CAPI Implementation',
      monthlyBudget: '$2,500 - $5,000 / mo',
      projectDetails:
        'Stape.io / Google Cloud GTM server-side container setup with custom domain and First-Party Cookie recovery.',
      preferredDate: '2025-02-16',
      preferredTime: '04:00 PM - 06:00 PM',
      timezone: 'America/Los_Angeles (UTC-8)',
      status: 'Converted',
      notes: 'Server-side GTM deployed with custom tagging subdomain. Event match quality improved to 8.9/10.',
      createdAt: '2025-02-12T09:45:00.000Z',
      updatedAt: '2025-02-13T17:20:00.000Z',
    },
  ],
  [
    'LEAD-20250210-D412',
    {
      id: 'LEAD-20250210-D412',
      source: 'contact_section',
      fullName: 'Elena Rostova',
      email: 'elena@velourfashion.de',
      whatsappNumber: '+49 151 23456789',
      websiteUrl: 'https://velourfashion.de',
      service: 'Full-Funnel Paid Acquisition & Analytics',
      monthlyBudget: '$25,000+ / mo',
      projectDetails:
        'Complete audit of Google Ads, Meta Ads and GA4 404/checkout drops across our EU multi-currency stores.',
      preferredDate: '2025-02-19',
      preferredTime: '02:00 PM - 04:00 PM',
      timezone: 'Europe/Berlin (UTC+1)',
      status: 'Contacted',
      notes: 'Sent initial audit proposal via email and shared Loom video breakdown.',
      createdAt: '2025-02-10T16:20:00.000Z',
      updatedAt: '2025-02-11T10:05:00.000Z',
    },
  ],
]);

class LeadsDatabase {
  public async getAll(filters?: {
    status?: string;
    source?: string;
    service?: string;
    search?: string;
    sortBy?: 'newest' | 'oldest';
  }): Promise<Lead[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        let query = supabase.from('leads').select('*');

        if (filters?.status && filters.status !== 'All') {
          query = query.eq('status', filters.status);
        }

        if (filters?.source && filters.source !== 'All') {
          query = query.eq('source', filters.source);
        }

        if (filters?.service && filters.service !== 'All') {
          query = query.ilike('service', `%${filters.service.trim()}%`);
        }

        if (filters?.search && filters.search.trim()) {
          const q = filters.search.trim().replace(/[%_]/g, '\\$&');
          query = query.or(
            `id.ilike.%${q}%,full_name.ilike.%${q}%,email.ilike.%${q}%,service.ilike.%${q}%,website_url.ilike.%${q}%`
          );
        }

        const ascending = filters?.sortBy === 'oldest';
        query = query.order('created_at', { ascending });

        const { data, error } = await query;
        if (!error && data) {
          return (data as LeadRow[]).map(mapRowToLead);
        }
        console.warn('[Supabase DB] Error in getAll, falling back to in-memory store:', error?.message);
      } catch (err: any) {
        console.warn('[Supabase DB] Exception in getAll, falling back to in-memory store:', err?.message);
      }
    }

    // In-memory fallback
    let list = Array.from(inMemoryLeads.values());

    if (filters?.status && filters.status !== 'All') {
      list = list.filter((l) => l.status === filters.status);
    }
    if (filters?.source && filters.source !== 'All') {
      list = list.filter((l) => l.source === filters.source);
    }
    if (filters?.service && filters.service !== 'All') {
      list = list.filter((l) => l.service.toLowerCase().includes(filters.service!.toLowerCase().trim()));
    }
    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        (l) =>
          l.id.toLowerCase().includes(q) ||
          l.fullName.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.service.toLowerCase().includes(q) ||
          (l.websiteUrl && l.websiteUrl.toLowerCase().includes(q))
      );
    }

    const ascending = filters?.sortBy === 'oldest';
    list.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return ascending ? timeA - timeB : timeB - timeA;
    });

    return list;
  }

  public async getById(id: string): Promise<Lead | null> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (!error && data) {
          return mapRowToLead(data as LeadRow);
        }
      } catch (err: any) {
        console.warn(`[Supabase DB] Exception in getById(${id}):`, err?.message);
      }
    }

    return inMemoryLeads.get(id) || null;
  }

  public async isDuplicate(email: string, source: string, withinSeconds = 45): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const thresholdISO = new Date(Date.now() - withinSeconds * 1000).toISOString();
        const { data, error } = await supabase
          .from('leads')
          .select('id')
          .ilike('email', email.trim().toLowerCase())
          .eq('source', source)
          .gt('created_at', thresholdISO)
          .limit(1);

        if (!error && data) {
          return Boolean(data.length > 0);
        }
      } catch (err) {
        console.warn('[Supabase DB] Exception in isDuplicate, checking memory:', err);
      }
    }

    const thresholdTime = Date.now() - withinSeconds * 1000;
    const cleanEmail = email.trim().toLowerCase();
    for (const lead of inMemoryLeads.values()) {
      if (
        lead.email.toLowerCase() === cleanEmail &&
        lead.source === source &&
        new Date(lead.createdAt).getTime() > thresholdTime
      ) {
        return true;
      }
    }
    return false;
  }

  public async create(payload: CreateLeadPayload): Promise<Lead> {
    const timestamp = new Date().toISOString();
    const datePrefix = timestamp.slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const generatedId = `LEAD-${datePrefix}-${randomSuffix}`;

    const newLead: Lead = {
      id: generatedId,
      source: payload.source,
      fullName: payload.fullName.trim(),
      email: payload.email.trim().toLowerCase(),
      whatsappNumber: payload.whatsappNumber?.trim() || undefined,
      websiteUrl: payload.websiteUrl?.trim() || undefined,
      service: payload.service.trim(),
      monthlyBudget: payload.monthlyBudget?.trim() || undefined,
      projectDetails: payload.projectDetails?.trim() || '',
      preferredDate: payload.preferredDate?.trim() || undefined,
      preferredTime: payload.preferredTime?.trim() || undefined,
      timezone: payload.timezone?.trim() || undefined,
      status: 'New',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const insertRow = {
          id: generatedId,
          source: payload.source,
          full_name: newLead.fullName,
          email: newLead.email,
          whatsapp_number: newLead.whatsappNumber || null,
          website_url: newLead.websiteUrl || null,
          service: newLead.service,
          monthly_budget: newLead.monthlyBudget || null,
          project_details: newLead.projectDetails,
          preferred_date: newLead.preferredDate || null,
          preferred_time: newLead.preferredTime || null,
          timezone: newLead.timezone || null,
          status: 'New' as LeadStatus,
        };

        const { data, error } = await supabase
          .from('leads')
          .insert(insertRow)
          .select('*')
          .single();

        if (!error && data) {
          const mapped = mapRowToLead(data as LeadRow);
          inMemoryLeads.set(mapped.id, mapped);
          return mapped;
        }
        console.warn('[Supabase DB] Error inserting lead into Supabase, saving in-memory:', error?.message);
      } catch (err: any) {
        console.warn('[Supabase DB] Exception inserting lead, saving in-memory:', err?.message);
      }
    }

    inMemoryLeads.set(newLead.id, newLead);
    return newLead;
  }

  public async updateStatus(id: string, status: LeadStatus, notes?: string): Promise<Lead | null> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const updateData: Record<string, any> = { status };
        if (notes !== undefined) {
          updateData.notes = notes;
        }

        const { data, error } = await supabase
          .from('leads')
          .update(updateData)
          .eq('id', id)
          .select('*')
          .maybeSingle();

        if (!error && data) {
          const updated = mapRowToLead(data as LeadRow);
          inMemoryLeads.set(updated.id, updated);
          return updated;
        }
      } catch (err: any) {
        console.warn(`[Supabase DB] Exception updating lead ${id}:`, err?.message);
      }
    }

    const existing = inMemoryLeads.get(id);
    if (!existing) return null;

    const updated: Lead = {
      ...existing,
      status,
      notes: notes !== undefined ? notes : existing.notes,
      updatedAt: new Date().toISOString(),
    };
    inMemoryLeads.set(id, updated);
    return updated;
  }

  public async deleteLead(id: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { error } = await supabase.from('leads').delete().eq('id', id);
        if (!error) {
          inMemoryLeads.delete(id);
          return true;
        }
      } catch (err: any) {
        console.warn(`[Supabase DB] Exception deleting lead ${id}:`, err?.message);
      }
    }

    return inMemoryLeads.delete(id);
  }

  public async getStats(): Promise<LeadStats> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const [
          totalRes,
          newRes,
          consultationRes,
          projectInquiriesRes,
          contactedRes,
          convertedRes,
        ] = await Promise.all([
          supabase.from('leads').select('*', { count: 'exact', head: true }),
          supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'New'),
          supabase.from('leads').select('*', { count: 'exact', head: true }).eq('source', 'consultation_popup'),
          supabase.from('leads').select('*', { count: 'exact', head: true }).eq('source', 'contact_section'),
          supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'Contacted'),
          supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'Converted'),
        ]);

        if (!totalRes.error) {
          return {
            totalLeads: totalRes.count ?? 0,
            newLeads: newRes.count ?? 0,
            consultationRequests: consultationRes.count ?? 0,
            projectInquiries: projectInquiriesRes.count ?? 0,
            contactedLeads: contactedRes.count ?? 0,
            convertedLeads: convertedRes.count ?? 0,
          };
        }
      } catch (err: any) {
        console.warn('[Supabase DB] Exception fetching stats, using in-memory stats:', err?.message);
      }
    }

    const all = Array.from(inMemoryLeads.values());
    return {
      totalLeads: all.length,
      newLeads: all.filter((l) => l.status === 'New').length,
      consultationRequests: all.filter((l) => l.source === 'consultation_popup').length,
      projectInquiries: all.filter((l) => l.source === 'contact_section').length,
      contactedLeads: all.filter((l) => l.status === 'Contacted').length,
      convertedLeads: all.filter((l) => l.status === 'Converted').length,
    };
  }
}

export const leadsDb = new LeadsDatabase();
