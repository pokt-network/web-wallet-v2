import { z } from "zod";

const schema = z.object({
  RPC_URL: z.string().url(),
  EXPLORER_URL: z.string().url().optional(),
  POKT_PRICE_API_URL: z.string().url().optional(),
});

export const env = schema.parse({
  RPC_URL: import.meta.env["VITE_RPC_URL"],
  EXPLORER_URL: import.meta.env["VITE_EXPLORER_URL"],
  POKT_PRICE_API_URL: import.meta.env["VITE_POKT_PRICE_API_URL"],
});
