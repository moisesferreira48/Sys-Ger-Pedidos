import { Pedido } from "@/types/Pedido";
import {
    ActionIcon,
    Box,
    Button,
    ComboboxItem,
    Modal,
    NumberInput,
    Select,
    Table,
    TextInput,
    Tooltip,
} from "@mantine/core";

import { Title } from "@mantine/core";

import { usePedidoContext } from "@/providers/contexts/PedidoContext";
import { Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PedidoTableItem } from "./PedidoTableItem";

interface PedidosContentProps {
  pedidos: Pedido[];
}

const ModalNovoPedido = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const form = useForm({
    initialValues: {
      fornecedor: "",
      valorTotal: 0,
      itemPedido: [
        {
          nome: "",
          quantidade: 0,
        },
      ],
    },
  });

  const { setPedidos } = usePedidoContext();

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const response = await fetch("http://localhost:8080/pedidos", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const getPedidos = await fetch("http://localhost:8080/pedidos");
        const pedidosAtualizados = await getPedidos.json();
        setPedidos(pedidosAtualizados);
        onClose();
        showNotification({
          title: "Pedido criado com sucesso",
          message: "O pedido foi criado com sucesso",
          color: "green",
        });

        form.reset();
      } else {
        showNotification({
          title: "Erro ao criar pedido",
          message: "O pedido não foi criado",
          color: "red",
        });
      }
    } catch (error) {
      console.error(error);
      showNotification({
        title: "Erro ao criar pedido",
        message: "O pedido não foi criado",
        color: "red",
      });
    }
  };

  return (
    <Modal title="Novo Pedido" opened={opened} onClose={onClose} size={`lg`}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" gap="md">
          <TextInput label="Fornecedor" {...form.getInputProps("fornecedor")} />
          <NumberInput
            label="Valor Total"
            {...form.getInputProps("valorTotal")}
          />

          {form.values.itemPedido.map((_, index) => (
            <Flex direction="column" align="flex-start" gap="md" key={index}>
              <Flex gap="md" align="flex-end">
                <TextInput
                  label="Nome"
                  {...form.getInputProps(`itemPedido.${index}.nome`)}
                />
                <NumberInput
                  label="Quantidade"
                  {...form.getInputProps(`itemPedido.${index}.quantidade`)}
                />

                <ActionIcon
                  variant="subtle"
                  onClick={() => form.removeListItem("itemPedido", index)}
                >
                  <IconTrash size={16} color="red" />
                </ActionIcon>
              </Flex>
            </Flex>
          ))}

          <Flex justify="center" gap="md">
            <Button type="submit">Criar Pedido</Button>
            <Tooltip label="Adicionar Item">
              <Button
                variant="subtle"
                onClick={() =>
                  form.insertListItem("itemPedido", { nome: "", quantidade: 0 })
                }
              >
                <IconPlus size={16} />
              </Button>
            </Tooltip>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export default function PedidosContent({ pedidos }: PedidosContentProps) {
  const [openedNovoPedidoModal, { toggle: toggleNovoPedidoModal }] =
    useDisclosure();

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const status = searchParams.get("status") || "todos";

  const handleFiltro = (status: ComboboxItem) => {
    const params = new URLSearchParams(searchParams);
    if (status.value !== "todos") {
      params.set("status", status.value);
    } else {
      params.delete("status");
    }
    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <>
      <Flex direction="column" gap="md">
        <Title order={2}>Pedidos</Title>
        <Box
          w="100%"
          display="flex"
          style={{
            gap: 10,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={toggleNovoPedidoModal}
          >
            Novo Pedido
          </Button>

          <Select
            label="Status do Pedido"
            placeholder="Status"
            defaultValue="todos"
            data={[
              { label: "Todos", value: "todos" },
              { label: "Pendente", value: "pendente" },
              { label: "Concluído", value: "concluido" },
              { label: "Em andamento", value: "em_andamento" },
            ]}
            onChange={(value, option) => handleFiltro(option)}
          />
        </Box>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Fornecedor</Table.Th>
              <Table.Th>Valor Total</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Data e Hora</Table.Th>
              <Table.Th>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {pedidos
              .filter((p) =>
                status === "todos"
                  ? true
                  : p.statusPedido === status.toUpperCase()
              )
              .map((pedido) => (
                <PedidoTableItem key={pedido.id} pedido={pedido} />
              ))}
          </Table.Tbody>
        </Table>
      </Flex>
      <ModalNovoPedido
        opened={openedNovoPedidoModal}
        onClose={toggleNovoPedidoModal}
      />
    </>
  );
}
