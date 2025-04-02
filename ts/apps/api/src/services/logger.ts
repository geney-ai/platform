import { createLogger, Logger } from "@repo/logger";

import { config } from "@/config";

export const logger: Logger = createLogger({
  level: config.log.level,
});
