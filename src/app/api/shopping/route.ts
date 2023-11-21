import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest){
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${process.env.API_URL}/carrinhos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user.accessToken}`
      },
    });
    
    const products = await response.json();
    return new NextResponse(JSON.stringify(products?.conteudo), {
			status: 200,
			statusText: 'Internal Server Error',
		});
  }catch (err) {
    return new NextResponse(JSON.stringify(err), {
			status: 500,
			statusText: 'Internal Server Error',
		});
  }
}