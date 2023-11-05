import { getServerSession } from "next-auth/next"
import type { NextRequest } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function Protected (req: NextRequest): Promise<any> {
  const session = await getServerSession(authOptions)
  console.log('session', session);
  

  return (
    <div className='grid grid-cols-2 text-black p-4'>
      <div>
        {
          session !== null
            ? <h1 className='leading-loose text-[2rem] font-extrabold text-accent'>
                Hi {session?.user?.name}!
              </h1>
            : <a className='btn btn-primary' href='/api/auth/signin'>Sign in</a>
        }
      </div>
    </div>
  )
}