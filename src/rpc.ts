import { env } from "./env";
import { IndexedTx, StargateClient } from "@cosmjs/stargate";
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx.js";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx.js";

export const client = await StargateClient.connect(env.RPC_URL);

/**
 * Fetches the balance of the provided address.
 * @param {string} address - The address to fetch the balance of.
 * @returns {Promise<bigint>} - The balance (in uPOKT).
 * */
export async function getBalance(address: string): Promise<bigint> {
  const result = await client.getBalance(address, "upokt");
  return BigInt(result.amount);
}

type TransactionType = "send" | "recv";

type Transaction = IndexedTx & {
  fromAddress: string;
  toAddress: string;
  amount: bigint;
};

export type TypedTransaction = Transaction & { type: TransactionType };

export async function getTransactions(address: string): Promise<TypedTransaction[]> {
  const sendTx = await client.searchTx(`message.sender='${address}'`);
  const sendTransactions: TypedTransaction[] = decodeTransactions(sendTx).map((message) => ({
    ...message,
    type: "send",
  }));

  const recvTx = await client.searchTx(`transfer.recipient='${address}'`);
  const recvTransactions: TypedTransaction[] = decodeTransactions(recvTx).map((message) => ({
    ...message,
    type: "recv",
  }));

  const transactions = [...sendTransactions, ...recvTransactions];
  return transactions.sort((a, b) => b.height - a.height);
}

function decodeTransactions(txs: IndexedTx[]): Transaction[] {
  const messages: Transaction[] = [];

  for (const tx of txs) {
    const decodedTx = Tx.decode(tx.tx);

    if (!decodedTx.body) {
      continue;
    }

    for (const message of decodedTx.body.messages) {
      const decodedMessage = MsgSend.decode(message.value);

      let amount;

      for (const coin of decodedMessage.amount) {
        if (coin.denom === "upokt") {
          amount = BigInt(coin.amount);
          break;
        }
      }

      if (!amount) {
        continue;
      }

      messages.push({
        ...tx,
        fromAddress: decodedMessage.fromAddress,
        toAddress: decodedMessage.toAddress,
        amount,
      });
    }
  }

  return messages;
}
