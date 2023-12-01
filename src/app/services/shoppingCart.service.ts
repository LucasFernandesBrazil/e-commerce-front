export async function addToCart(itemId: number, quantidade: number) {  
  const response = await fetch('/api/shopping/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      itemId,
      quantidade,
    }),
  });
  const responseJson = await response.json();
  return responseJson;
}

export async function getCartNumber() {
  const response = await fetch('/api/shopping/', {
    method: 'GET',
  });
  const responseJson = await response.json();
  return responseJson;
}
