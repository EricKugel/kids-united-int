import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "../../../helpers/mongohelper";
import { compare, hash } from "bcryptjs";
import User from "../../../models/user";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user?.password) {
          throw new Error("No user found");
        }
        const passwordMatch = await compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Incorrect Password");
        }

        return JSON.parse(JSON.stringify(user));
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        try {
          await connectDB();
          const userExist = await User.findOne({ email: profile.email });
          if (!userExist) {
            const user = await User.create({
              email: profile.email,
              userName: profile.name,
              image: profile.picture,
            });
          }
          return true;
        } catch (error) {
          console.log(error);
          throw new Error("Something went wrong");
        }
      } else {
        return true;
      }
    },
  },
};
const handler = NextAuth(authOptions);

export default handler;
