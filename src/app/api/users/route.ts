import { axiosClient } from "@/app/config/axios";
import { getBodyRequest } from "@/utils/getBodyRequest";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
  const body = await getBodyRequest(req);
  const { email, senha, nome } = JSON.parse(body);
  try {
    const { data } = await axiosClient.post(`${process.env.API_URL}/usuarios`, {
      email,
      senha,
      nome
    });
    return new NextResponse(JSON.stringify(data.conteudo), {
      status: data.status || 200,
      statusText: data.mensagem || 'Sucess'
    });
  } catch (err: any) {
    return new NextResponse(JSON.stringify(err?.response?.data || err), {
      status: err?.response?.status || 500,
      statusText: err?.response?.data?.mensagem || 'Internal Server Error'
    });
  }
}