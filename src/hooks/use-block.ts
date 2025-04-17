import { client } from "@/rpc";
import { Block } from "@cosmjs/stargate";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useBlock({ height }: { height: number }): UseQueryResult<Block, Error> {
  return useQuery({
    queryKey: [`block-${height}`],
    queryFn: async () => {
      const block = await client.getBlock(height);
      return block;
    },
  });
}
