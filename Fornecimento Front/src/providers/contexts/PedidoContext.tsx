import { Pedido } from "@/types/Pedido";
import { createContext, useContext, useState } from "react";

interface PedidoContextProps {
  pedidos: Pedido[];
  setPedidos: (pedidos: Pedido[]) => void;
}

export const PedidoContext = createContext<PedidoContextProps>({
  pedidos: [],
  setPedidos: () => {},
});

export const usePedidoContext = () => {
  return useContext(PedidoContext);
};

export const PedidoProvider = ({ children }: { children: React.ReactNode }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  return (
    <PedidoContext.Provider value={{ pedidos, setPedidos }}>
      {children}
    </PedidoContext.Provider>
  );
};
