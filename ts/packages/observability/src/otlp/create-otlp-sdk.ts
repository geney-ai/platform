import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
  SEMRESATTRS_DEPLOYMENT_ENVIRONMENT,
} from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import type { SpanExporter } from "@opentelemetry/sdk-trace-base";

import type { OtlpSDKConfig } from "./types";
import { OtlpSDK } from "./types";

const MODULE_NAME = "Otel SDK";

const DEFAULT_TIMEOUT = 30000;

export function createOtlpSDK(config: OtlpSDKConfig): OtlpSDK {
  try {
    const exporters: SpanExporter[] = [];
    const spanProcessors: any[] = [];
    // Add otlp exporter if configured
    if (config.otlp) {
      const headers =
        config.otlp.username && config.otlp.password
          ? {
              Authorization: `Basic ${Buffer.from(`${config.otlp.username}:${config.otlp.password}`).toString("base64")}`,
            }
          : undefined;
      const otlpExporter = new OTLPTraceExporter({
        url: `${config.otlp.url}/v1/traces`,
        headers,
        timeoutMillis: config.otlp.timeout || DEFAULT_TIMEOUT,
      });
      exporters.push(otlpExporter);
      spanProcessors.push(new BatchSpanProcessor(otlpExporter));
      console.log(
        `[${MODULE_NAME}] Configured otlp exporter: ${config.otlp.url}`,
      );
    }

    const resource = resourceFromAttributes({
      [ATTR_SERVICE_NAME]: config.serviceName,
      [ATTR_SERVICE_VERSION]: config.serviceVersion,
      [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: config.serviceEnvironment,
      ...config.resourceAttributes,
    });

    const instrumentations = [
      getNodeAutoInstrumentations({
        "@opentelemetry/instrumentation-http": { enabled: true },
        "@opentelemetry/instrumentation-net": { enabled: true },
        "@opentelemetry/instrumentation-express": { enabled: true },
        // TODO (amiller68): for some reason this is not working.
        //  In the meantime, we're just manually instrumenting winston.
        //  See ./logger/create-logger.ts + ./logger/loki-transport.ts
        //  for more details.
        // "@opentelemetry/instrumentation-winston": { enabled: true },
      }),
    ];

    // Create and configure the SDK with multiple span processors
    const sdk = new OtlpSDK({
      resource,
      spanProcessors, // Use the array of span processors
      instrumentations,
    });

    return sdk;
  } catch (error) {
    console.error(`[${MODULE_NAME}] Failed to create SDK:`, error);
    throw error;
  }
}
