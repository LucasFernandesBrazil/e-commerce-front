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

export async function changeNumberItemCart(itemId: number, quantidade: number) {  
  const response = await fetch('/api/shopping/number', {
    method: 'PUT',
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


export async function deleteItem(itemId: number) {  
  const response = await fetch('/api/shopping', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      itemId,
    }),
  });
  const responseJson = await response.json();
  return responseJson;
}

export async function getCartNumber() {
  const response = await fetch('/api/shopping/number', {
    method: 'GET',
  });
  const responseJson = await response.json();
  return responseJson;
}

export async function getCartInfo() {
  const response = await fetch('/api/shopping', {
    method: 'GET',
  });
  const responseJson = await response.json();
  return responseJson;
}

