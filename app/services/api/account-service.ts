import { useQuery, UseQueryResult } from "@tanstack/react-query";
import client from "../client";
import { QUERY_KEYS } from "@/app/helpers/constants";
import { Account } from "@/app/types/auth";

export const AccountsService = {
  listSellers: function (): UseQueryResult<Account[]> {
    return useQuery<Account[]>({
      queryKey: [QUERY_KEYS.ACCOUNTS, "sellers"],
      queryFn: async function () {
        const response = await client.get("/accounts/sellers");
        return response.data;
      },
    });
  },
};
