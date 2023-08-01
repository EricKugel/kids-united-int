import { Schema, model, models } from "mongoose";

export const AssetSchema = new Schema({
  fileName: String,
});

const Asset = models?.Asset || model("Asset", AssetSchema);
export default Asset;
