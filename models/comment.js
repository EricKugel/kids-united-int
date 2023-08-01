import { Schema, model, models } from "mongoose";

export const CommentSchema = new Schema({
  userId: String,
  date: Date,
  comment: String,
});

const Comment = models?.Comment || model("Comment", CommentSchema);
export default Comment;
