"use client";

import {
  TextInput,
  Button,
  Stack,
  Group,
  Box,
  FileInput,
 
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { notifications } from "@mantine/notifications";

import { createArticle } from "@/lib/strapi/articles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "next-auth";
import TurndownService from "turndown";

export default function ArticleNew({ user }: { user: User | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const turndownService = new TurndownService();

  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      image: null as File | null,
    },
    validate: {
      title: (value) =>
        value.trim().length === 0 ? "Le titre est requis" : null,
      image: (value) => (!value ? "L'image est requise" : null),
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Superscript,
      SubScript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const markdown = turndownService.turndown(html);
      form.setFieldValue("content", markdown);
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);

    try {
      let uploadedImageId: number | undefined;
      if (values.image) {
        const formData = new FormData();
        formData.append("files", values.image);
        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user?.jwt}`,
            },
            body: formData,
          }
        );
        const uploadData = await uploadRes.json();
        uploadedImageId = uploadData?.[0]?.id;
      }
      const payload = {
        title: values.title,
        content: values.content,
        author: user?.id,
        ...(uploadedImageId && { image: uploadedImageId }),
      };
      await createArticle(payload, user as User);

      router.push("/blog");
      notifications.show({
        title: "Succès",
        message: "L'article a été créé avec succès !",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Erreur",
        message: "Une erreur est survenue lors de la création de l'article.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maw={800} mx="auto"  p="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Titre"
            placeholder="Titre de l'article"
            withAsterisk
            {...form.getInputProps("title")}
          />

          <FileInput
            label="Image"
            placeholder="Choisir une image"
            accept="image/*"
            withAsterisk
            clearable
            {...form.getInputProps("image")}
          />

          {editor && (
            <RichTextEditor editor={editor} mih={300}>
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Undo />
                  <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>
          )}

          <Group justify="flex-end" mt="md">
            <Button type="submit" loading={loading}>
              Créer l'article
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
}
