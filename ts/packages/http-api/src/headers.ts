/**
 * Standard header names used across API routes
 */
export const HEADERS = {
  AUTHORIZATION: "authorization",
  ORIGIN: "origin",
  X_FORWARDED_FOR: "x-forwarded-for",
  X_REAL_IP: "x-real-ip",
  X_QUOTIENT_DEVICE_ID: "x-quotient-device-id",
  X_QUOTIENT_BROWSER_FINGERPRINT: "x-quotient-browser-fingerprint",
  X_QUOTIENT_SESSION_ID: "x-quotient-session-id",
  X_QUOTIENT_PERSON_ID: "x-quotient-person-id",
} as const;

export type ApiHeaders = typeof HEADERS;
export type ApiHeaderKey = keyof ApiHeaders;
export type ApiHeaderValue = ApiHeaders[ApiHeaderKey];

/**
 * Generates a list of allowed headers for CORS, including all Quotient custom headers
 */
export function getAllowedHeaders(): string {
  const standardHeaders = ["Content-Type", "Authorization"];

  // Get all Quotient custom headers from HEADERS constant
  const quotientHeaders = Object.values(HEADERS).filter((header) =>
    header.toLowerCase().startsWith("x-quotient-"),
  );

  return [...standardHeaders, ...quotientHeaders].join(", ");
}
