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
  secret: "72@vXmjU*&#oLJQzE2Sm4WaAc7x55Jf4#GTzE^LySK7&7&FDx@gCSXR5%4zC43EEicWUGoVZLaHhkQfeGZL*GiLbHtJu*NxJL7R$oL3QD9ZzPgANs2eWqbgv4A9Caod$",
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log(`Fazendo login em ${process.env.API_URL}`)
        const res = await fetch(`${process.env.API_URL}/usuarios/login`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            senha: credentials?.password
          }),
          headers: { "Content-Type": "application/json" }
        })
        console.info('Login status code: ', res.status);
        if (res.status === 200) {
          const response = await res.json()
          
          return response?.conteudo;
        } else {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        return false
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      const decodedToken = decodeJwtPayload(token.token as string);
      session.user = { ...decodedToken, accessToken: token.token }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return { ...token, ...user };
    }
  },
  session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
