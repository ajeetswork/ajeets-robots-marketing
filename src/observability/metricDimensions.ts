const KNOWN_ROUTES = [
  "GET /api/campaigns/:campaignId",
  "POST /api/campaigns",
  "GET /api/catalog/:sku",
  "POST /api/webhooks/:provider",
] as const;

export function normalizeRouteName(req: any): string {
  if (req.route?.path) {
    return `${req.method} ${req.baseUrl || ""}${req.route.path}`;
  }
  return "unmatched";
}

export function statusClass(statusCode: number): string {
  if (statusCode >= 500) return "5xx";
  if (statusCode >= 400) return "4xx";
  if (statusCode >= 300) return "3xx";
  if (statusCode >= 200) return "2xx";
  return "other";
}

export const CHANNELS = ["email", "web", "partner"] as const;
export const RESULTS = ["success", "failure", "accepted", "rejected", "hit", "miss"] as const;
export const REGIONS = ["nyc", "northeast", "national"] as const;
export { KNOWN_ROUTES };
