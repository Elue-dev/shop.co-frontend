"use client";

import { createContext, PropsWithChildren, useContext } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const TanstackContext = createContext<_TSFixMe>({} as _TSFixMe);

export function useTanstackContext() {
  return useContext(TanstackContext);
}

export function TanstackProvider({ children }: PropsWithChildren) {
  const values: _TSFixMe = {};

  return (
    <TanstackContext.Provider value={values}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TanstackContext.Provider>
  );
}
