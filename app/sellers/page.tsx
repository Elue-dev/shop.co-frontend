"use client";

import { MessageSquareMore } from "lucide-react";
import AppCard from "../components/ui/custom/app-card";
import { Button } from "../components/ui/custom/button";
import { LargeTitle } from "../components/ui/custom/large-title";
import { AccountsService } from "../services/api/account-service";
import SellersSkeleton from "../components/loaders/sellers-skeleton";
import { ChatService } from "../services/api/chat-service";
import { useRouter } from "next/navigation";
import AppAvatar from "../components/ui/custom/app-avatar";
import { useChatStore } from "../store/chat";

export default function Sellers() {
  const router = useRouter();
  const { setSelectedChat } = useChatStore();
  const { data: sellers, isLoading } = AccountsService.listSellers();
  const { mutate: startChat, isPending } = ChatService.createChat();

  function createChat(userId: string) {
    startChat(userId, {
      onSuccess: function (data) {
        setSelectedChat(data);
        router.push("/chats");
      },
      onError: function (error: _TSFixMe) {
        console.error("Error starting chat:", error);
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
          {sellers?.map((seller) => (
            <AppCard key={seller.id}>
              <div className="flex flex-col items-center justify-center">
                <AppAvatar name={seller.name} />
                <p className="text-[18px] font-medium mt-3">{seller.name}</p>
                <p className="text-grayish">{seller.user.email}</p>

                <Button
                  onClick={() => createChat(seller.user.id)}
                  isLoading={isPending}
                  classNames="mt-4"
                  auto
                >
                  <div className="flex gap-x-3">
                    <MessageSquareMore />
                    <span>Chat with seller</span>
                  </div>
                </Button>
              </div>
            </AppCard>
          ))}
        </div>
      )}
    </section>
  );
}
