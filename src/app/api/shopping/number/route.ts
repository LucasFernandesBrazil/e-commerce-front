import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getBodyRequest } from "@/utils/getBodyRequest";
import { axiosClient } from "@/app/config/axios";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: NextRequest){
  const session = await getServerSession(authOptions);
  try {
    const { data } = await axiosClient.get(`${process.env.API_URL}/carrinhos/quantidade`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user.accessToken}`
      },
    });
    
    return new NextResponse(JSON.stringify(data.conteudo), {
			status: data.status || 200,
			statusText: data.mensagem || 'Sucess',
		});
  }catch (err: any) {
    return new NextResponse(JSON.stringify(err?.response?.data || err), {
			status: err?.response?.status || 500,
			statusText: err?.response?.data?.mensagem || 'Internal Server Error',
		});
  }
}

export async function PUT(req: NextRequest){
  const session = await getServerSession(authOptions);
  const body: any = await getBodyRequest(req);
  try {
    const { data } = await axiosClient.put(`${process.env.API_URL}/carrinhos/quantidade`, body, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user.accessToken}`
      },
    });
    return new NextResponse(JSON.stringify(data.conteudo), {
			status: data.status || 200,
			statusText: data.mensagem || 'Sucess',
		});
  }catch (err: any) {
    return new NextResponse(JSON.stringify(err?.response?.data || err), {
			status: err?.response?.status || 500,
			statusText: err?.response?.data?.mensagem || 'Internal Server Error',
		});
  }
}
