export interface OrderStage {
  id: number;
  number: string;
  tag: string;
  title: string;
  description: string;
  badge: string;
}

export const ORDER_STAGES: OrderStage[] = [
  {
    id: 1,
    number: "01",
    tag: "POS CHECKOUT",
    title: "SCAN (POS)",
    description: "Barcode scanned at counter checkout; receipt printed and transaction posted.",
    badge: "Counter Terminal Active",
  },
  {
    id: 2,
    number: "02",
    tag: "CENTRAL PIPELINE",
    title: "INBOUND",
    description: "Order enters the unified fulfillment pipeline and joins the processing queue.",
    badge: "Queued for Routing",
  },
  {
    id: 3,
    number: "03",
    tag: "OMNICHANNEL SYNC",
    title: "STOCK LOCK",
    description: "Inventory reserved across physical stores and online channels to prevent overselling.",
    badge: "Inventory Reserved",
  },
  {
    id: 4,
    number: "04",
    tag: "FULFILLMENT HUB",
    title: "PACKING",
    description: "Container closed, tamper-evident tape sealed, and courier shipping label applied.",
    badge: "Box Sealed & Labeled",
  },
  {
    id: 5,
    number: "05",
    tag: "CARRIER HANDOFF",
    title: "DISPATCH",
    description: "Package accelerates through outbound portal and transfers to courier transit.",
    badge: "Courier Tracking Live",
  },
  {
    id: 6,
    number: "06",
    tag: "FINAL DESTINATION",
    title: "DELIVERED",
    description: "Handed over to customer, delivery confirmed, and accounts ledger settled.",
    badge: "Order Completed",
  },
];
