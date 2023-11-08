export default function decodeJwtPayload(token: string): any | null {
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    console.error('Token JWT inválido.');
    return null;
  }

  const encodedPayload = tokenParts[1];
  const decodedPayload = Buffer.from(encodedPayload, 'base64').toString('utf-8');

  try {
    const payloadObject = JSON.parse(decodedPayload);
    return payloadObject;
  } catch (error) {
    console.error('Erro ao analisar a parte de carga útil do JWT:', error);
    return null;
  }
}
