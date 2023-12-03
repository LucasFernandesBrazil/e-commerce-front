import { axiosClient } from "@/app/config/axios";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try{
    const { productId } = params;
    const { data } = await axiosClient.get(`${process.env.API_URL}/produtos/${productId}`);
    return new Response(JSON.stringify(data.conteudo), {
      status: data.status || 200,
      statusText: data.mensagem || 'Sucess',
    });
  }catch (err: any) {
    return new Response(JSON.stringify(err?.response?.data || err), {
      status: err?.response?.status || 500,
      statusText: err?.response?.data?.mensagem || 'Internal Server Error',
    });
  }
}