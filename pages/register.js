import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });
import styles from "../styles/Form.module.css";

const Register = () => {
  const session = useSession();
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        password: data.password,
      }),
    });
    if (res.status == "200") {
      toast.success("User has been registered!");
      router.push("/login");
    } else {
      const body = await res.json();
      console.log(JSON.stringify(body));
      toast.error(body.message);
    }
  };
  return (
    <div className={poppins.className}>
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>Sign up</div>
        <div className={styles.google} onClick={() => signIn("google")}>
          <img src="/google.png" className={styles.icon} />
          <div>Sign up with Google</div>
        </div>
        <br />
        <div>Or...</div>
        <form onSubmit={registerUser}>
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
              placeholder="Name"
              id="name"
              name="name"
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
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
            <input type="submit" value="Sign up" className={styles.submit} />
          </div>
        </form>
        <br />
        <Link className={styles.littleTinyBottomText} href="/login">
          <i>Sign in to an existing account</i>
        </Link>
      </div>
    </div>
  );
};

export default Register;
