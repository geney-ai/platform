export enum Environment {
  TEST = "test",
  DEVELOPMENT = "development",
  STAGING = "staging",
  PRODUCTION = "production",
}

export enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  HTTP = "http",
  VERBOSE = "verbose",
  DEBUG = "debug",
}

export interface BaseObservabilityConfig {
  serviceName: string;
  serviceVersion: string;
  serviceEnvironment: Environment;
  resourceAttributes?: Record<string, any>;
}
