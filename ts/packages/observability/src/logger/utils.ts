import { trace } from "@opentelemetry/api";
import winston from "winston";

export * from "./types";

const { printf } = winston.format;

// Pretty print format for development
export const prettyFormat = printf(({ level, message, timestamp, ...rest }) => {
  let output = `${timestamp} [${level}]: ${message}`;

  // Add any additional fields
  const extra = Object.keys(rest).filter(
    (key) => !["service", "environment", "version"].includes(key),
  );
  if (extra.length > 0) {
    output +=
      " " + JSON.stringify(Object.fromEntries(extra.map((k) => [k, rest[k]])));
  }

  return output;
});

export const traceFormat = winston.format((info) => {
  const span = trace.getActiveSpan();
  if (span) {
    const context = span.spanContext();
    info.traceId = context.traceId;
    info.spanId = context.spanId;
    info.traceFlags = context.traceFlags;
  }
  return info;
});

export const isBrowser = typeof window !== "undefined";
