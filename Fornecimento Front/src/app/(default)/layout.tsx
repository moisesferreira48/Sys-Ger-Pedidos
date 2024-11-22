"use client";

import { AppShell, Burger, Flex, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconClipboardList, IconHome } from "@tabler/icons-react";
import Link from "next/link";

const Navbar = ({ opened }: { opened: boolean }) => {
  return (
    <Flex direction="column" gap="sm" p="md">
      <NavLink
        label={opened ? "Início" : ""}
        leftSection={<IconHome size="1.2rem" stroke={1.5} />}
        href="/"
        w={opened ? "auto" : 50}
        style={{
          justifyContent: opened ? "flex-start" : "center",
          transition: "all 0.3s ease",
        }}
        component={Link}
      />
      <NavLink
        label={opened ? "Pedidos" : ""}
        leftSection={<IconClipboardList size="1.2rem" stroke={1.5} />}
        href="/pedidos"
        w={opened ? "auto" : 50}
        style={{
          justifyContent: opened ? "flex-start" : "center",
          transition: "all 0.3s ease",
        }}
        component={Link}
      />
    </Flex>
  );
};

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(true);

  return (
    <AppShell
      navbar={{
        width: { base: 80, sm: desktopOpened ? 300 : 80 },
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened },
      }}
      header={{ height: 40 }}
      styles={{
        navbar: {
          transition: "width 0.3s ease",
        },
        main: {
          transition: "padding-left 0.3s ease",
        },
      }}
    >
      <AppShell.Navbar>
        <Navbar opened={desktopOpened} />
      </AppShell.Navbar>
      <AppShell.Header>
        <Flex align="center" justify="space-between" h={40} px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
            transitionDuration={300}
          />
        </Flex>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
