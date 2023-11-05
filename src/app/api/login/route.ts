import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    hello: "world",
  })
}

export default withIronSessionApiRoute(
  async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    // get user from database then:
    req.session.user = {
      name: "John Doe",
      email: "jhon@gmail.com",
      id: 230,
      admin: true,
    };
    await req.session.save();
    res.send({ ok: true });
  },
  {
    cookieName: process.env.SESSION_COOKIE_NAME as string,
    password: process.env.SESSION_COOKIE_PASSWORD as string,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);