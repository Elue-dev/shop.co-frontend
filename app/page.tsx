"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "./store/auth";

import { renderServerErrors, successToast } from "@/components/ui/custom/toast";

export default function Home() {
  const { logout, requestActivation, account, isLoading } = useAuthStore();
  const router = useRouter();

  console.log({ account });

  async function requestActivationEmail() {
    try {
      await requestActivation(account?.id ?? "");
      successToast({
        title: "Success",
        description: "Activation email sent",
      });
      router.push("/auth/activate");
    } catch (error: _TSFixMe) {
      const serverErrors = error?.errors || error?.message || error.error;
      renderServerErrors("Something went wrong", serverErrors);
    }
  }

  return (
    <>
      <p>Hello</p>
      {isLoading ? (
        <p>Sending email.....</p>
      ) : (
        <div onClick={requestActivationEmail}>
          {account?.status !== "active" && (
            <p>Account is not active. Actiave now!</p>
          )}
        </div>
      )}
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
