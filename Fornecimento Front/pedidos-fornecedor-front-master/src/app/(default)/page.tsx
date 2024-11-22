import { Flex, Text } from "@mantine/core";

export default function HomePage() {
  return (
    <Flex justify="center" align="center" w="100vw" direction="column">
      <Text fw={700} fz={32} my="xl">
        Sistema de Gerenciamento de Pedidos
      </Text>

      <Text fw={500} fz={24}>
        Fornecedores
      </Text>
    </Flex>
  );
}
