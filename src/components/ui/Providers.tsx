"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider, ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      <SessionProvider>{children}</SessionProvider>;
    </ThemeProvider>
  );
};

export default Providers;
