"use client";

import { PedidoProvider } from "@/providers/contexts/PedidoContext";

export default function PedidosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PedidoProvider>{children}</PedidoProvider>;
}
