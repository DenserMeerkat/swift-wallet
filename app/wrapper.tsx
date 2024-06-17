"use client";
import { AppContextProvider } from "@/components/context/app-context";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "next-themes";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <AppContextProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Header />
        {children}
        <Footer />
      </ThemeProvider>
    </AppContextProvider>
  );
}
