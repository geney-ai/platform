export type ServiceEnvironment = "development" | "staging" | "production";

export interface BaseObservabilityConfig {
  serviceName: string;
  serviceVersion?: string;
  serviceEnvironment?: ServiceEnvironment;
  resourceAttributes?: Record<string, any>;
}
