import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function generate() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 750, deviceScaleFactor: 2 });

  // Generate POS screenshot placeholder
  const posHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      body {
        width: 1200px;
        height: 750px;
        background: #070B06;
        color: #FFFFFF;
        display: flex;
        flex-direction: column;
        padding: 32px;
        border: 2px solid #7FFF00;
        box-sizing: border-box;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #333333;
        padding-bottom: 20px;
        margin-bottom: 24px;
      }
      .badge {
        background: rgba(127, 255, 0, 0.12);
        color: #7FFF00;
        border: 1px solid rgba(127, 255, 0, 0.35);
        padding: 6px 14px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .toolbar {
        background: #11180E;
        border: 1px solid #1A2218;
        border-radius: 8px;
        padding: 10px 18px;
        color: #E8ECE4;
        font-size: 13px;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }
      .grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 24px;
        flex: 1;
      }
      .card {
        background: #11180E;
        border: 1px solid #333333;
        border-radius: 12px;
        padding: 24px;
      }
      .table-head {
        display: grid;
        grid-template-columns: 3fr 1fr 1fr 1fr;
        font-size: 12px;
        color: #888888;
        border-bottom: 1px solid #333333;
        padding-bottom: 10px;
        margin-bottom: 12px;
        text-transform: uppercase;
      }
      .table-row {
        display: grid;
        grid-template-columns: 3fr 1fr 1fr 1fr;
        font-size: 14px;
        padding: 14px 0;
        border-bottom: 1px solid #222222;
      }
      .price {
        color: #7FFF00;
        font-weight: 600;
        font-family: monospace;
      }
      .summary-box {
        background: #0D140B;
        border: 1px solid #333333;
        border-radius: 8px;
        padding: 20px;
        margin-top: 16px;
      }
      .sum-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 14px;
        color: #CCCCCC;
      }
      .sum-total {
        font-size: 22px;
        font-weight: 800;
        color: #7FFF00;
        border-top: 1px solid #333333;
        padding-top: 16px;
      }
      .btn {
        background: #7FFF00;
        color: #070B06;
        font-weight: 700;
        text-align: center;
        padding: 14px;
        border-radius: 8px;
        margin-top: 16px;
        font-size: 15px;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div>
        <h1 style="font-size: 24px; font-weight: 800; color: #FFFFFF;">ARTYX POS · RETAIL CHECKOUT REGISTER <span style="font-size: 11px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); padding: 3px 8px; border-radius: 4px; vertical-align: middle; margin-left: 8px; font-weight: 600; color: #E8ECE4; letter-spacing: 0.05em;">ILLUSTRATIVE</span></h1>
        <p style="font-size: 13px; color: #888888; margin-top: 4px;">Live Register Counter 01 · Shift Active · Receipt #8942</p>
      </div>
      <div class="badge">Hardware Connected</div>
    </div>
    <div class="toolbar">
      <span>Terminal ID: POS-DH-01 · Cashier: Active</span>
      <span>Omnichannel Stock Sync: Enabled</span>
    </div>
    <div class="grid">
      <div class="card">
        <h3 style="font-size: 16px; margin-bottom: 16px; color: #FFFFFF;">Current Customer Cart</h3>
        <div class="table-head">
          <div>Item Description</div>
          <div>Unit Price</div>
          <div>Qty</div>
          <div>Total</div>
        </div>
        <div class="table-row">
          <div>Retail Wireless Barcode Terminal</div>
          <div>3,450</div>
          <div>1</div>
          <div class="price">৳ 3,450</div>
        </div>
        <div class="table-row">
          <div>Direct Thermal Paper Roll 80mm (Box)</div>
          <div>450</div>
          <div>2</div>
          <div class="price">৳ 900</div>
        </div>
        <div class="table-row">
          <div>High-Speed Cash Drawer Trigger Cord</div>
          <div>650</div>
          <div>1</div>
          <div class="price">৳ 650</div>
        </div>
      </div>
      <div class="card">
        <h3 style="font-size: 16px; margin-bottom: 16px; color: #FFFFFF;">Payment Reconciliation</h3>
        <div class="summary-box">
          <div class="sum-row">
            <span>Subtotal</span>
            <span>৳ 5,000</span>
          </div>
          <div class="sum-row">
            <span>VAT / Tax (5%)</span>
            <span>৳ 250</span>
          </div>
          <div class="sum-row sum-total">
            <span>Payable</span>
            <span>৳ 5,250</span>
          </div>
        </div>
        <div class="btn">Print Receipt &amp; Settle (F12)</div>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(posHtml, { waitUntil: "domcontentloaded" });
  await page.screenshot({ path: path.join(process.cwd(), "public/product/pos.png") });

  // Generate OMS screenshot placeholder
  const omsHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      body {
        width: 1200px;
        height: 750px;
        background: #070B06;
        color: #FFFFFF;
        display: flex;
        flex-direction: column;
        padding: 32px;
        border: 2px solid #7FFF00;
        box-sizing: border-box;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #333333;
        padding-bottom: 20px;
        margin-bottom: 24px;
      }
      .badge {
        background: rgba(127, 255, 0, 0.12);
        color: #7FFF00;
        border: 1px solid rgba(127, 255, 0, 0.35);
        padding: 6px 14px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .toolbar {
        background: #11180E;
        border: 1px solid #1A2218;
        border-radius: 8px;
        padding: 10px 18px;
        color: #E8ECE4;
        font-size: 13px;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }
      .pipeline {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 18px;
        flex: 1;
      }
      .col {
        background: #11180E;
        border: 1px solid #333333;
        border-radius: 12px;
        padding: 16px;
        display: flex;
        flex-direction: column;
      }
      .col-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        padding-bottom: 12px;
        border-bottom: 1px solid #222222;
        margin-bottom: 14px;
        color: #CCCCCC;
      }
      .count-pill {
        background: #222222;
        color: #7FFF00;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 12px;
      }
      .item-card {
        background: #0A0F08;
        border: 1px solid #333333;
        border-radius: 8px;
        padding: 14px;
        margin-bottom: 12px;
      }
      .item-top {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: #7FFF00;
        font-weight: 700;
        margin-bottom: 6px;
      }
      .item-title {
        font-size: 13px;
        font-weight: 600;
        color: #FFFFFF;
        margin-bottom: 8px;
      }
      .item-meta {
        font-size: 11px;
        color: #888888;
        display: flex;
        justify-content: space-between;
      }
      .courier-tag {
        color: #7FFF00;
        background: rgba(127, 255, 0, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div>
        <h1 style="font-size: 24px; font-weight: 800; color: #FFFFFF;">ARTYX OMS · MULTI-CHANNEL DISPATCH <span style="font-size: 11px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); padding: 3px 8px; border-radius: 4px; vertical-align: middle; margin-left: 8px; font-weight: 600; color: #E8ECE4; letter-spacing: 0.05em;">ILLUSTRATIVE</span></h1>
        <p style="font-size: 13px; color: #888888; margin-top: 4px;">Multi-Store Stock Routing · Courier Integrations · Automated Sync</p>
      </div>
      <div class="badge">Couriers Synced</div>
    </div>
    <div class="toolbar">
      <span>Pipeline Status: Normal · Queue Latency: &lt; 1.2s</span>
      <span>API Gateway: Connected (Pathao / Steadfast / RedX)</span>
    </div>
    <div class="pipeline">
      <div class="col">
        <div class="col-header">
          <span>Inbound Orders</span>
          <span class="count-pill">18</span>
        </div>
        <div class="item-card">
          <div class="item-top">
            <span>WEB-ORDER #9102</span>
            <span>02m ago</span>
          </div>
          <div class="item-title">3x Cotton Casual Shirt</div>
          <div class="item-meta">
            <span>Dhaka Metro</span>
            <span class="courier-tag">Steadfast</span>
          </div>
        </div>
        <div class="item-card">
          <div class="item-top">
            <span>FB-INBOX #9103</span>
            <span>07m ago</span>
          </div>
          <div class="item-title">1x Leather Wallet Pro</div>
          <div class="item-meta">
            <span>Chittagong</span>
            <span class="courier-tag">Pathao</span>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="col-header">
          <span>Stock Locked</span>
          <span class="count-pill">12</span>
        </div>
        <div class="item-card">
          <div class="item-top">
            <span>STOCK-RES #9098</span>
            <span>Locked</span>
          </div>
          <div class="item-title">2x Formal Shoes (Size 42)</div>
          <div class="item-meta">
            <span>Reserved</span>
            <span class="courier-tag">Central Hub</span>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="col-header">
          <span>Packing &amp; Label</span>
          <span class="count-pill">8</span>
        </div>
        <div class="item-card">
          <div class="item-top">
            <span>BARCODE SEALED</span>
            <span>Ready</span>
          </div>
          <div class="item-title">1x Electronics Soundbar</div>
          <div class="item-meta">
            <span>Label Printed</span>
            <span class="courier-tag">RedX</span>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="col-header">
          <span>Dispatched</span>
          <span class="count-pill">34</span>
        </div>
        <div class="item-card">
          <div class="item-top">
            <span>IN TRANSIT</span>
            <span>Dispatched</span>
          </div>
          <div class="item-title">1x Wireless Mechanical Board</div>
          <div class="item-meta">
            <span>Out for Delivery</span>
            <span class="courier-tag">eCourier</span>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(omsHtml, { waitUntil: "domcontentloaded" });
  await page.screenshot({ path: path.join(process.cwd(), "public/product/oms.png") });

  await browser.close();
  console.log("Successfully generated /public/product/pos.png and /public/product/oms.png");
}

generate().catch(console.error);
