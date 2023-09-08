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
      "Welcome to Kids United International - Let's Make a Difference Together!",
      "Thanks for creating an account!",
      `
      

Hello ` +
        name +
        `,
<br/>
A heartfelt welcome to Kids United International! 🌍 We're excited to have you on board as a member of our dynamic youth-led community. 
<br/>
Here are a few ways you can dive right in and make the most of your Kids United experience by checking out our entirely youth-developed website:
<br/>
1. Share Your Insights: We encourage you to contribute to our blog section. Share your thoughts, experiences, and ideas on whatever your heart desires. Help us and others around the globe get to know what a day in your shoes looks like. Your voice matters!
<br/>
2. Discover Youth Stories: Get to know fellow members by exploring their profiles. Every youth has a unique story to tell. It's a fantastic way to connect and learn from one other.
<br/>
3. Reach Out and Connect: Don't hesitate to reach out to other members. Collaboration often starts with a simple "hello." Who knows what incredible projects you might create together or what friendships you might develop?
<br/>
4. Prioritize Mental Health: Take a moment to check out our mental health resources. Your well-being matters, and we're here to support you every step of the way.
<br/>
5. Upcoming Projects: Curious about what's next? Visit our upcoming projects page to stay in the loop. Your involvement and contributions make a significant impact! 
<br/><br/>
Don't forget to connect with us on Instagram @kidsunitedint for international stories and updates. 
<br/><br/>
Even the smallest actions can create ripples of change. We're eagerly anticipating the mark you'll leave on our global community!
<br/><br/>
Best,<br/>
Kids United International

      `,
      []
    );
    res.status(200).json({ user });
  }
}
