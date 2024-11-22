"use client";

import { usePedidoContext } from "@/providers/contexts/PedidoContext";
import { Pedido } from "@/types/Pedido";
import {
  Button,
  Flex,
  Group,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";

interface EditPedidoProps {
  pedido: Pedido;
}

export default function EditPedido({ pedido }: EditPedidoProps) {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      id: pedido.id,
      fornecedor: pedido.fornecedor,
      valorTotal: pedido.valorTotal,
      status: pedido.statusPedido,
      itemPedido: pedido.itemPedido,
    },
  });

  const { pedidos, setPedidos } = usePedidoContext();

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await fetch("http://localhost:8080/pedidos", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(values),
      });

      const { status, ...rest } = form.values;

      const obj = {
        ...rest,
        statusPedido: status,
        dataHoraPedido: pedido.dataHoraPedido,
      };

      setPedidos(pedidos.map((p) => (p.id === obj.id ? obj : p)));

      router.push("/pedidos");
      showNotification({
        title: "Sucesso",
        message: "Pedido atualizado com sucesso",
        color: "green",
      });
    } catch (error) {
      showNotification({
        title: "Erro",
        message: "Erro ao atualizar pedido",
        color: "red",
      });
      console.log(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction={"column"} gap={"md"} p="md">
        <TextInput label="Fornecedor" {...form.getInputProps("fornecedor")} />
        <NumberInput
          label="Valor Total"
          {...form.getInputProps("valorTotal")}
        />
        <Select
          label="Status"
          {...form.getInputProps("status")}
          data={[
            { label: "Pendente", value: "PENDENTE" },
            { label: "Concluído", value: "CONCLUIDO" },
            { label: "Em Andamento", value: "EM_ANDAMENTO" },
          ]}
          onChange={(value) => form.setFieldValue("status", value ?? "")}
        />

        <Flex direction={"column"} gap={"md"}>
          {form.values.itemPedido.map((item, index) => (
            <Group key={item.id}>
              <TextInput
                label={"Nome"}
                {...form.getInputProps(`itemPedido.${index}.nome`)}
              />
              <NumberInput
                label="Quantidade"
                {...form.getInputProps(`itemPedido.${index}.quantidade`)}
              />
            </Group>
          ))}
        </Flex>

        <Button type="submit">Salvar</Button>
      </Flex>
    </form>
  );
}
