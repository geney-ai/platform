import { Request, Response } from "express";

import { HttpMethod } from "./types";
import { getAllowedHeaders } from "./headers";

/**
 * Standard CORS headers for public API routes
 */
export const PUBLIC_API_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": getAllowedHeaders(),
};

/**
 * Handler for OPTIONS requests to enable CORS
 * Use this for the OPTIONS export in your route handler
 */
export function buildCorsOptions(
  methods: HttpMethod[],
): (req: Request, res: Response) => Promise<void> {
  return async (_req: Request, res: Response) => {
    res.status(204).json({
      status: 204,
      headers: {
        ...PUBLIC_API_CORS_HEADERS,
        "Access-Control-Allow-Methods": methods.join(", "),
      },
    });
  };
}
