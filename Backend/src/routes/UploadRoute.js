
import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import cloudinary from "../utils/Cloudinary.js";

const router = express.Router();

router.post("/public/images", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) return res.status(500).json({ error });
        return res.status(200).json({ url: result.secure_url });
      }
    );

    result.end(req.file.buffer); // Push buffer into upload stream
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
