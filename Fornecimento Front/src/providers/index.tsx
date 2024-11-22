import MantineConfig from "./MantineConfig";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <MantineConfig>{children}</MantineConfig>;
}
