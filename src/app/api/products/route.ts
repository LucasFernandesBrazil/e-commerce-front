export async function GET(){
  const response = await fetch(`http://localhost:5129/api/produtos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const products = await response.json();
  return Response.json(products?.conteudo);
}