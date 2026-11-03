import {
  getAllRegisteredCapabilities,
  getAvailableProductCapabilities,
  type ProductCapabilityRecord,
  type ProductKey,
} from "@/lib/content/capability-register";
import type { AeoAnswerFirstBlock } from "@/lib/content/services";

export interface ProductContentRecord {
  key: ProductKey;
  slug: "pos" | "order-management";
  name: string;
  shortName: string;
  canonicalPath: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  homepageHeadline: string;
  homepageSupportingCopy: string;
  homepageCtaLabel: string;
  heroSupportingCopy: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  targetAudiences: string[];
  supportedBusinessTypes: Array<{ title: string; description: string }>;
  problemsSolved: Array<{ title: string; description: string }>;
  workflowSteps: Array<{ step: string; title: string; description: string }>;
  deviceAndConnectivityRequirements: string[];
  pricingSummary: string;
  onboardingAndSupport: string[];
  aeoAnswerFirst: AeoAnswerFirstBlock;
  faqs: Array<{ question: string; answer: string }>;
  availableCapabilities: ProductCapabilityRecord[];
  allCapabilities: ProductCapabilityRecord[];
}

export const PRODUCTS_CONTENT: Record<ProductKey, ProductContentRecord> = {
  pos: {
    key: "pos",
    slug: "pos",
    name: "Artyx POS Software",
    shortName: "POS Software",
    canonicalPath: "/products/pos/",
    seoTitle: "POS Software for Retail Businesses in Bangladesh | Artyx Digital",
    metaDescription:
      "Manage counter sales, SKU inventory, staff permissions, and daily retail reporting from one system. Request a live demo of Artyx POS Software.",
    h1: "Take Control of Your Sales, Inventory and Business Operations.",
    homepageHeadline: "Run Your Business with Greater Control.",
    homepageSupportingCopy:
      "Manage sales, inventory and daily operations from one system.",
    homepageCtaLabel: "Explore POS Software",
    heroSupportingCopy:
      "Manage everyday retail operations with a POS system designed to help your team handle counter billing, stock tracking, and daily sales reporting with greater clarity.",
    primaryCtaLabel: "Request a POS Demo",
    secondaryCtaLabel: "Explore POS Features",
    targetAudiences: [
      "Retail and electronics shops in Bangladesh",
      "Fashion, footwear, and lifestyle boutiques",
      "Supermarkets, grocery stores, and convenience outlets",
      "Specialty retail stores managing barcode SKUs and staff shifts",
    ],
    supportedBusinessTypes: [
      {
        title: "Electronics & Gadget Retailers",
        description:
          "Track high-value SKUs, itemized invoices, warranty notes, and customer purchase history at the counter.",
      },
      {
        title: "Fashion & Apparel Boutiques",
        description:
          "Manage size and color variants, barcode label printing, seasonal discounts, and branch stock visibility.",
      },
      {
        title: "General Retail & Superstores",
        description:
          "Speed up counter checkout with barcode scanning, split payment recording, and low-stock reorder alerts.",
      },
      {
        title: "Multi-Outlet Retail Businesses",
        description:
          "Monitor branch-level register closures and stock transfers from one owner dashboard where configured.",
      },
    ],
    problemsSolved: [
      {
        title: "Stock Mismatch & Shrinkage",
        description:
          "Manual registers and end-of-week spreadsheets hide missing stock until items are already out of stock. Artyx POS logs every sale, return, and stock adjustment against SKU balances.",
      },
      {
        title: "Slow Counter Checkout & Billing Errors",
        description:
          "Handwritten bills or generic spreadsheets slow down peak-hour customers. Barcode lookup and clear discount rules keep counter billing fast and accurate.",
      },
      {
        title: "Lack of Cashier Accountability",
        description:
          "Shared logins make it impossible to audit price changes or refunds. Role-based permissions separate cashier checkout actions from manager approvals.",
      },
      {
        title: "Delayed Daily Cash & Sales Visibility",
        description:
          "Instead of waiting for manual evening tallies, owners can review register summaries, payment method breakdowns, and top-selling items anytime.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Set Up Catalogue & Opening Stock",
        description:
          "Import or add your products, categories, SKU barcodes, cost/selling prices, and opening stock quantities.",
      },
      {
        step: "02",
        title: "Scan & Bill at the Counter",
        description:
          "Cashiers scan barcodes or search products, apply approved discounts, record cash/card/mobile-wallet tender, and print receipts.",
      },
      {
        step: "03",
        title: "Track Stock Movements & Purchases",
        description:
          "Receive supplier stock-ins, record damaged/adjusted items, and receive alerts when fast-moving items reach reorder thresholds.",
      },
      {
        step: "04",
        title: "Review Register Closures & Reports",
        description:
          "Managers and owners review daily sales totals, payment reconciliations, and product margin reports.",
      },
    ],
    deviceAndConnectivityRequirements: [
      "Runs in modern desktop, laptop, and tablet web browsers (Chrome / Edge recommended).",
      "Compatible with standard USB/wireless HID barcode scanners and thermal receipt printers supported by browser/OS print drivers.",
      "Requires an active internet connection for real-time cloud synchronization and multi-outlet reporting (offline continuity options are currently in development; ask during your demo).",
    ],
    pricingSummary:
      "Pricing is structured by number of active outlets and required operational modules. Because hardware setup, catalogue migration, and outlet count vary, we provide a transparent BDT (or USD) quote after a walkthrough of your shop workflow.",
    onboardingAndSupport: [
      "Guided catalogue and opening-stock import template assistance",
      "Counter hardware compatibility check (barcode scanner & receipt printer)",
      "Live training session for store managers and counter cashiers",
      "Support during staffed Dhaka business hours per your agreed service plan",
    ],
    aeoAnswerFirst: {
      whatItIs:
        "POS (Point of Sale) software helps a retail business record counter sales, issue receipts, track product inventory, manage cashier permissions, and review daily financial reports.",
      whoItIsFor:
        "Physical retail shops, electronics stores, fashion outlets, and multi-branch retailers that need structured billing and stock control.",
      problemItSolves:
        "Replaces manual cash registers and disconnected inventory spreadsheets with a single system that deducts stock automatically on every sale.",
      howItWorks:
        "Products and stock levels are loaded into the POS catalogue; cashiers scan items and record payments at checkout; managers monitor stock balances and daily sales reports from the dashboard.",
      whatIsIncluded: [
        "Counter billing and receipt printing interface",
        "Product catalogue, SKU variant, and stock adjustment management",
        "Role-based access for cashiers, managers, and owners",
        "Customer directory and purchase history lookup",
        "Daily sales, payment breakdown, and inventory reports",
      ],
      whatIsNotIncluded: [
        "Physical POS terminal hardware, barcode scanners, or thermal printers (unless separately quoted)",
        "Full double-entry corporate tax audit accounting",
        "Multi-channel Facebook/Instagram comment moderation (covered by Artyx OMS)",
      ],
      pricingApproach:
        "Tailored subscription or deployment quote based on number of outlets, SKU volume, and onboarding requirements. Request a POS demo to review pricing for your shop.",
      onboardingProcess:
        "1) Live workflow demo → 2) Catalogue spreadsheet preparation → 3) Outlet & role setup → 4) Cashier training and go-live.",
      howToEvaluateAlternatives:
        "Test whether the POS handles your actual product variants, how fast a cashier can complete a bill using keyboard/scanner, how role permissions restrict unauthorized refunds, and whether local onboarding support is available.",
    },
    faqs: [
      {
        question: "What is POS software and how does it help a retail business?",
        answer:
          "POS software is the system a retail shop uses at the checkout counter to calculate totals, record payments, issue receipts, and automatically update inventory counts. It helps shop owners prevent stock mismatches, speed up billing, and see accurate daily sales figures without manual calculations.",
      },
      {
        question: "Can Artyx POS manage inventory and low-stock alerts?",
        answer:
          "Yes. Every completed counter sale automatically deducts the sold quantity from your outlet's inventory balance. You can also record supplier stock-ins, log manual stock adjustments, and view items approaching low-stock thresholds.",
      },
      {
        question: "Can the POS system support multiple outlets?",
        answer:
          "Yes, where configured in your plan, Artyx POS supports multi-outlet setups with branch-specific stock balances, inter-branch stock transfer logs, and consolidated owner reporting.",
      },
      {
        question: "Does Artyx POS work offline?",
        answer:
          "Artyx POS is a cloud-based web application that uses an active internet connection to keep sales and inventory synchronized in real time. Offline counter continuity features are currently in development—please discuss your outlet's internet reliability during your demo so we can advise the best setup.",
      },
      {
        question: "How do I request a POS demonstration?",
        answer:
          "Submit the Request a POS Demo form on this page or on /request-demo/ with your business type and outlet count. Our product team will contact you within our stated business response window to schedule a live walkthrough.",
      },
    ],
    availableCapabilities: getAvailableProductCapabilities("pos"),
    allCapabilities: getAllRegisteredCapabilities("pos"),
  },

  oms: {
    key: "oms",
    slug: "order-management",
    name: "Artyx Order Management System (OMS)",
    shortName: "Order Management System (OMS)",
    canonicalPath: "/products/order-management/",
    seoTitle: "Order Management System for Online Sellers | Artyx Digital",
    metaDescription:
      "Organize Facebook, Instagram, and website orders in one structured workflow. Reduce missed orders, duplicate dispatches, and stock chaos with Artyx OMS.",
    h1: "Manage Every Online Order. Without the Chaos.",
    homepageHeadline: "Manage Every Online Order in One Place.",
    homepageSupportingCopy:
      "Bring order management into a more organized workflow for online selling businesses.",
    homepageCtaLabel: "Explore OMS",
    heroSupportingCopy:
      "Bring your Facebook, Instagram, phone, and website order workflow into one organized system—making it easier for your team to confirm orders, reserve stock, pack parcels, and track fulfilment.",
    primaryCtaLabel: "Request an OMS Demo",
    secondaryCtaLabel: "See How It Works",
    targetAudiences: [
      "Facebook and Instagram social-commerce (F-commerce) sellers",
      "Growing online retailers handling 100 to 10,000+ monthly orders",
      "Businesses receiving orders across social inbox, WhatsApp/phone, and e-commerce websites",
      "Operations teams struggling with spreadsheet errors and duplicate dispatches",
    ],
    supportedBusinessTypes: [
      {
        title: "Facebook & Instagram Commerce Brands",
        description:
          "Turn inbox messages and comment orders into structured order tickets with customer phone lookup and stock reservation.",
      },
      {
        title: "Multi-Channel Online Retailers",
        description:
          "Consolidate orders coming from social pages, WhatsApp, and your website into a single confirmation and packing queue.",
      },
      {
        title: "D2C Fashion, Cosmetics & Lifestyle Sellers",
        description:
          "Reduce return rates by verifying customer order history, confirming variants before packing, and tracking parcel status.",
      },
      {
        title: "Growing E-commerce Fulfilment Teams",
        description:
          "Separate moderator order-entry duties from warehouse packing and dispatch printing.",
      },
    ],
    problemsSolved: [
      {
        title: "Orders Lost in Inbox & Spreadsheet Chaos",
        description:
          "When multiple page moderators copy customer details into shared sheets, orders get overwritten, forgotten, or dispatched twice. Artyx OMS gives every order a unique ID and status trail.",
      },
      {
        title: "Overselling Items That Are Already Out of Stock",
        description:
          "Moderators often confirm orders for popular items without knowing another moderator just sold the last unit. OMS reserves stock the moment an order is confirmed.",
      },
      {
        title: "Confusion Between Moderators and Packing Staff",
        description:
          "Without clear status stages, warehouse teams pack unconfirmed orders or miss special delivery notes. OMS separates New, Confirmed, Packed, and Dispatched queues.",
      },
      {
        title: "No Visibility into Channel Performance or Returns",
        description:
          "Know exactly how many orders came from Facebook vs. Instagram vs. Website, and track cancellation and return reasons.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Order Capture & Customer Lookup",
        description:
          "Enter social/phone orders or receive web orders with instant phone-number lookup to view past customer delivery history.",
      },
      {
        step: "02",
        title: "Call Confirmation & Stock Reservation",
        description:
          "Verify order details with the buyer and mark as Confirmed—automatically reserving the SKU quantity in inventory.",
      },
      {
        step: "03",
        title: "Invoice & Packing Slip Generation",
        description:
          "Filter all Confirmed orders and generate standardized packing slips and invoices for the fulfilment team.",
      },
      {
        step: "04",
        title: "Courier Dispatch Preparation",
        description:
          "Mark packed orders as Dispatched and export standardized courier dispatch sheets (ask about active courier API connectors during your demo).",
      },
      {
        step: "05",
        title: "Delivery & Return Tracking",
        description:
          "Update final status to Delivered or Returned; returned items can be restocked into inventory with an audit note.",
      },
    ],
    deviceAndConnectivityRequirements: [
      "Cloud-hosted web application accessible on desktop, laptop, and mobile browsers for moderators and warehouse staff.",
      "Supports standard A4, A5, and thermal label/invoice printing layouts.",
      "Requires internet connectivity for real-time order queue and stock synchronization across team members.",
    ],
    pricingSummary:
      "Pricing is tailored based on your monthly order volume band, number of moderator/operator seats, and any custom website or courier integration setup. Request an OMS demo for a clear quote.",
    onboardingAndSupport: [
      "Product catalogue and SKU import setup",
      "Order workflow stage & sales-channel configuration",
      "Live training for page moderators and packing/dispatch staff",
      "Ongoing support during staffed Dhaka business hours",
    ],
    aeoAnswerFirst: {
      whatItIs:
        "An Order Management System (OMS) is software that organizes and tracks online customer orders from initial capture and confirmation through inventory reservation, packing, dispatch, and final delivery or return.",
      whoItIsFor:
        "Facebook and Instagram commerce sellers, D2C brands, and online retailers managing orders across social media, phone/WhatsApp, and e-commerce websites.",
      problemItSolves:
        "Replaces error-prone spreadsheets and chat threads with a structured order pipeline that prevents missed orders, duplicate shipments, and overselling out-of-stock products.",
      howItWorks:
        "Moderators log or import incoming orders, verify customer history by phone number, confirm orders to reserve stock, and hand off a clean queue to packing staff for invoice printing and dispatch tracking.",
      whatIsIncluded: [
        "Multi-channel order intake and channel tagging (Facebook, Instagram, Website, Phone)",
        "Stage-by-stage order status workflow (New, Confirmed, Packed, Dispatched, Delivered, Returned)",
        "Customer phone-number lookup and order history",
        "Automatic inventory reservation on order confirmation",
        "Packing slip generation and operational sales/return reports",
      ],
      whatIsNotIncluded: [
        "In-store barcode counter checkout for walk-in shoppers (covered by Artyx POS)",
        "Third-party courier delivery charges",
        "Unverified social media auto-bot comment scraping that violates platform policies",
      ],
      pricingApproach:
        "Based on monthly order volume band and team seats. Request an OMS demo to review plan options in BDT or USD.",
      onboardingProcess:
        "1) Workflow walkthrough demo → 2) Product SKU setup → 3) Moderator & packing team training → 4) Live order transition.",
      howToEvaluateAlternatives:
        "Check how quickly a moderator can enter an order during peak campaign hours, whether stock is reserved immediately upon confirmation, and whether courier/website integrations match your actual channels.",
    },
    faqs: [
      {
        question: "What is an Order Management System (OMS)?",
        answer:
          "An Order Management System helps an online selling business collect, confirm, pack, dispatch, and track customer orders in one central workflow instead of scattered spreadsheets and chat logs.",
      },
      {
        question: "How does Artyx OMS help Facebook and Instagram sellers?",
        answer:
          "Social-commerce sellers often have multiple moderators answering messages at the same time. Artyx OMS gives moderators a fast order-entry screen with customer phone lookup, automatic stock reservation so two moderators never sell the same last unit, and a clean packing queue for dispatch staff.",
      },
      {
        question: "What is the difference between POS and OMS?",
        answer:
          "POS (Point of Sale) software is built for in-store walk-in counter billing where a customer pays and takes the product immediately. OMS (Order Management System) is built for online and remote orders that move through stages—Order Capture → Confirmation → Packing → Courier Dispatch → Delivery or Return.",
      },
      {
        question: "Does Artyx OMS synchronize inventory when orders are confirmed?",
        answer:
          "Yes. When an order is marked as Confirmed in Artyx OMS, the system reserves that stock quantity so your team can see accurate available-to-sell inventory. If an order is cancelled or returned in resellable condition, stock can be restored.",
      },
      {
        question: "Which courier and website integrations are supported?",
        answer:
          "Artyx OMS supports standardized courier dispatch exports and can be connected with Artyx-built e-commerce websites. Because direct courier API connectors (such as Pathao, Steadfast, or RedX) and third-party site webhooks depend on your account credentials and current connector status, our team confirms exact integration availability during your live demo.",
      },
    ],
    availableCapabilities: getAvailableProductCapabilities("oms"),
    allCapabilities: getAllRegisteredCapabilities("oms"),
  },
};

export function getAllProducts(): ProductContentRecord[] {
  return [PRODUCTS_CONTENT.pos, PRODUCTS_CONTENT.oms];
}

