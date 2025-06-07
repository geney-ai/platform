import winston from "winston";
import type { LoggingConfig } from "./types";
import { lokiTransport } from "./loki-transport";
import { isBrowser, prettyFormat, traceFormat } from "./utils";
import { Environment, LogLevel } from "@/base-types";

const { combine, timestamp, colorize, errors, json } = winston.format;

export function createLogger(config: LoggingConfig): winston.Logger {
  const transports: winston.transport[] = [];

  const defaultMeta = {
    service: config.serviceName,
    environment: config.serviceEnvironment,
    version: config.serviceVersion,
    ...config.resourceAttributes,
  };

  const configFormat =
    config.format ??
    (config.serviceEnvironment === Environment.PRODUCTION ? "json" : "pretty");

  const baseFormats = [
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
  ];

  if (config.instrument) {
    baseFormats.push(traceFormat());
  }

  const consoleFormat = [...baseFormats];

  if (configFormat === "pretty") {
    consoleFormat.push(colorize());
    consoleFormat.push(prettyFormat);
  } else if (configFormat === "json") {
    consoleFormat.push(json());
  }

  // TODO (amiller68): disable on staging/production
  transports.push(
    new winston.transports.Console({
      format: combine(...consoleFormat),
    }),
  );

  // Add available transports if not in browser
  if (!isBrowser) {
    // Loki transport - needs its own format with trace context
    if (config.loki?.url) {
      const lokiFormat = [...baseFormats];
      lokiFormat.push(json());
      const lokiTransportInstance = lokiTransport({
        format: combine(...lokiFormat),
        url: config.loki.url,
        username: config.loki.username,
        password: config.loki.password,
        labels: {
          // We attach the default meta here s.t.
          //  they are indexed by loki and queryable
          ...defaultMeta,
        },
      });

      transports.push(lokiTransportInstance);
    }
  }

  // Create logger
  const logger = winston.createLogger({
    level: config.level || LogLevel.INFO,
    defaultMeta,
    transports,
  });

  return logger;
}
