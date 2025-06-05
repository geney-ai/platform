import LokiTransport from "winston-loki";
import Transport from "winston-transport";

interface LokiConfig {
  url: string;
  username?: string;
  password?: string;
  labels: Record<string, string>;
}

export function lokiTransport(config: LokiConfig): Transport {
  const { url, username, password, labels } = config;

  return new LokiTransport({
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
}
