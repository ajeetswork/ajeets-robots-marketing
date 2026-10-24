import { Counter } from "prom-client";

export const campaignPublished = new Counter({
  name: "ajeets_campaign_published_total",
  help: "Campaign publication outcomes",
  labelNames: ["channel", "result"],
});

export const catalogLookup = new Counter({
  name: "ajeets_marketing_catalog_lookup_total",
  help: "Catalog lookup attempts used by campaign builders",
  labelNames: ["product_family", "result"],
});

export const webhookProcessed = new Counter({
  name: "ajeets_marketing_webhook_processed_total",
  help: "Inbound marketing webhook processing outcomes",
  labelNames: ["provider", "event_type", "result"],
});

export function recordCampaignPublished(campaign: any) {
  const channel = campaign.channel === "partner_portal" ? "partner" :
    campaign.channel === "email" ? "email" : "web";
  const result = campaign.published ? "success" : "failure";

  campaignPublished.labels(channel, result).inc();

  console.info("campaign.published", {
    campaign_id: campaign.id,
    channel,
    result,
  });
}

export function recordCatalogLookup(product: any, found: boolean) {
  catalogLookup.labels(product.family, found ? "hit" : "miss").inc();
}

export function recordWebhook(provider: string, eventType: string, ok: boolean) {
  webhookProcessed.labels(provider, eventType, ok ? "success" : "failure").inc();
}
