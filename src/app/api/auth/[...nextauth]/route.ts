import decodeJwtPayload from "@/app/lib/jwt"
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

interface ILoginResponseContent {
  sub?: string,
  name?: string,
  email?: string,
  exp?: number,
  iss?: string,
  aud?: string
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:5129/api/usuarios/login", {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            senha: credentials?.password
          }),
          headers: { "Content-Type": "application/json" }
        })

        console.log(res.status);
        
        if (res.status === 200) {
          const response = await res.json()
          console.log(response);
          const decodedToken = decodeJwtPayload(response?.conteudo?.token);
          console.log(decodedToken);
          return { ...decodedToken, id: decodedToken.email }
        } else {
          return null
        }
      }
    })
  ],
  session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }