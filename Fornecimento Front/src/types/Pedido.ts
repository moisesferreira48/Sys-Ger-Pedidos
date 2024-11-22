export type ItemPedido = {
  id: number;
  nome: string;
  quantidade: number;
};

export type Pedido = {
  id: number;
  fornecedor: string;
  valorTotal: number;
  dataHoraPedido: string;
  statusPedido: string;
  itemPedido: ItemPedido[];
};
