import type { Metadata } from "next";

import "./globals.css";

import { AuthProvider } from "@/components/providers/auth-provider";
import { TanstackProvider } from "@/components/providers/tanstack-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Shop.co",
  description: "E-commerce platform of your dreams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <TanstackProvider>
          <AuthProvider>
            <Toaster richColors />

            {children}
          </AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
