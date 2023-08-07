import { Storage } from "@google-cloud/storage";
import { connectDB } from "../../helpers/mongohelper";
import Asset from "../../models/asset";

export default async function handler(req, res) {
  try {
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY,
      },
    });

    await connectDB();
    const asset = await Asset.create({
      fileName: req.query.file,
    });

    const bucket = storage.bucket(process.env.BUCKET_NAME);
    const file = bucket.file(asset._id);
    const options = {
      expires: Date.now() + 1 * 60 * 1000,
      fields: { "x-goog-meta-test": "data" },
    };

    const [response] = await file.generateSignedPostPolicyV4(options);
    res.status(200).json({
      response,
      publicUrl:
        "https://storage.googleapis.com/kids-united-int-bucket/" + asset._id,
    });
  } catch (err) {
    console.error(err);
  }
}
