"use client";

import { usePedidoContext } from "@/providers/contexts/PedidoContext";
import { Pedido } from "@/types/Pedido";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Table,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import Link from "next/link";

interface PedidoTableItemProps {
  pedido: Pedido;
}

const ModalVerItens = ({
  pedido,
  opened,
  onClose,
}: {
  pedido: Pedido;
  opened: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Itens do Pedido ${pedido.id}`}
    >
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Nome</Table.Th>
            <Table.Th>Quantidade</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {pedido.itemPedido.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>{item.id}</Table.Td>
              <Table.Td>{item.nome}</Table.Td>
              <Table.Td>{item.quantidade}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Modal>
  );
};

const ModalDeletar = ({
  pedido,
  opened,
  onClose,
}: {
  pedido: Pedido;
  opened: boolean;
  onClose: () => void;
}) => {
  const { pedidos, setPedidos } = usePedidoContext();

  const deletarPedido = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/pedidos/${pedido.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        showNotification({
          title: "Sucesso",
          message: "Pedido deletado com sucesso",
          color: "green",
        });
        onClose();
        setPedidos(pedidos.filter((p) => p.id !== pedido.id));
      } else {
        showNotification({
          title: "Erro",
          message: "Erro ao deletar pedido",
          color: "red",
        });
      }
    } catch (error) {
      console.error(error);
      showNotification({
        title: "Erro",
        message: "Erro ao deletar pedido",
        color: "red",
      });
    }
  };
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Deseja realmente deletar o pedido ${pedido.id}?`}
    >
      <Group my="md">
        <Button color="red" onClick={deletarPedido}>
          Sim
        </Button>
        <Button onClick={onClose}>Não</Button>
      </Group>
    </Modal>
  );
};

export function PedidoTableItem({ pedido }: PedidoTableItemProps) {
  const [modalVerItens, { toggle: toggleVerItens }] = useDisclosure(false);
  const [modalDeletar, { toggle: toggleDeletar }] = useDisclosure(false);
  return (
    <>
      <Table.Tr>
        <Table.Td>{pedido.id}</Table.Td>
        <Table.Td>{pedido.fornecedor}</Table.Td>
        <Table.Td>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(pedido.valorTotal)}
        </Table.Td>
        {/* TODO: remover o underline do status */}
        <Table.Td>{pedido.statusPedido.replace("_", " ")}</Table.Td>
        <Table.Td>{pedido.dataHoraPedido}</Table.Td>
        <Table.Td>
          <Tooltip label="Ver">
            <ActionIcon variant="subtle" size="sm" onClick={toggleVerItens}>
              <IconEye size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Editar">
            <ActionIcon
              variant="subtle"
              size="sm"
              component={Link}
              href={`/pedidos/${pedido.id}`}
            >
              <IconEdit size={16} color="blue" />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Deletar">
            <ActionIcon variant="subtle" size="sm" onClick={toggleDeletar}>
              <IconTrash size={16} color="red" />
            </ActionIcon>
          </Tooltip>
        </Table.Td>
      </Table.Tr>
      <ModalVerItens
        pedido={pedido}
        opened={modalVerItens}
        onClose={toggleVerItens}
      />
      <ModalDeletar
        pedido={pedido}
        opened={modalDeletar}
        onClose={toggleDeletar}
      />
    </>
  );
}
