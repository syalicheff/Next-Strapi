import AppShellLayout from "@/components/layouts/AppShellLayout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShellLayout>{children}</AppShellLayout>;
}
