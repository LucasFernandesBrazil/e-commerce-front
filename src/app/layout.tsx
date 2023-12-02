import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Provider from "./context/client.provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FooterComponent from "./ui/FooterComponent";
import NavBarComponent from "./ui/NavBarComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Next.js",
  description: "E-commerce Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html className="h-full bg-white" lang="pt-BR">
      <body className={`h-full ${inter.className}`}>
        <Provider session={session}>
          <NavBarComponent />
          {children}
          <FooterComponent />
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
