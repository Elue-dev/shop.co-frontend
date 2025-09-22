"use client";

import AuthImage from "@/app/assets/auth-image.png";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 bg-gray-100  items-center justify-center">
        <Image
          src={AuthImage}
          alt="Auth Illustration"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="w-[100%] md:w-1/2 flex items-center justify-center p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
