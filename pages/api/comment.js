import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { connectDB } from "../../helpers/mongohelper";
import User from "../../models/user";
import Blog from "../../models/blog";
import Comment from "../../models/comment";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      try {
        const userId = JSON.parse(
          JSON.stringify(
            await User.findOne({ email: session.user.email }).lean()
          )
        )._id;
        const { blogId, data } = JSON.parse(req.body);
        const date = Date.now();

        const comment = await Comment.create({
          userId,
          date,
          comment: data,
        });

        const blog = await Blog.findById(blogId);
        blog.comments = [...blog.comments, comment._id];
        blog.save();

        res.status(200).json({ message: "Comment posted!" });
      } catch (e) {
        res.status(500).json({ message: "Something went wrong" });
        console.error(e);
      }
    } else {
      res.status(401).json({ message: "Not signed in" });
    }
  }
}
