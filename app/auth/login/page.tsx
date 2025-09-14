"use client";

import { useAuthStore } from "@/app/store/auth";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import FormInput from "@/components/ui/custom/form-input";
import { validators } from "@/app/helpers/validators";
import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
import { Button } from "@/components/ui/custom/button";
import { errorToast } from "@/components/ui/custom/toast";

export default function Login() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await login(value.email, value.password);
        router.push("/");
      } catch (error: _TSFixMe) {
        errorToast({
          description: error.message,
          position: "top-right",
        });
      }
    },
  });

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center mb-6">
        <Image src={Logo} alt="Logo" className="mb-2" />
        <p>Let's get you logged in!</p>
      </div>

      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FormInput
          form={form}
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          validators={validators.email}
        />

        <FormInput
          form={form}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          validators={validators.password}
        />

        <Button label="Login" isLoading={isLoading} />
      </form>
    </section>
  );
}
