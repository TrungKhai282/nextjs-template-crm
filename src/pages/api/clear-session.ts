import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    destroyCookie({ res }, "session", {
      path: "/",
    });

    res.status(200).json({ message: "Cookie has been cleared" });
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
