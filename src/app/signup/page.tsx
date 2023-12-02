'use client'

import { EToastType } from '@/interfaces/toast.interface'
import toastEmmiter from '@/utils/toastEmitter'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { axiosClient } from '../config/axios'
import ButtonLoadComponent from '../ui/ButtonLoadComponent'

export default function AuthenticateFormComponent() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSignUp(event: any) {
    event.preventDefault()
    setIsLoading(true)

    try {
      await axios.post('/api/users', {
        nome: event.target.name.value,
        email: event.target.email.value,
        senha: event.target.password.value,
      })
      toastEmmiter('Conta criada com sucesso.', EToastType.SUCESS)
      router.back()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastEmmiter(error.response?.data?.messages[0], EToastType.ERROR)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-20 w-auto"
            src="/full-icon-blue.svg"
            alt="Roupa online"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crie sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSignUp}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nome
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-0 bg-white bg-opacity-20 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6" // Adicionando bg-opacity
                  />
                </div>
              </div>

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
                    className="block w-full rounded-md border-0 bg-white bg-opacity-20 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6" // Adicionando bg-opacity
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
                    className="block w-full rounded-md border-0 bg-white bg-opacity-20 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6" // Adicionando bg-opacity
                  />
                </div>
              </div>

              <div>
                <ButtonLoadComponent text="Criar conta" isLoading={isLoading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
