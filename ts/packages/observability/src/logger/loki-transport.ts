import winston from "winston";
import LokiTransport from "winston-loki";
import Transport from "winston-transport";

interface LokiConfig {
  url: string;
  username?: string;
  password?: string;
  labels: Record<string, string>;
  format: winston.Logform.Format;
}

export function lokiTransport(config: LokiConfig): Transport {
  const { url, username, password, labels } = config;

  const lokiTransport = new LokiTransport({
    host: url,
    basicAuth: username && password ? `${username}:${password}` : undefined,
    labels,
    json: true,
    batching: true,
    interval: 5,
    replaceTimestamp: true,
    onConnectionError: (err: any) => {
      console.error("[Loki Transport] Connection error:", err);
    },
  });

  lokiTransport.format = config.format;

  return lokiTransport;
}
