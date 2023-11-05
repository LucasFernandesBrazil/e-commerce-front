import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  return (
    <>
      // header component
      <h1>Home</h1>
      // footer component
    </>
  );
}