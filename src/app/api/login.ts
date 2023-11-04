// pages/api/login.ts

import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
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