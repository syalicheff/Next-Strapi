"use client";

import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Alert,
  Paper,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { signIn } from "next-auth/react";
import { IconAlertCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm({
    initialValues: {
      identifier: "",
      password: "",
    },

    validate: {
      identifier: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Email invalide",
      password: (value) =>
        value.length >= 4 ? null : "Mot de passe trop court",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setError("");

    const res = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      setError("Identifiants incorrects.");
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder shadow="sm">
      <Title order={2} ta="center" mb="lg">
        Connexion
      </Title>

      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
          {error}
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Email"
            placeholder="email@example.com"
            required
            {...form.getInputProps("identifier")}
          />
          <PasswordInput
            label="Mot de passe"
            placeholder="••••••••"
            required
            {...form.getInputProps("password")}
          />
          <Button type="submit" fullWidth>
            Se connecter
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
