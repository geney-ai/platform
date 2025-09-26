import "server-only";
import { QuotientServer } from "@quotientjs/server";

const QUOTIENT_PRIVATE_API_KEY = process.env.QUOTIENT_PRIVATE_API_KEY;

if (!QUOTIENT_PRIVATE_API_KEY) {
  console.warn(
    "QUOTIENT_PRIVATE_API_KEY is not set - using placeholder for build",
  );
}

export const quotientClient = new QuotientServer({
  privateKey: QUOTIENT_PRIVATE_API_KEY || "placeholder-for-build",
  baseUrl: "https://www.getquotient.ai",
});
