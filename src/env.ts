import { z } from "zod";

const schema = z.object({
  RPC_URL: z.string().url(),
});

export const env = schema.parse({
  RPC_URL: import.meta.env["VITE_RPC_URL"],
});
