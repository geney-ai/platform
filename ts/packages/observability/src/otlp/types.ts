import { BaseObservabilityConfig } from "@/base-types";

export { NodeSDK as OtlpSDK } from "@opentelemetry/sdk-node";

// TODO (pr-draft): tail end sampling
export interface OtlpSDKConfig extends BaseObservabilityConfig {
  otlp?: {
    url: string;
    username?: string;
    password?: string;
    timeout?: number;
  };
}
