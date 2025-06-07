export type { Logger } from "winston";

import { BaseObservabilityConfig } from "@/base-types";

export interface LoggingConfig extends BaseObservabilityConfig {
  level?: string;
  format?: "json" | "pretty";
  instrument?: boolean;

  // Logtail configuration
  logtail?: {
    sourceToken: string;
  };

  // Grafana Loki configuration
  loki?: {
    url: string;
    username?: string;
    password?: string;
  };
}
