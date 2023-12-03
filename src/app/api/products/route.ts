import { axiosClient } from "@/app/config/axios";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    const { data } = await axiosClient.get(`${process.env.API_URL}/produtos`);
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