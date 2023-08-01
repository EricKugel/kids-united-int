import { getSession, useSession } from "next-auth/react";
import { connectDB } from "../../helpers/mongohelper";
import Blog, { BlogSchema } from "../../models/blog";
import User from "../../models/user";
import Comment from "../../models/comment";
import Link from "next/link";
import styles from "./BlogPosts.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Router from "next/router";

const BlogPosts = ({ blogs }) => {
  const session = useSession();

  const [data, setData] = useState("");

  const generateVideo = (url) => {
    const r = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(r);
    return (
      <iframe
        width="640"
        height="480"
        src={"//www.youtube.com/embed/" + match[2]}
        allowFullScreen
      ></iframe>
    );
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    var output = months[date.getMonth()] + " ";
    output += date.getDate() + ", ";
    output += date.getFullYear() + ", ";
    output += date.getHours() + ":" + date.getMinutes() + " CST";
    return output;
  };

  const handleSubmit = async (e, blogId) => {
    e.preventDefault();
    const response = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify({
        blogId,
        data,
      }),
    });

    if (response.ok) {
      toast.success("Comment posted!");
      Router.reload();
    } else {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div id={styles.wrapper}>
      <Link id={styles.create} href="/blog/create">
        +
      </Link>
      {blogs &&
        blogs.map((blog) => (
          <div className={styles.blog} key={blog._id}>
            <div className={styles.top}>
              <div className={styles.personWrapper}>
                <div className={styles.left}>
                  <img height="100px" width="100px" src={blog.user.image}></img>
                </div>
                <div className={styles.right}>
                  <Link
                    className={styles.name}
                    href={"/get-to-know-me/" + blog.user._id}
                  >
                    {blog.user.userName}
                  </Link>
                  <p>{blog.user.country}</p>
                </div>
              </div>
            </div>

            <div className={styles.bottom}>
              <div className={styles.blogContent}>
                <b>{formatDate(blog.date)}</b>
                <br />
                <br />
                {blog.blog}
              </div>

              {blog.photos && blog.photos.length > 0 && (
                <>
                  <div className={styles.photos}>
                    {blog.photos.map((photo) => (
                      <Link
                        href={photo}
                        key={photo}
                        className={styles.photo_thing}
                      >
                        <img
                          style={{ height: "100px", width: "auto" }}
                          src={photo}
                        />
                      </Link>
                    ))}
                  </div>
                  <i style={{ fontSize: "12px" }}>Click to view an image</i>
                </>
              )}

              <div>{blog?.youtube && generateVideo(blog.youtube)}</div>
            </div>

            <div className={styles.commentsPane}>
              <div className={styles.comments}>
                {blog.comments &&
                  blog.comments.map((comment) => (
                    <div className={styles.comment} key={comment._id}>
                      <b>
                        <Link href={"/get-to-know-me/" + comment.userId}>
                          {comment.name}
                        </Link>
                        {" @ "}
                        {formatDate(comment.date)}
                      </b>
                      <div className={styles.commentText}>
                        {comment.comment}
                      </div>
                    </div>
                  ))}
              </div>
              <br />
              <div class={styles.commentForm}>
                <form onSubmit={(e) => handleSubmit(e, blog._id)}>
                  <textarea
                    className={styles.commentTextArea}
                    name="comment"
                    onChange={(e) => {
                      setData(e.target.value);
                    }}
                  ></textarea>
                  <br />
                  <button type="submit">Comment</button>
                </form>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    try {
      const blogs = [];
      await connectDB();
      const blogDocs = JSON.parse(
        JSON.stringify(
          await Blog.find()
            .sort([["date", -1]])
            .lean()
        )
      );
      for (let blogDoc of blogDocs) {
        const user = JSON.parse(
          JSON.stringify(await User.findById(blogDoc.userId).lean())
        );
        const blog = { ...blogDoc, user };
        const comments = [];
        for (let comment of blogDoc.comments) {
          const commentDoc = JSON.parse(
            JSON.stringify(await Comment.findById(comment).lean())
          );
          const commentUser = JSON.parse(
            JSON.stringify(await User.findById(commentDoc.userId).lean())
          );
          comments.push({ ...commentDoc, name: commentUser.userName });
        }
        blogs.push({ ...blog, comments });
      }
      return { props: { blogs } };
    } catch (e) {
      console.error(e);
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

export default BlogPosts;
