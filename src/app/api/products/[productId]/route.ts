export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const response = await fetch(`${process.env.API_URL}/produtos/${encodeURI(params.productId)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const productDetail = await response.json();
  return Response.json(productDetail?.conteudo);
}