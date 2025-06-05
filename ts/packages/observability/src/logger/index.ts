import winston from "winston";
import type { LoggingConfig } from "./types";
import { lokiTransport } from "./loki-transport";
import { isBrowser, prettyFormat } from "./utils";

export * from "./types";

const { combine, timestamp, json, colorize, errors } = winston.format;

export function createLogger(config: LoggingConfig): winston.Logger {
  const transports: winston.transport[] = [];

  const defaultMeta = {
    service: config.serviceName,
    environment: config.serviceEnvironment || "unknown",
    version: config.serviceVersion || "unknown",
    ...config.resourceAttributes,
  };

  // TODO (amiller68): disable on staging/production
  // Console transport (always enabled)
  transports.push(
    new winston.transports.Console({
      format:
        config.format === "pretty"
          ? combine(
              colorize(),
              timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
              errors({ stack: true }),
              prettyFormat,
            )
          : combine(timestamp(), errors({ stack: true }), json()),
    }),
  );

  // Add available transports if not in browser
  if (!isBrowser) {
    // Loki transport
    if (config.loki?.url) {
      transports.push(
        lokiTransport({
          url: config.loki.url,
          username: config.loki.username,
          password: config.loki.password,
          labels: {
            // We attach the default meta here s.t.
            //  they are indexed by loki and queryable
            ...defaultMeta,
          },
        }),
      );
    }
  }

  // Create logger
  const logger = winston.createLogger({
    level: config.level || "info",
    defaultMeta,
    transports,
  });

  return logger;
}
