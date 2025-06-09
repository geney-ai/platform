import { createLogger, Logger, Environment } from "@repo/observability";

import { config } from "@/config";

export const logger: Logger = createLogger({
  serviceName: "api",
  serviceVersion: "0.1.0",
  serviceEnvironment: config.server.env as Environment,
  level: config.log.level,
});
