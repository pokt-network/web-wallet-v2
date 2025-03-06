import { z } from "zod";
import { env } from "./env";

/**
 * The available routes for the RPC.
 */
enum Routes {
  QueryBalance = "/v1/query/balance",
  QueryAccountTxs = "/v1/query/accounttxs",
}

/**
 * Fetches the balance of the provided address.
 * @param {string} address - The address to fetch the balance of.
 * @returns {Promise<bigint>} - The balance (in uPOKT).
 * */
async function getBalance(address: string): Promise<bigint> {
  const response = await fetchRPC(env.RPC_URL + Routes.QueryBalance, { address });
  return getBalanceResponse.parse(response).balance;
}

const getBalanceResponse = z.object({
  balance: z.coerce.string().transform(BigInt),
});

/**
 * Fetches the transactions of the provided address.
 * @param {string} address - The address to fetch the transactions of.
 * @returns {Promise<unknown>} - The transactions.
 * */
async function getTransactions(data: GetTransactionsRequest): Promise<GetTransactionsResponse> {
  const response = await fetchRPC(env.RPC_URL + Routes.QueryAccountTxs, data);
  return getTransactionsResponse.parse(response);
}

const STDMessageType = {
  MsgUnjail: "pos/MsgUnjail",
  MsgUnjail8: "pos/8.0MsgUnjail",
  MsgBeginUnstake: "pos/MsgBeginUnstake",
  MsgBeginUnstake8: "pos/8.0MsgBeginUnstakes",
  MsgStake: "pos/MsgStake",
  MsgStake8: "pos/8.0MsgStake",
  Send: "pos/Send",
} as const;

const transaction = z.object({
  index: z.number(),
  height: z.number(),
  hash: z.string(),
  tx: z.string(),
  stdTx: z.object({
    msg: z.discriminatedUnion("type", [
      z.object({
        type: z.literal(STDMessageType.MsgUnjail),
        value: z.object({
          address: z.string(),
          signer_address: z.string(),
        }),
      }),
      z.object({
        type: z.literal(STDMessageType.MsgUnjail8),
        value: z.object({
          address: z.string(),
          signer_address: z.string(),
        }),
      }),
      z.object({
        type: z.literal(STDMessageType.MsgBeginUnstake),
        value: z.object({
          validator_address: z.string(),
          signer_address: z.string(),
        }),
      }),
      z.object({
        type: z.literal(STDMessageType.MsgBeginUnstake8),
        value: z.object({
          validator_address: z.string(),
          signer_address: z.string(),
        }),
      }),
      z.object({
        type: z.literal(STDMessageType.MsgStake),
        value: z.object({
          value: z.string(),
          service_url: z.string(),
          output_address: z.string(),
        }),
      }),
      z.object({
        type: z.literal(STDMessageType.MsgStake8),
        value: z.object({
          value: z.string(),
          service_url: z.string(),
          output_address: z.string(),
        }),
      }),
      z.object({
        type: z.literal(STDMessageType.Send),
        value: z.object({
          from_address: z.string(),
          to_address: z.string(),
          amount: z.string().transform(BigInt),
        }),
      }),
    ]),
  }),
});

export type Transaction = z.infer<typeof transaction>;

type GetTransactionsRequest = {
  address: string;
  page: number;
  received: boolean;
  per_page: number;
  order: "asc" | "desc";
};

const getTransactionsResponse = z.object({
  total_txs: z.number(),
  txs: z.array(transaction),
});

export type GetTransactionsResponse = z.infer<typeof getTransactionsResponse>;

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
  getBalance,
  getTransactions,
};
