export async function GET(){
  const response = await fetch(`${process.env.API_URL}/produtos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const products = await response.json();
  return Response.json(products?.conteudo);
}