"use client";
export const dynamic = "force-dynamic";

import PedidosContent from "@/components/PedidosContent";
import { usePedidoContext } from "@/providers/contexts/PedidoContext";
import { Suspense, useEffect } from "react";

export default function Pedidos() {
  const { pedidos, setPedidos } = usePedidoContext();

  useEffect(() => {
    const data = async () => {
      const response = await fetch("http://localhost:8080/pedidos", {
        next: {
          revalidate: 5,
        },
      });
      const data = await response.json();
      setPedidos(data);
    };

    data();
  }, [setPedidos]);

  return (
    <>
      <Suspense>
        <PedidosContent pedidos={pedidos} />
      </Suspense>
    </>
  );
}
