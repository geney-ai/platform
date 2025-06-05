import { NodeSDK } from "@opentelemetry/sdk-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
  SEMRESATTRS_DEPLOYMENT_ENVIRONMENT,
} from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import {
  SimpleSpanProcessor,
  BatchSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-base";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import type { SpanExporter } from "@opentelemetry/sdk-trace-base";

import type { OtelConfig } from "./types";

export * from "./types";

const MODULE_NAME = "OtelSDK";

const DEFAULT_TIMEOUT = 30000;
const DEFAULT_HONEYCOMB_ENDPOINT = "https://api.honeycomb.io/v1/traces";

export class Otel {
  private sdk: NodeSDK;
  private initialized = false;

  constructor(config: OtelConfig) {
    this.sdk = createOtelSDK(config);
  }

  public start(): void {
    if (this.initialized) {
      console.warn(`[${MODULE_NAME}] already initialized`);
      return;
    }

    try {
      this.sdk.start();
      this.initialized = true;
    } catch (error) {
      console.error(`[${MODULE_NAME}] Failed to initialize:`, error);
      throw error;
    }
  }

  public async shutdown(): Promise<void> {
    if (!this.initialized) return;

    try {
      // await this.sdk.shutdown();
      this.initialized = false;
      console.log(`[${MODULE_NAME}] shutdown complete`);
    } catch (error) {
      console.error(`[${MODULE_NAME}] Error during shutdown:`, error);
    }
  }

  public isInitialized(): boolean {
    return this.initialized;
  }
}

export function createOtelSDK(config: OtelConfig): NodeSDK {
  try {
    const exporters: SpanExporter[] = [];
    const spanProcessors: any[] = [];

    // Add Tempo exporter if configured
    if (config.tempo) {
      const tempoExporter = new OTLPTraceExporter({
        url: config.tempo.endpoint,
        headers:
          config.tempo.username && config.tempo.password
            ? {
                Authorization: `Basic ${Buffer.from(`${config.tempo.username}:${config.tempo.password}`).toString("base64")}`,
              }
            : {},
        timeoutMillis: config.tempo.timeout || DEFAULT_TIMEOUT,
      });
      exporters.push(tempoExporter);
      spanProcessors.push(new BatchSpanProcessor(tempoExporter));
      console.log(
        `[${MODULE_NAME}] Configured Tempo exporter: ${config.tempo.endpoint}`,
      );
    }

    // Create resource with service information
    const resource = resourceFromAttributes({
      [ATTR_SERVICE_NAME]: config.serviceName,
      [ATTR_SERVICE_VERSION]: config.serviceVersion || "unknown",
      [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: config.serviceEnvironment,
      ...config.resourceAttributes,
    });

    // Configure instrumentations
    const instrumentations = [
      // TODO (pr-draft): investigate what is needed here
      getNodeAutoInstrumentations({}),
    ];

    // Create and configure the SDK with multiple span processors
    const sdk = new NodeSDK({
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
