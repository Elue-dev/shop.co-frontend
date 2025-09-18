"use client";

import { Loader, MessageSquareMore } from "lucide-react";
import AppCard from "../components/ui/custom/app-card";
import { Button } from "../components/ui/custom/button";
import { LargeTitle } from "../components/ui/custom/large-title";
import { AccountsService } from "../services/api/account-service";
import SellersSkeleton from "../components/loaders/sellers-skeleton";
import { ChatService } from "../services/api/chat-service";
import { useRouter } from "next/navigation";
import AppAvatar from "../components/ui/custom/app-avatar";
import { useChatStore } from "../store/chat";
import { Fragment, useState } from "react";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../helpers/constants";

export default function Sellers() {
  const router = useRouter();
  const { setSelectedChat } = useChatStore();
  const { data: sellers, isLoading } = AccountsService.listSellers();
  const { mutate: startChat, isPending } = ChatService.createChat();
  const [loadingSellerId, setLoadingSellerId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  function createChat(userId: string) {
    setLoadingSellerId(userId);
    startChat(userId, {
      onSuccess: function (data) {
        queryClient.invalidateQueries([
          QUERY_KEYS.CHATS,
        ] as InvalidateQueryFilters);
        setSelectedChat(data);
        router.push("/chats");
      },
      onError: function (error: _TSFixMe) {
        console.error("Error starting chat:", error);
      },
      onSettled: function () {
        setLoadingSellerId(null);
      },
    });
  }

  return (
    <section className="app-container mt-18">
      <LargeTitle text="Sellers Catalogue" centered />

      {isLoading ? (
        <SellersSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
          {sellers?.map((seller) => {
            const isSellerLoading =
              isPending && loadingSellerId === seller.user.id;

            return (
              <AppCard key={seller.id}>
                <div className="flex flex-col items-center justify-center">
                  <AppAvatar name={seller.name} />
                  <p className="text-[18px] font-medium mt-3">{seller.name}</p>
                  <p className="text-grayish">{seller.user.email}</p>

                  <Button
                    onClick={() => createChat(seller.user.id)}
                    isLoading={isSellerLoading}
                    disabled={isPending}
                    classNames="mt-4"
                    auto
                  >
                    <Fragment>
                      <MessageSquareMore />
                      <span>Chat with seller</span>
                    </Fragment>
                  </Button>
                </div>
              </AppCard>
            );
          })}
        </div>
      )}
    </section>
  );
}
