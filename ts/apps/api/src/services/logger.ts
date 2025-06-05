import {
  initializeObservability,
  Logger,
  ServiceEnvironment,
} from "@repo/observability";

import { config } from "@/config";

export const { logger }: { logger: Logger } = initializeObservability({
  serviceName: "api",
  serviceVersion: "0.1.0",
  serviceEnvironment: config.server.env as ServiceEnvironment,
  logging: { level: config.log.level },
});
