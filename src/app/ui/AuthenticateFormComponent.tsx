'use client'

import { useState } from "react";
import ButtonLoadComponent from "./ButtonLoadComponent";
import { signIn } from "next-auth/react";
import toastEmmiter from "@/utils/toastEmitter";
import { EToastType } from "@/interfaces/toast.interface";
import { useRouter } from "next/navigation";


export default function AuthenticateFormComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleLogin(event: any) {
    event.preventDefault();
    setIsLoading(true);
    
    signIn("credentials", { redirect: false, email: event.target.email.value, password: event.target.password.value }).then((response) => {
      if(response?.error) {
        toastEmmiter("Credenciais inválidas.", EToastType.ERROR);
      } else {
        router.push('/');
      }
      setIsLoading(false);
    }).catch((e) => {
      console.log('error', e);
      toastEmmiter("Ocorreu um erro desconhecido. ", EToastType.ERROR);
      setIsLoading(false);
    });
  }

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Senha
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
          />
          <label
            htmlFor="remember-me"
            className="ml-3 block text-sm leading-6 text-gray-900"
          >
            Me lembre
          </label>
        </div>

        <div className="text-sm leading-6">
          <a href="#" className="font-semibold text-sky-600 hover:text-sky-500">
            Esqueceu sua senha?
          </a>
        </div>
      </div>

      <div>
        <ButtonLoadComponent text="Entrar" isLoading={isLoading} />
      </div>
    </form>
  );
}
