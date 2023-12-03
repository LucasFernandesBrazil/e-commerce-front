import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="bg-white">
        <div className="max mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Meu perfil
            </h2>
            <div className="mt-6 border-t-2 border-gray-200 pt-10">
              <dl className="divide-y divide-gray-200">
                <div className="py-10">
                  <dt className="text-base font-medium text-gray-900">Nome</dt>
                  <dd className="mt-1 text-sm text-gray-500">
                    {session?.user?.name}
                  </dd>
                </div>
                <div className="py-10">
                  <dt className="text-base font-medium text-gray-900">
                    E-mail
                  </dt>
                  <dd className="mt-1 text-sm text-gray-500">
                    {session?.user?.email}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="flex">
              <a
                className="mt-10 w-full mr-5 bg-gray-800 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:w-auto"
                href="/requests"
              >
                Meus pedidos
              </a>
              <a
                className="mt-10 w-full bg-gray-800 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:w-auto"
                href="/api/auth/signout"
              >
                Sair da conta
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
