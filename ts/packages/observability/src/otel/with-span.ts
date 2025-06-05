import { trace, context, SpanStatusCode, SpanKind } from "@opentelemetry/api";

export function createTracer(serviceName: string) {
  return trace.getTracer(serviceName);
}

export function getCurrentSpan() {
  return trace.getActiveSpan();
}

export function withSpan<TArgs, TResult>(
  tracerName: string,
  spanName: string,
  fn: (args: TArgs) => Promise<TResult> | TResult,
  args: TArgs,
  options?: {
    kind?: SpanKind;
    attributes?: Record<string, string | number | boolean>;
  },
): Promise<TResult> {
  const tracer = createTracer(tracerName);

  return new Promise((resolve, reject) => {
    const span = tracer.startSpan(spanName, {
      kind: options?.kind || SpanKind.INTERNAL,
      attributes: options?.attributes,
    });

    context.with(trace.setSpan(context.active(), span), async () => {
      try {
        const result = await fn(args);
        span.setStatus({ code: SpanStatusCode.OK });
        resolve(result);
      } catch (error) {
        span.recordException(error as Error);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: (error as Error).message,
        });
        reject(error);
      } finally {
        span.end();
      }
    });
  });
}
