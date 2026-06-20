import express, { Request, Response } from 'express';
import multer from 'multer';
import { protect, adminOnly } from '../middleware/authMiddleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', protect, adminOnly, upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Koi file nahi mili!' });
    }

    // Imgur API se upload karo — bilkul free!
    const base64Image = req.file.buffer.toString('base64');

    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID 546c25a59c58ad7',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image,
        type: 'base64',
      }),
    });

    const data = await response.json() as any;

    if (!data.success) {
      throw new Error('Image upload fail ho gayi!');
    }

    console.log('Upload success:', data.data.link);

    res.json({
      message: 'Image upload ho gayi!',
      imageUrl: data.data.link,
    });
  } catch (error: any) {
    console.error('Upload Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;