import { Logger, LoggingConfig, createLogger } from "./logger";
import { Otel, OtelConfig } from "./otel";

import { BaseObservabilityConfig, ServiceEnvironment } from "./types";

export type { ServiceEnvironment, Logger };
export { Otel };

interface ObservabilityConfig extends BaseObservabilityConfig {
  logging: Omit<LoggingConfig, keyof BaseObservabilityConfig>;
  otel?: Omit<OtelConfig, keyof BaseObservabilityConfig>;
}

export function initializeObservability({
  serviceName,
  serviceVersion,
  serviceEnvironment,
  resourceAttributes,
  logging,
  otel,
}: ObservabilityConfig): { logger: Logger; otel: Otel } {
  const logger = createLogger({
    ...logging,
    serviceName,
    serviceVersion,
    serviceEnvironment,
    resourceAttributes,
  });

  const _otel = new Otel({
    ...otel,
    serviceName,
    serviceVersion,
    serviceEnvironment,
    resourceAttributes,
  });

  return { logger, otel: _otel };
}
