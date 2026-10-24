import { Counter, Histogram } from "prom-client";

export const jobLatency = new Histogram({
  name: "ajeets_marketing_job_latency_seconds",
  help: "Background marketing job processing latency",
  labelNames: ["job_name", "request_id", "result"],
});

export const deliveryErrors = new Counter({
  name: "ajeets_marketing_delivery_errors_total",
  help: "Campaign delivery failures",
  labelNames: ["region", "error_message"],
});

export function observeJob(job: any, seconds: number, ok: boolean) {
  jobLatency
    .labels(job.name, job.requestId, ok ? "success" : "failure")
    .observe(seconds);
}

export function recordDeliveryError(region: string, err: Error) {
  deliveryErrors.labels(region, err.message).inc();

  console.error("campaign.delivery.failed", {
    region,
    error_message: err.message,
    stack: err.stack,
  });
}
