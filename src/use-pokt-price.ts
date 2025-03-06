import { z } from "zod";
import { env } from "./env";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function usePOKTPrice(): UseQueryResult<number, Error> {
  return useQuery({
    queryKey: ["price"],
    queryFn: fetchPrice,
  });
}

async function fetchPrice(): Promise<number> {
  const response = await fetch(env.POKT_PRICE_API_URL);
  const json = await response.json();
  return responseSchema.parse(json).price;
}

const responseSchema = z.object({
  price: z.number(),
});
