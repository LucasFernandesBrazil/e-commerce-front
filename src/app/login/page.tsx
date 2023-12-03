import Image from "next/image";
import AuthenticateFormComponent from "../ui/AuthenticateFormComponent";

export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto h-20 w-auto"
            src="/full-icon-blue.svg"
            alt="Roupa online"
            width={100}
            height={100}
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Entre na sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <AuthenticateFormComponent />
          </div>
        </div>
      </div>
    </>
  )
}
