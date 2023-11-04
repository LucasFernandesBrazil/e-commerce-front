import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const logoutRoute: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();
  res.send({ ok: true });
};

export default withIronSessionApiRoute(logoutRoute, {
  cookieName: process.env.SESSION_COOKIE_NAME as string,
  password: process.env.SESSION_COOKIE_PASSWORD as string,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});