import { getSession } from "next-auth/react";
import User from "../models/user";
import Editor from "../components/Editor";

import { connectDB } from "../helpers/mongohelper";

import { useState, useEffect } from "react";

import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";

const Email = ({ email }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const [subject, setSubject] = useState("");

  const router = useRouter();

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleClick = async () => {
    fetch("/api/send_mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject, html: data }),
    }).then((response) => {
      if (response.ok) {
        toast.success("Email sent!");
        router.push("/");
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <>
      <Editor
        name="description"
        onChange={(data) => {
          setData(data);
        }}
        editorLoaded={editorLoaded}
      />

      <form>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        ></input>
        <button onClick={handleClick}>Send!</button>
      </form>

      {/* {JSON.stringify(data)} */}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  await connectDB();
  if (
    session &&
    JSON.parse(
      JSON.stringify(await User.findOne({ email: session.user.email }).lean())
    ).admin
  ) {
    try {
      const email = session.user.email;
      return { props: { email } };
    } catch (e) {
      console.error(e);
    }
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default Email;
