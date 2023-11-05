import { ironOptions } from "@/app/lib/configIronSession";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  console.log("POST /api/login", req.session);

  try{
    req.session.user = {
      id: 230,
      admin: true,
    };
    await req.session.save();

    return NextResponse.json({
      hello: "world",
    });
  }catch (e){
    console.log("Error: ", e);
    return NextResponse.json({
      error: "Ocorreu um erro interno no servidor ao tentar fazer login.",
    }, { status: 500 });
  }
}

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  // get user from database then:
  req.session.user = {
    id: 230,
    admin: true,
  };
  await req.session.save();
  res.send({ ok: true });
}