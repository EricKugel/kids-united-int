import { Schema, model, models } from "mongoose";

export const BlogSchema = new Schema({
  userId: String,
  date: Date,
  blog: String,
  photos: [String],
  youtube: String,
  comments: [String],
});

const Blog = models?.Blog || model("Blog", BlogSchema);
export default Blog;
