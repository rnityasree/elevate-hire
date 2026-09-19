const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Storage configuration for uploaded video pitches
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/video_resumes/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|webm|mov/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) return cb(null, true);
    cb(new Error('Only video files (.mp4, .webm, .mov) are allowed!'));
  }
});

// @route   POST /api/video-resume/upload
// @desc    Upload video resume pitch and return AI evaluation
router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a video file.' });
    }

    // Simulated AI Processing Pipeline (Speech-to-Text & Vision Metrics)
    const mockAnalysis = {
      overallScore: 89,
      tone: { score: 87, wpm: 145, toneLabel: 'Enthusiastic & Clear' },
      bodyLanguage: { score: 91, eyeContact: '94%', posture: 'Upright' },
      confidence: { score: 90, energyLevel: 'High', hesitationCount: 1 },
      highlights: [
        { time: '0:04', text: 'Engaging greeting and immediate value proposition.' },
        { time: '0:32', text: 'Demonstrated solid technical depth describing MERN projects.' },
        { time: '0:55', text: 'Clean and decisive call to action for recruiters.' }
      ],
      videoUrl: `/uploads/video_resumes/${req.file.filename}`
    };

    return res.status(200).json({
      success: true,
      message: 'Video analyzed successfully!',
      data: mockAnalysis
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;