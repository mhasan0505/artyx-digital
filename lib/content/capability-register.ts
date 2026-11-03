export type CapabilityStatus = "available" | "in_development" | "planned";
export type ProductKey = "pos" | "oms";

export interface ProductCapabilityRecord {
  id: string;
  product: ProductKey;
  category: string;
  featureName: string;
  title?: string;
  status: CapabilityStatus;
  evidence: string;
  limitations: string;
  approvedWording: string;
  summary?: string;
  owner: string;
  lastVerified: string;
}

export const PRODUCT_CAPABILITY_REGISTER: ProductCapabilityRecord[] = [
  // === POS CAPABILITIES ===
  {
    id: "pos-sales-billing",
    product: "pos",
    category: "Sales & Billing",
    featureName: "Counter Billing, Barcode Scanning & Receipt Printing",
    status: "available",
    evidence: "Core counter checkout module & thermal printer workflow",
    limitations: "Requires compatible USB/LAN thermal receipt printer and barcode scanner.",
    approvedWording:
      "Process counter sales with barcode lookup, itemized discounts, split tender recording, and printable or digital receipts.",
    owner: "POS Product Owner",
    lastVerified: "2026-10-30",
  },
  {
    id: "pos-inventory",
    product: "pos",
    category: "Product & Inventory Management",
    featureName: "SKU Catalogue, Variants, Stock Adjustments & Low-Stock Alerts",
    status: "available",
    evidence: "Inventory ledger & stock movement module",
    limitations: "Serial/IMEI tracking and batch expiry tracking depend on configured business profile.",
    approvedWording:
      "Maintain a structured product catalogue with SKU variants, stock-in/stock-out logs, supplier purchase records, and low-stock notifications.",
    owner: "POS Product Owner",
    lastVerified: "2026-10-30",
  },
  {
    id: "pos-reporting",
    product: "pos",
    category: "Reporting & Analytics",
    featureName: "Daily Register Summaries & Itemized Sales Reports",
    status: "available",
    evidence: "POS reporting dashboard view",
    limitations: "Custom accounting ERP exports require project-level configuration.",
    approvedWording:
      "Review daily register closures, payment method breakdowns, top-selling items, and gross margin summaries from one dashboard.",
    owner: "POS Product Owner",
    lastVerified: "2026-10-30",
  },
  {
    id: "pos-roles",
    product: "pos",
    category: "Employee Access & Roles",
    featureName: "Role-Based Cashier & Manager Permissions",
    status: "available",
    evidence: "RBAC user management configuration",
    limitations: "Granular custom permission matrices beyond standard roles require admin setup.",
    approvedWording:
      "Assign separate access levels for cashiers, store managers, and owners so sensitive price edits, refunds, and reports stay controlled.",
    owner: "POS Product Owner",
    lastVerified: "2026-10-30",
  },
  {
    id: "pos-customers",
    product: "pos",
    category: "Customer Management",
    featureName: "Customer Directory & Purchase History",
    status: "available",
    evidence: "Customer profile lookup at checkout",
    limitations: "Automated SMS marketing requires a configured local SMS gateway account.",
    approvedWording:
      "Record customer contact details at checkout to track repeat purchases, store credit, and invoice history.",
    owner: "POS Product Owner",
    lastVerified: "2026-10-30",
  },
  {
    id: "pos-multi-outlet",
    product: "pos",
    category: "Multi-Outlet Operations",
    featureName: "Branch-Level Stock & Centralized Owner Reporting",
    status: "available",
    evidence: "Multi-branch store selector & stock transfer workflow",
    limitations: "Subject to selected plan tier and active internet connectivity for inter-branch sync.",
    approvedWording:
      "Manage stock transfers and view consolidated or branch-by-branch sales across multiple retail outlets where configured in your plan.",
    owner: "POS Product Owner",
    lastVerified: "2026-10-30",
  },
  {
    id: "pos-offline-queue",
    product: "pos",
    category: "Connectivity & Resilience",
    featureName: "Offline Counter Continuity",
    status: "in_development",
    evidence: "Local browser cache queue under active staging verification",
    limitations: "Currently in development; live cloud sync requires active internet connection.",
    approvedWording:
      "Cloud-based POS accessible on desktop and tablet browsers; ask during your demo about offline resilience options for your outlet setup.",
    owner: "POS Product Owner",
    lastVerified: "2026-10-30",
  },

  // === OMS CAPABILITIES ===
  {
    id: "oms-order-intake",
    product: "oms",
    category: "Order Collection & Intake",
    featureName: "Centralized Order Entry for Social & Web Sales",
    status: "available",
    evidence: "OMS order creation & channel tagging workflow",
    limitations: "Direct API webhook sync depends on website platform; social orders use structured quick-entry or approved connectors.",
    approvedWording:
      "Capture orders from Facebook, Instagram, phone/WhatsApp, and your website into one standardized order queue with channel tags.",
    owner: "OMS Product Owner",
    lastVerified: "2026-10-30",
  },
  {
    id: "oms-lifecycle-status",
    product: "oms",
    category: "Order Status Workflow",
    featureName: "Stage-by-Stage Order Confirmation, Packing & Fulfilment Tracking",
    status: "available",
    evidence: "OMS status pipeline board & audit log",
    limitations: "Custom workflow stages beyond standard e-commerce lifecycle require admin setup.",
    approvedWording:
      "Move orders cleanly from New → Confirmed → Packed → Dispatched → Delivered or Returned, with timestamps and operator history.",
    owner: "OMS Product Owner",
    lastVerified: "2026-10-30",
  },
  {
    id: "oms-customer-records",
    product: "oms",
    category: "Customer & Address Management",
    featureName: "Customer Repeat-Order & Delivery History Lookup",
    status: "available",
    evidence: "Phone-number customer lookup in OMS order form",
    limitations: "Historical data covers orders recorded within your Artyx OMS workspace.",
    approvedWording:
      "Look up returning customers by phone number to pre-fill delivery addresses and review past order completion or return history.",
    owner: "OMS Product Owner",
    lastVerified: "2026-10-30",
  },
  {
    id: "oms-team-workflow",
    product: "oms",
    category: "Team Workflow & Assignment",
    featureName: "Moderator & Fulfilment Staff Role Separation",
    status: "available",
    evidence: "OMS operator assignment & packing slip batch print",
    limitations: "User seat limits depend on selected subscription tier.",
    approvedWording:
      "Separate responsibilities between page moderators (order entry & call confirmation) and warehouse/packing staff (invoice printing & dispatch).",
    owner: "OMS Product Owner",
    lastVerified: "2026-10-30",
  },
  {
    id: "oms-inventory-reservation",
    product: "oms",
    category: "Inventory Synchronization",
    featureName: "Stock Reservation on Order Confirmation",
    status: "available",
    evidence: "OMS stock deduction trigger on confirmed status",
    limitations: "Prevents overselling across moderators using the same OMS catalogue.",
    approvedWording:
      "Automatically reserve available stock when an order is confirmed and release stock back to inventory if an order is cancelled or returned.",
    owner: "OMS Product Owner",
    lastVerified: "2026-10-30",
  },
  {
    id: "oms-reporting",
    product: "oms",
    category: "Operational Reporting",
    featureName: "Channel Sales, Confirmation Rate & Return Tracking",
    status: "available",
    evidence: "OMS operational summary reports",
    limitations: "COD settlement reconciliation requires courier payout import or supported webhook.",
    approvedWording:
      "Track daily order volume by sales channel, confirmation vs. cancellation ratios, pending dispatch queues, and returned parcels.",
    owner: "OMS Product Owner",
    lastVerified: "2026-10-30",
  },
  {
    id: "oms-courier-api",
    product: "oms",
    category: "Courier & Delivery Dispatch",
    featureName: "Courier Consignment Export & Dispatch Workflow",
    status: "in_development",
    evidence: "CSV bulk export available; direct courier API connectors verified per courier partner",
    limitations: "Confirm specific courier API availability (e.g. Pathao, Steadfast, RedX) during your product demo.",
    approvedWording:
      "Generate standardized packing slips and courier dispatch sheets; ask our product team during your demo which direct courier API connectors are active for your account.",
    owner: "OMS Product Owner",
    lastVerified: "2026-10-30",
  },
];

/**
 * Returns only capabilities verified as 'available' for primary sales claims (Draft v2 Section 3.2/3.3 & T03).
 */
export function getAvailableProductCapabilities(
  product: ProductKey,
): ProductCapabilityRecord[] {
  return PRODUCT_CAPABILITY_REGISTER.filter(
    (item) => item.product === product && item.status === "available",
  ).map((item) => ({
    ...item,
    title: item.featureName,
    summary: item.approvedWording,
  }));
}

/**
 * Returns capabilities with transparent status & limitation notes for technical evaluation tables.
 */
export function getAllRegisteredCapabilities(
  product: ProductKey,
): ProductCapabilityRecord[] {
  return PRODUCT_CAPABILITY_REGISTER.filter((item) => item.product === product).map(
    (item) => ({
      ...item,
      title: item.featureName,
      summary: item.approvedWording,
    }),
  );
}

