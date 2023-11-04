import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRequestCookie } from "./lib/getRequestCookie";

export default async function Home() {
  console.log("Entering TenantLayout boundary");
  const user = await getRequestCookie(cookies());

  // Prevent non logged user to acces all pages in the tenant layout tree
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      // header component
      <h1>Home</h1>
      // footer component
    </>
  );
}