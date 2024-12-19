"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

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
    <SessionProvider {...props}>{children}</SessionProvider>
  );
};

export default Providers;
