import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // 1. Authentification via /auth/local
          console.log(
            "Authenticating with credentials:",
            credentials?.identifier,
            credentials?.password,
            process.env.STRAPI_URL+"api/auth/local"
          );
          const res = await axios.post(
            `${process.env.STRAPI_URL}/api/auth/local`,
            {
              identifier: credentials?.identifier,
              password: credentials?.password,
            }
          );

          const { user, jwt } = res.data;

          if (!user || !jwt) return null;

          // 2. Récupération complète du user avec avatar ET role
          const userDetails = await axios.get(
            `${process.env.STRAPI_URL}/api/users/me?populate[avatar]=*&populate[role]=*`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );

          const fullUser = userDetails.data;
          return {
            id: fullUser.id,
            email: fullUser.email,
            username: fullUser.username,
            role: fullUser.role?.name,
            confirmed: fullUser.confirmed,
            blocked: fullUser.blocked,
            jwt,
            avatar: fullUser.avatar?.url
              ? `${process.env.STRAPI_URL}${fullUser.avatar.url}`
              : null,
          };
        } catch (error: any) {
          console.error(
            "Login error:",
            error.response?.data?.error || error.message
          );
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id =
          typeof user.id === "string" ? parseInt(user.id, 10) : user.id;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
        token.confirmed = user.confirmed;
        token.blocked = user.blocked;
        token.jwt = user.jwt;
        token.avatar = user.avatar;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
        role: token.role,
        confirmed: token.confirmed,
        blocked: token.blocked,
        jwt: token.jwt,
        avatar: token.avatar,
      };
      return session;
    },
  },

  session: {
    strategy: "jwt" as const,
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
