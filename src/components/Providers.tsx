"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Providers = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  return (
    // <NextThemesProvider
    //   attribute={"class"}
    //   defaultTheme="system"
    //   enableSystem
    //   {...props}
    // >
    //   <SessionProvider>{children}</SessionProvider>
    // </NextThemesProvider>
    <QueryClientProvider client={queryClient}>
      <SessionProvider {...props}>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
