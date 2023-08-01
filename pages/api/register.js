import bcrypt from "bcryptjs";
import { connectDB } from "../../helpers/mongohelper";
import User from "../../models/user";
import { sendMail } from "../../helpers/email";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = req.body;
    const { name, email, password } = body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Invalid input" });
    }

    await connectDB();
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      userName: name,
      email: email,
      password: hashedPassword,
      image: "/pfp" + Math.floor(Math.random() * 2) + ".png",
    });

    sendMail(
      [user.email],
      "Your new Kids United Int account",
      "Thanks for creating an account!",
      "Thanks for creating an account! Go to <a href = 'kidsunitedint.org'>Kids United Int</a> to see blog posts and update your profile! Also check out our upcoming projects and mental health materials!"
    );
    res.status(200).json({ user });
  }
}
