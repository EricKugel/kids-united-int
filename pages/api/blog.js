import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { connectDB } from "../../helpers/mongohelper";
import User from "../../models/user";
import Blog from "../../models/blog";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      try {
        await connectDB();
        const userId = await User.findOne({ email: session.user.email });
        const date = Date.now();
        await Blog.create({
          userId: userId._id,
          date,
          ...req.body,
        });
        res.status(200).json({ message: "Blog post created" });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
      }
    } else {
      res.status(401).json({ message: "Not signed in" });
    }
  }
}
