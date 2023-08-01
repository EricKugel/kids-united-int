import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { connectDB } from "../../helpers/mongohelper";
import User from "../../models/user";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      try {
        await connectDB();
        await User.updateOne({ email: session.user.email }, req.body.data);
        res.status(200).json("Profile updated");
      } catch (e) {
        console.error(e);
        res.status(500);
      }
    } else {
      res.status(401).json({ message: "Not signed in" });
    }
  }
}
