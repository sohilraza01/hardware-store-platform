import express, { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import upload from '../config/upload';
import { protect, adminOnly } from '../middleware/authMiddleware';

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/', protect, adminOnly, upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Koi file nahi mili!' });
    }

    // Buffer ko base64 mein convert karo
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Directly Cloudinary SDK se upload karo
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'ahmadi-hardware',
    });

    console.log('Upload success:', result.secure_url);

    res.json({
      message: 'Image upload ho gayi!',
      imageUrl: result.secure_url,
    });
  } catch (error: any) {
    console.error('Upload Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;