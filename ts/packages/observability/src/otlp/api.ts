/**
 * Re-exports + type definitions for OpenTelemetry API
 */

export type { Span, Tracer, Attributes, Context } from "@opentelemetry/api";
export {
  SpanStatusCode,
  trace,
  context,
  propagation,
  SpanKind,
} from "@opentelemetry/api";
