import { getServerSession } from "next-auth"
import { SessionProvider } from "next-auth/react";

export default async function Home() {
  const session: any = await getServerSession()
  console.log("session", session);
  
  return (
    <>
      <h1>Home page</h1>
    </>
  )
}
