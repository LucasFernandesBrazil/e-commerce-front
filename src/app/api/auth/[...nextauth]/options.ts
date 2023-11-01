import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

interface ILoginResponse {
  mensagens: string[],
  conteudo: {
    token: string,
    expiracao: number
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text", placeholder: "Digite seu Email" },
        senha: { label: "senha", type: "password",  placeholder: "Digite suas senha" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:5129/api/usuarios/login", {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            senha: credentials?.senha
          }),
          headers: { "Content-Type": "application/json" }
        })
        const response = await res.json()
        console.log("user", response);
        
        if (res.ok && response) {
          return response
        }
        return null
      }
    }),
    ],
  };
