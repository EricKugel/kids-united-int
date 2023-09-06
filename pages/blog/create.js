import { getSession } from "next-auth/react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import styles from "../../styles/Form.module.css";

const Create = () => {
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        photos,
      }),
    });
    if (response.ok) {
      toast.success("Blog post created!");
      router.push("/blog");
    } else {
      toast.error("Something went wrong");
    }
  };

  const [data, setData] = useState({
    blog: "",
    youtube: "",
  });
  const [photos, setPhotos] = useState([]);

  const uploadPhoto = async (e) => {
    try {
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

      setPhotos([...photos, publicUrl]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.formPageWrapper}>
      <div className={styles.largeFormWrapper}>
        <div className={styles.formHeader}>Create a blog post</div>
        <b>Upload images (optional)</b>
        <br />
        <br />
        <input
          onChange={uploadPhoto}
          type="file"
          accept="image/png, image/jpeg"
        ></input>
        <div>
          {photos.map((photo) => (
            <img style={{ height: "100px", width: "auto" }} src={photo} />
          ))}
        </div>
        <form onSubmit={submitHandler}>
          <p>Write something for the blog!</p>
          <textarea
            className={styles.textarea}
            id="blog"
            name="blog"
            value={data.value}
            onChange={(e) => {
              setData({ ...data, blog: e.target.value });
            }}
          />
          <input
            className={styles.smallInput}
            placeholder="Youtube link (optional)"
            id="youtube"
            name="youtube"
            value={data.youtube}
            onChange={(e) => {
              setData({ ...data, youtube: e.target.value });
            }}
          />
          <br />
          <br />
          <button className={styles.submit} type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return { props: {} };
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

export default Create;
