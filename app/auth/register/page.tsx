"use client";

import { useAuthStore } from "@/app/store/auth";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import FormInput from "@/components/ui/custom/form-input";
import { validators } from "@/app/helpers/validators";
import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
import { Button } from "@/components/ui/custom/button";
import { errorToast, renderServerErrors } from "@/components/ui/custom/toast";
import Link from "next/link";
import FormSelect from "@/components/ui/custom/form-select";

export default function Register() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  const form = useForm({
    defaultValues: {
      name: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      type: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await register({
          email: value.email,
          password: value.password,
          name: value.name,
          first_name: value.first_name,
          last_name: value.last_name,
          type: value.type as "buyer" | "seller",
        });
        router.push("/auth/activate/");
      } catch (error: _TSFixMe) {
        const serverErrors =
          error?.response?.data?.errors || error?.errors || error?.message;

        renderServerErrors("Login failed", serverErrors);
      }
    },
  });

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center mb-6">
        <Image src={Logo} alt="Logo" className="mb-2" />
        <p>Let's get you started!</p>
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
          name="name"
          label="Account Name"
          placeholder="Chhose an acount name"
          validators={validators.required("Account Name")}
        />

        <FormInput
          form={form}
          name="first_name"
          label="First Name"
          placeholder="Enter your first name"
          validators={validators.required("First Name")}
        />

        <FormInput
          form={form}
          name="last_name"
          label="Last Name"
          placeholder="Enter your last name"
          validators={validators.required("Last Name")}
        />

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

        <FormSelect
          form={form}
          name="type"
          label="Account Type"
          placeholder="Specify account type"
          validators={validators.required("Account Type")}
          options={[
            { label: "Buyer", value: "buyer" },
            { label: "Seller", value: "seller" },
          ]}
        />

        <Button label="Register" isLoading={isLoading} />
      </form>

      <Link href="/auth/login">
        <p className="text-center mt-4">
          ALready registered?{" "}
          <span className="underline font-semibold">login</span>
        </p>
      </Link>
    </section>
  );
}
