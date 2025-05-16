import ArticleForm from "@/components/authenticated/Blog/ArticleNew";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CreateArticlePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user || null;
  console.log("user", user);
  return <ArticleForm user={user} />;
}
