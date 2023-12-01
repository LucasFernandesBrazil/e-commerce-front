import { NextRequest } from "next/server";

export async function getBodyRequest(request: NextRequest){
  const reader = request.body?.getReader();
  const result = await reader?.read();
  return new TextDecoder().decode(result?.value);
}