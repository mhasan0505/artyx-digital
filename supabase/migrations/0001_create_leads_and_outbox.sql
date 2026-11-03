create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  idempotency_key uuid not null unique,

  lead_type text not null
    check (lead_type in ('general', 'service', 'pos_demo', 'oms_demo')),

  status text not null default 'new'
    check (status in ('new', 'assigned', 'contacted', 'qualified', 'proposal', 'won', 'lost', 'spam')),

  name varchar(120) not null,
  email varchar(254) not null,
  phone_e164 varchar(20),
  country_code char(2),
  company varchar(160),
  service_slug varchar(100),
  preferred_contact_method text
    check (preferred_contact_method in ('email', 'phone', 'whatsapp')),

  details text not null,
  source_path varchar(500),
  landing_page varchar(1000),
  referrer varchar(1000),

  -- First-touch campaign attribution; captured only under the approved consent policy.
  first_utm_source varchar(200),
  first_utm_medium varchar(200),
  first_utm_campaign varchar(200),
  first_utm_term varchar(200),
  first_utm_content varchar(200),
  first_gclid varchar(500),
  first_fbclid varchar(500),
  first_touch_at timestamptz,

  -- Last-touch fields are useful for the converting visit.
  last_utm_source varchar(200),
  last_utm_medium varchar(200),
  last_utm_campaign varchar(200),
  last_utm_term varchar(200),
  last_utm_content varchar(200),
  last_gclid varchar(500),
  last_fbclid varchar(500),
  last_touch_at timestamptz,

  privacy_notice_version varchar(40) not null,
  privacy_notice_acknowledged boolean not null default false,
  marketing_opt_in boolean not null default false,
  marketing_opt_in_at timestamptz,

  -- HMAC hash only; never store the raw IP for routine lead processing.
  ip_hmac varchar(128),
  user_agent_family varchar(120),

  assigned_to varchar(160),
  first_response_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint leads_privacy_ack_check
    check (privacy_notice_acknowledged = true),
  constraint leads_marketing_timestamp_check
    check (
      (marketing_opt_in = false and marketing_opt_in_at is null)
      or
      (marketing_opt_in = true and marketing_opt_in_at is not null)
    )
);

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

create index if not exists leads_status_created_idx
  on public.leads (status, created_at desc);

create index if not exists leads_email_created_idx
  on public.leads (lower(email), created_at desc);

create index if not exists leads_type_created_idx
  on public.leads (lead_type, created_at desc);

create table if not exists public.lead_outbox (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,

  channel text not null
    check (channel in ('email', 'hubspot', 'telegram')),

  status text not null default 'pending'
    check (status in ('pending', 'processing', 'delivered', 'dead')),

  payload jsonb not null default '{}'::jsonb,
  attempts integer not null default 0 check (attempts >= 0),
  max_attempts integer not null default 8 check (max_attempts > 0),
  available_at timestamptz not null default now(),
  locked_until timestamptz,
  delivered_at timestamptz,
  provider_message_id varchar(300),
  last_error_code varchar(100),
  last_error_summary varchar(500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (lead_id, channel)
);

create index if not exists lead_outbox_ready_idx
  on public.lead_outbox (status, available_at)
  where status in ('pending', 'processing');

create index if not exists lead_outbox_lead_idx
  on public.lead_outbox (lead_id);

-- No browser/anonymous access to leads or outbox.
alter table public.leads enable row level security;
alter table public.lead_outbox enable row level security;

revoke all on table public.leads from anon, authenticated;
revoke all on table public.lead_outbox from anon, authenticated;

