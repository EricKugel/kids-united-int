import User from "../../models/user";
import { connectDB } from "../../helpers/mongohelper";
import { useState, useEffect, useRef } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import styles from "../../styles/Form.module.css";

const EditMyBio = ({ user }) => {
  const router = useRouter();

  const [data, setData] = useState({
    title: user.title ? user.title : "",
    bio: user.bio ? user.bio : "",
    country: user.country ? user.country : "",
    pronouns: user.pronouns ? user.pronouns : "",
    phone: user.phone ? user.phone : "",
    ig: user.ig ? user.ig : "",
    snap: user.snap ? user.snap : "",
    image: user.image ? user.image : "",
  });
  const [src, setSrc] = useState(data.image);

  const uploadPhoto = async (e) => {
    try {
      setSrc("/loading.gif");
      const file = e.target.files[0];
      const filename = encodeURIComponent(file.name);
      const res = await fetch("/api/upload_url?file=" + filename);
      const { response, publicUrl } = await res.json();
      const { url, fields } = response;

      const formData = new FormData();

      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const upload = await fetch(url, {
        method: "POST",
        body: formData,
      });

      setData({ ...data, image: publicUrl });
      setSrc(publicUrl);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/edit_my_bio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      toast.success("Bio updated!");
      router.push("/get-to-know-me/" + user._id);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={styles.formPageWrapper}>
      <div className={styles.largeFormWrapper}>
        <div className={styles.formHeader}>Edit My Bio</div>
        <input
          onChange={uploadPhoto}
          type="file"
          accept="image/png, image/jpeg"
        ></input>
        <img width="100px" height="100px" src={src} />
        <form onSubmit={handleSubmit}>
          <br />
          {user?.admin && (
            <>
              <input
                className={styles.smallInput}
                placeholder="title"
                id="title"
                name="title"
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                required
              />
            </>
          )}
          <input
            className={styles.smallInput}
            placeholder="Country"
            id="country"
            name="country"
            type="text"
            value={data.country}
            onChange={(e) => setData({ ...data, country: e.target.value })}
          />
          <input
            className={styles.smallInput}
            placeholder="Pronouns"
            id="pronouns"
            name="pronouns"
            type="text"
            value={data.pronouns}
            onChange={(e) => setData({ ...data, pronouns: e.target.value })}
          />
          <p>Bio</p>
          <div>
            <textarea
              className={styles.textarea}
              id="bio"
              name="bio"
              value={data.bio}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
            />
          </div>

          <div className={styles.inline}>
            <input
              placeholder="Phone"
              className={styles.inlineInput}
              id="phone"
              name="phone"
              type="text"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
            <input
              className={styles.inlineInput}
              placeholder="Instagram"
              id="ig"
              name="ig"
              type="text"
              value={data.ig}
              onChange={(e) => setData({ ...data, ig: e.target.value })}
            />

            <input
              placeholder="Snapchat"
              className={styles.inlineInput}
              id="snap"
              name="snap"
              type="text"
              value={data.snap}
              onChange={(e) => setData({ ...data, snap: e.target.value })}
            />
          </div>
          <br />
          <button className={styles.submit} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    try {
      await connectDB();
      const user = await User.findOne({
        email: JSON.parse(JSON.stringify(session.user)).email,
      });
      return { props: { user: JSON.parse(JSON.stringify(user)) } };
    } catch (e) {
      console.log(e);
    }
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

export default EditMyBio;
