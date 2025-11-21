export enum OrderStatus {
  Queued = 'Queued',
  Collecting = 'Collecting',
  Verifying = 'Verifying',
  Complete = 'Complete',
  ActionNeeded = 'Action Needed'
}

export interface Lead {
  id: string;
  brand_name: string;
  website_url: string;
  contact_name: string;
  contact_role: string;
  contact_email: string;
  verified_status: 'valid' | 'unknown' | 'invalid';
  why_fit_note: string;
}

export interface Order {
  id: string;
  customer_email: string;
  package_type: 'basic' | 'pro';
  niche: string;
  subniche: string;
  geography: string;
  leads_requested: number;
  add_on_refresh: boolean;
  status: OrderStatus;
  created_at: string;
  completed_at?: string;
  leads: Lead[];
  price: number;
  progress: number; // 0-100
  logs: string[];
}

export type ViewState = 
  | 'LANDING'
  | 'CHECKOUT_SELECTION'
  | 'CHECKOUT_PAYMENT'
  | 'ORDER_FORM'
  | 'ORDER_STATUS'
  | 'DELIVERY'
  | 'ADMIN_LOGIN'
  | 'ADMIN_DASHBOARD';
