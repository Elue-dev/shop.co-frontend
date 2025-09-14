"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "./store/auth";

export default function Home() {
  const { logout } = useAuthStore();
  const router = useRouter();
  return (
    <>
      <p>Hello</p>
      <button
        onClick={() =>
          logout(() => {
            router.push("/auth/login");
          })
        }
      >
        Logout
      </button>
    </>
  );
}
