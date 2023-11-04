// lib/getRequestCookie.ts
import { unsealData } from "iron-session";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export interface User {
  name?: string;
  email?: string;
  id?: number;
  admin?: boolean;
}

/**
 * Can be called in page/layout server component.
 * @param cookies ReadonlyRequestCookies
 * @returns SessionUser or null
 */
export async function getRequestCookie(
  cookies: ReadonlyRequestCookies
): Promise<User | null> {
  const cookieName = process.env.SESSION_COOKIE_NAME as string;
  const found = cookies.get(cookieName);

  if (!found) return null;

  const { user } = await unsealData(found.value, {
    password: process.env.SESSION_COOKIE_PASSWORD as string,
  });

  return user as unknown as User;
}

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
