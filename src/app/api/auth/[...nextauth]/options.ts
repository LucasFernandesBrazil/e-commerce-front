import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text", placeholder: "Digite seu Email" },
        password: { label: "password", type: "password",  placeholder: "Digite suas senha" },
      },
      async authorize(credentials?: Record<"email" | "password", string>) {
        const user = { id: "1", name: "J Smith", email: "test@gmail.com", password: "test" }
        if (user && 
            user.password === credentials?.password
            && user.email === credentials?.email) {
          return user
        }
        return null
      }
    }),
    ],
  };
