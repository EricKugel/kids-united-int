import { connectDB } from "../../helpers/mongohelper";
import User from "../../models/user";
import { sendMail } from "../../helpers/email";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method == "POST") {
    await connectDB();
    const session = await getServerSession(req, res, authOptions);
    if (
      session &&
      JSON.parse(
        JSON.stringify(await User.findOne({ email: session.user.email }).lean())
      ).admin
    ) {
      const body = req.body;
      const { html, subject } = body;
      const allUsers = JSON.parse(JSON.stringify(await User.find({}).lean()));

      var allEmails = [];
      allUsers.map((user) => {
        allEmails.push(user.email);
      });
      //   allEmails = ["erickugel713@gmail.com", "7886601@rochesterschools.org"];

      sendMail(
        ["info@kidsunitedint.org"],
        subject,
        html,
        html,
        (bcc = allEmails)
      );
      res.status(200).json({ message: "Success!" });
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  }
}
