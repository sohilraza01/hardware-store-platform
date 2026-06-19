import express, { Response } from 'express';
import upload from '../config/upload';
import { protect, adminOnly } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, adminOnly, upload.single('image'), (req, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File not found!' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({
    message: 'Image Uploaded!',
    imageUrl,
  });
});

export default router;