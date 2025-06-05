export type { Logger } from "winston";

import { BaseObservabilityConfig } from "@/types";

export interface LoggingConfig extends BaseObservabilityConfig {
  level?: string;
  format?: "json" | "pretty";

  // Grafana Loki configuration
  loki?: {
    url: string;
    username?: string;
    password?: string;
  };
}

export type LogLevel = "error" | "warn" | "info" | "http" | "verbose" | "debug";
