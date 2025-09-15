import type { Metadata } from "next";

import "./globals.css";

import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/auth-provider";

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
        <AuthProvider>
          <Toaster richColors />
          {/*<ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >*/}
          {children}
          {/*</ThemeProvider>*/}
        </AuthProvider>
      </body>
    </html>
  );
}
