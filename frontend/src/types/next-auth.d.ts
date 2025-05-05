// types.d.ts ou dans le même fichier que tes déclarations NextAuth

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      username: string;
      role: string;
      confirmed: boolean;
      blocked: boolean;
      jwt: string;
      avatar?: {
        url: string;
      };
    };
  }

  interface User {
    id: number;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    role: string;
    confirmed: boolean;
    blocked: boolean;
    jwt: string;
    avatar?: {
      url: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    email: string;
    username: string;
    role: string;
    confirmed: boolean;
    blocked: boolean;
    jwt: string;
    avatar?: {
      url: string;
    };
  }
}
