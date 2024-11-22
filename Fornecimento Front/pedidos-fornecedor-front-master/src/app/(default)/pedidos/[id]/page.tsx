"use client";

import EditPedido from "@/components/EditPedido";
import { usePedidoContext } from "@/providers/contexts/PedidoContext";
import { useParams } from "next/navigation";

export default function Pedido() {
  const { id } = useParams();

  const { pedidos } = usePedidoContext();

  const pedido = pedidos.find((p) => p.id === Number(id));

  return pedido ? (
    <EditPedido pedido={pedido} />
  ) : (
    <div>Pedido não encontrado</div>
  );
}
