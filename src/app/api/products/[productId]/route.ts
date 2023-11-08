export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const response = await fetch(`http://localhost:5129/api/produtos/${encodeURI(params.productId)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const productDetail = await response.json();
  return Response.json(productDetail?.conteudo);
}