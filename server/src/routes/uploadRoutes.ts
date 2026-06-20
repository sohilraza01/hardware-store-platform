import express, { Response, Request } from 'express';
import upload from '../config/upload';
import { protect, adminOnly } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, adminOnly, (req: Request, res: Response) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Upload Error:', err);
      return res.status(500).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'file not found!' });
    }

    const imageUrl = (req.file as any).path;
    console.log('Image uploaded:', imageUrl);

    res.json({
      message: 'Image uploaded!',
      imageUrl,
    });
  });
});

export default router;