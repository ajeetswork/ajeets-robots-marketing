import { Histogram } from "prom-client";
import { normalizeRouteName, statusClass } from "./metricDimensions";

export const httpRequestDuration = new Histogram({
  name: "ajeets_marketing_http_request_duration_seconds",
  help: "HTTP request handling latency",
  labelNames: ["method", "route", "status_class"],
});

export const apiResponseBytes = new Histogram({
  name: "ajeets_marketing_api_response_bytes",
  help: "Serialized API response size",
  labelNames: ["route", "method"],
});

export function observeHttpRequest(req: any, res: any, seconds: number, bytes: number) {
  const routeName = normalizeRouteName(req);
  const responseClass = statusClass(res.statusCode);

  httpRequestDuration
    .labels(req.method, routeName, responseClass)
    .observe(seconds);

  apiResponseBytes
    .labels(routeName, req.method)
    .observe(bytes);

  console.info("request.complete", {
    method: req.method,
    route_name: routeName,
    url: req.originalUrl,
    status: res.statusCode,
  });
}
