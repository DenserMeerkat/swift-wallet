import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import Wrapper from "./wrapper";
import { Toaster } from "@/components/ui/sonner";

const inter = Kanit({ weight: "400", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "SwiftWallet",
  description: "A simple wallet app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wrapper>{children}</Wrapper>
        <Toaster richColors closeButton toastOptions={{}} />
      </body>
    </html>
  );
}
