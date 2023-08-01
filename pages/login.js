import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "../styles/Form.module.css";

import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  });

  const loginUser = async (e) => {
    e.preventDefault();
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Logged in successfully");
      }
    });
  };

  return (
    <div className={poppins.className}>
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>Sign In</div>
        <div className={styles.google} onClick={() => signIn("google")}>
          <img src="/google.png" className={styles.icon} />
          <div>Sign in with Google</div>
        </div>
        <br />
        <div>Or...</div>
        <form onSubmit={loginUser}>
          <div className={styles.space}>
            <input
              className={styles.input}
              placeholder="Email"
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
          <div className={styles.space}>
            <input
              className={styles.input}
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>

          <div>
            <input type="submit" value="Sign in" className={styles.submit} />
          </div>
        </form>
        <br />
        <Link className={styles.littleTinyBottomText} href="/register">
          <i>Create Account</i>
        </Link>
      </div>
    </div>
  );
};

export default Login;
