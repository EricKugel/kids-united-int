import { signOut, useSession, getSession } from "next-auth/react";
import Link from "next/link";
import User from "../models/user";

const Footer = ({ name }) => {
  const session = useSession();
  const authenticated = session?.status === "authenticated";

  const logoutLink = (
    <Link onClick={signOut} href="">
      Log Out
    </Link>
  );
  const loginLink = <Link href="/login">Log In</Link>;

  return (
    <>
      <footer>
        <p>
          {authenticated
            ? `Logged in as ${
                session.data?.user.name || session.data?.user.email
              }`
            : "Not logged in"}{" "}
          | {authenticated ? logoutLink : loginLink}
        </p>
        <p>
          <Link href="/legal/privacy-policy">Privacy Policy</Link> |{" "}
          <Link href="/legal/terms-and-conditions">Terms and Conditions</Link>
        </p>
        <p>Website by Eric Kugel</p>
      </footer>
      <style jsx>{`
        footer {
          background-color: #ffedce;
          font-family: monospace;
          text-align: center;
          width: 100%;
          padding: 50px;
          padding-left: 0;
          padding-right: 0;
        }

        footer p {
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default Footer;
