import winston from "winston";

const { combine, timestamp } = winston.format;

import { prettyJson } from "./utils";

export type Logger = winston.Logger;

export function createLogger({
  level = "info",
  serviceName = "unknown",
}: {
  level?: "error" | "warn" | "info" | "debug";
  serviceName?: string;
}) {
  // Initialize transports array
  const transports: winston.transport[] = [
    // Console transport with pretty print
    new winston.transports.Console({
      format: combine(
        timestamp({
          format: "YYYY-MM-DD hh:mm:ss.SSS A", // 2022-01-25 03:23:10.350 PM
        }),
        prettyJson,
      ),
    }),
  ];

  return winston.createLogger({
    level,
    transports,
    defaultMeta: {
      serviceName,
    },
  });
}
