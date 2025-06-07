import { trace, context } from "@opentelemetry/api";

import { Span, SpanKind, SpanStatusCode, Tracer } from "./api";

/**
 * Re-exports + wrappers of common OpenTelemetry API functions
 */

// Helper functions for working with traces
export function getTracer(name: string): Tracer {
  return trace.getTracer(name);
}

export function getActiveSpan(): Span | undefined {
  return trace.getActiveSpan();
}

export function startSpan(
  tracer: Tracer,
  name: string,
  options?: {
    kind?: SpanKind;
    attributes?: Record<string, any>;
  },
): Span {
  return tracer.startSpan(name, options, context.active());
}

export function withActiveSpan<T>(span: Span, fn: () => T): T {
  return context.with(trace.setSpan(context.active(), span), fn);
}

export function withSpan<T>(
  tracer: Tracer,
  name: string,
  fn: () => T,
  options?: {
    kind?: SpanKind;
    attributes?: Record<string, any>;
  },
): T {
  const span = startSpan(tracer, name, options);
  return withActiveSpan(span, fn);
}

export async function withAsyncSpan<T>(
  tracer: Tracer,
  name: string,
  fn: () => Promise<T>,
  options?: {
    kind?: SpanKind;
    attributes?: Record<string, any>;
  },
): Promise<T> {
  const span = startSpan(tracer, name, options);

  try {
    const result = await withActiveSpan(span, fn);
    span.setStatus({ code: SpanStatusCode.OK });
    return result;
  } catch (error) {
    span.recordException(error as Error);
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: (error as Error).message,
    });
    throw error;
  } finally {
    span.end();
  }
}

export function addSpanAttributes(attributes: Record<string, any>): void {
  const span = getActiveSpan();
  if (span) {
    span.setAttributes(attributes);
  }
}

export function getTraceContext(): {
  traceId?: string;
  spanId?: string;
  traceFlags?: number;
} {
  const span = getActiveSpan();
  if (span) {
    const ctx = span.spanContext();
    return {
      traceId: ctx.traceId,
      spanId: ctx.spanId,
      traceFlags: ctx.traceFlags,
    };
  }
  return {};
}
