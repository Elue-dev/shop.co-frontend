"use client";

import Logo from "@/app/assets/logo.svg";
import { validators } from "@/app/helpers/validators";
import { useAuthStore } from "@/app/store/auth";
import { Button } from "@/app/components/ui/custom/button";
import FormOTP from "@/app/components/ui/custom/form-otp";
import { renderServerErrors } from "@/app/components/ui/custom/toast";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Activate() {
  const { account, activate, isLoading } = useAuthStore();
  const router = useRouter();

  console.log({ account: account });

  const form = useForm({
    defaultValues: {
      otp: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await activate(account?.id ?? "", value.otp);
        router.push("/");
      } catch (error: _TSFixMe) {
        const serverErrors = error?.errors || error?.message || error.error;
        renderServerErrors("Something went wrong", serverErrors);
      }
    },
  });

  return (
    <section className="w-full md:w-auto">
      <div className="flex flex-col items-center justify-center mb-6">
        <Image src={Logo} alt="Logo" className="mb-2" />
        <p>Activate your account</p>
      </div>

      <p className="text-center mb-5">
        To start enjoying Shop.co, enter the OTP sent to your email
      </p>

      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FormOTP
          form={form}
          name="otp"
          validator={validators.minLength(6, "OTP")}
        />

        <Button label="Proceed" isLoading={isLoading} classNames="py-[26px]" />
      </form>
    </section>
  );
}
