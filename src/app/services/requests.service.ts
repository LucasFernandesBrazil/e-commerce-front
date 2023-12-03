export async function getRequests() {
  const response = await fetch('/api/requests', {
    method: 'GET',
  });
  const responseJson = await response.json();
  return responseJson;
}

export async function sendRequest() {
  const response = await fetch('/api/requests', {
    method: 'POST',
  });
  const responseJson = await response.json();
  return responseJson;
}

