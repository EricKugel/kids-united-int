import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { connectDB } from "../../helpers/mongohelper";
import { sendMail } from "../../helpers/email";
import User from "../../models/user";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      try {
        await connectDB();
        const emailFrom = session.user.email;
        const emailTo = req.body.emailTo;
        const nameFrom = JSON.parse(
          JSON.stringify(await User.findOne({ email: emailFrom }).lean())
        ).userName;
        const nameTo = JSON.parse(
          JSON.stringify(await User.findOne({ email: emailTo }).lean())
        ).userName;
        sendMail(
          [emailFrom],
          "Your meeting request with " + nameTo,
          "Hello " +
            nameFrom +
            ", your request has been sent. Please note that you requested to meet at " +
            req.body.time +
            " and sent the following message:\n\n" +
            req.body.message,
          "Hello " +
            nameFrom +
            ", your request has been sent. Please note that you requested to meet at " +
            req.body.time +
            " and sent the following message:\n\n" +
            req.body.message
        );
        sendMail(
          [emailTo],
          "New meeting request from " + nameFrom,
          "Hello " +
            nameTo +
            ", Kids United Int user " +
            nameFrom +
            " requested a zoom meeting with you at " +
            req.body.time +
            " and sent the following message:\n\n" +
            req.body.message,
          "Hello " +
            nameTo +
            ", Kids United Int user " +
            nameFrom +
            " requested a zoom meeting with you at " +
            req.body.time +
            " and sent the following message:\n\n" +
            req.body.message
        );
        res.status(200).json({ data: "Success!" });
      } catch (e) {
        console.error(e);
        res.status(500);
      }
    } else {
      res.status(401).json({ message: "Not signed in" });
    }
  }
}
