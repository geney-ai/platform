import { BaseObservabilityConfig } from "@/types";

// TODO (pr-draft): tail end sampling
export interface OtelConfig extends BaseObservabilityConfig {
  tempo?: {
    endpoint: string;
    username?: string;
    password?: string;
    timeout?: number;
  };
}
