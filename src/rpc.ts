import { z } from "zod";
import { safeAsyncExecutor } from "./utils/result";

const RPC_URL = "https://rpc.testnet.pokt.network/lb/6d6f727365";

/**
 * The available routes for the RPC.
 */
enum Routes {
  QueryBalance = "/v1/query/balance",
}

/**
 * Fetches the balance of the provided address.
 * @param {string} address - The address to fetch the balance of.
 * @returns {Promise<number>} - The balance.
 * */
async function getBalance(address: string): Promise<number> {
  const response = await fetchRPC(RPC_URL + Routes.QueryBalance, { address });
  return getBalanceResponse.parse(response).balance;
}

const getBalanceResponse = z.object({
  balance: z.number(),
});

/**
 * Fetches the provided RPC URL with the provided body.
 * @param {string} url - The URL to fetch.
 * @param {Record<string, unknown>} body - The body to send.
 * @returns {Promise<unknown>} - The response.
 * */
async function fetchRPC(url: string, body: Record<string, unknown>): Promise<unknown> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${body}`);
  }

  return response.json();
}

export const provider = {
  getBalance: safeAsyncExecutor(getBalance),
};
