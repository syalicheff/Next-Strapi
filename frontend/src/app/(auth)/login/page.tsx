import { Container, Paper, Title } from "@mantine/core";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Container size={420} my={40}>
      <Paper p="xl" radius="md">
        <Title order={2} ta="center" mb={20}>
          <span style={{ color: "#0070f3" }}>Clutch Code</span>
        </Title>
        <LoginForm />
      </Paper>
    </Container>
  );
}
