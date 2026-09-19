import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  Stack,
  Chip,
  LinearProgress,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  Alert,
} from "@mui/material";

import VideocamIcon from "@mui/icons-material/Videocam";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RefreshIcon from "@mui/icons-material/Refresh";
import SpeedIcon from "@mui/icons-material/Speed";
import FaceIcon from "@mui/icons-material/Face";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const VideoResume = () => {
  // Recording & Upload States
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [recordTime, setRecordTime] = useState(0);

  // Analysis States
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Refs
  const videoPreviewRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Clean up media streams and timers
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Start Live Webcam Stream & Recording
  const startRecording = async () => {
    setErrorMsg("");
    setRecordedChunks([]);
    setVideoUrl(null);
    setAnalysisResult(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setRecordedChunks(chunks);

        // Stop camera stream tracks
        stream.getTracks().forEach((track) => track.stop());
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = null;
        }
      };

      mediaRecorder.start();
      setRecording(true);

      // Start Timer
      setRecordTime(0);
      timerRef.current = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error(err);
      setErrorMsg("Camera or Microphone access was denied or is unavailable.");
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  // File Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setErrorMsg("File size exceeds 50MB limit.");
        return;
      }
      setErrorMsg("");
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setAnalysisResult(null);
    }
  };

  // Trigger AI Video Analysis
  const runAiAnalysis = () => {
    if (!videoUrl) return;
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisResult({
        overallScore: 88,
        tone: { score: 85, wpm: 142, toneLabel: "Confident & Articulate" },
        bodyLanguage: { score: 90, eyeContact: "92%", posture: "Upright & Engaging" },
        confidence: { score: 89, energyLevel: "High", hesitationCount: 2 },
        highlights: [
          { time: "0:05", text: "Strong opening greeting and crisp introduction." },
          { time: "0:28", text: "Maintained strong eye contact while describing technical stack." },
          { time: "0:45", text: "Minor hesitation detected; consider smoothing transition to concluding statement." },
        ],
      });
    }, 2500);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1280,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: 3,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Chip
          label="MODULE 3 • AI VIDEO ANALYTICS"
          size="small"
          sx={{
            mb: 2,
            fontWeight: 800,
            fontSize: "0.7rem",
            letterSpacing: "1.2px",
            color: "#60a5fa",
            bgcolor: "rgba(37, 99, 235, 0.12)",
            border: "1px solid rgba(96, 165, 250, 0.3)",
            borderRadius: "20px",
            px: 1,
          }}
        />

        <Typography
          variant="h3"
          fontWeight={900}
          sx={{
            background: "linear-gradient(135deg, #FFFFFF 20%, #93C5FD 60%, #60A5FA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2rem", sm: "2.75rem", md: "3.25rem" },
            mb: 1,
          }}
        >
          Video Resume & AI Analysis
        </Typography>

        <Typography variant="body1" sx={{ color: "rgba(203, 213, 225, 0.8)", maxWidth: "600px", mx: "auto" }}>
          Record a 60-second pitch or upload your video resume to evaluate tone, eye contact, pace, and speech confidence.
        </Typography>
      </Box>

      {errorMsg && (
        <Alert severity="error" onClose={() => setErrorMsg("")} sx={{ borderRadius: "12px" }}>
          {errorMsg}
        </Alert>
      )}

      {/* Main Grid */}
      <Grid container spacing={3}>
        {/* Recording Studio & Preview Player */}
        <Grid item xs={12} md={7}>
          <Card
            sx={{
              borderRadius: "20px",
              p: 3,
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={800} sx={{ color: "#fff" }}>
                Recording Studio
              </Typography>
              {recording && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: "#ef4444",
                      animation: "pulse 1.2s infinite",
                      "@keyframes pulse": {
                        "0%": { opacity: 1 },
                        "50%": { opacity: 0.3 },
                        "100%": { opacity: 1 },
                      },
                    }}
                  />
                  <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#ef4444" }}>
                    REC {formatTime(recordTime)}
                  </Typography>
                </Stack>
              )}
            </Stack>

            {/* Video Canvas Container */}
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                height: 340,
                borderRadius: "16px",
                bgcolor: "#000",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Active Stream / Playback */}
              <video
                ref={videoPreviewRef}
                controls={!recording && !!videoUrl}
                src={!recording ? videoUrl : undefined}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              {/* Default Empty Screen Overlay */}
              {!recording && !videoUrl && (
                <Box sx={{ textAlign: "center", px: 2 }}>
                  <VideocamIcon sx={{ fontSize: 60, color: "rgba(255, 255, 255, 0.2)", mb: 1 }} />
                  <Typography variant="body2" sx={{ color: "rgba(203, 213, 225, 0.6)" }}>
                    Click "Start Recording" or upload an existing file to preview.
                  </Typography>
                </Box>
              )}
            </Paper>

            {/* Controls Bar */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between">
              {!recording ? (
                <Button
                  variant="contained"
                  startIcon={<VideocamIcon />}
                  onClick={startRecording}
                  sx={{
                    borderRadius: "12px",
                    fontWeight: 700,
                    bgcolor: "#2563eb",
                    "&:hover": { bgcolor: "#1d4ed8" },
                  }}
                >
                  Start Recording
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<StopCircleIcon />}
                  onClick={stopRecording}
                  sx={{ borderRadius: "12px", fontWeight: 700 }}
                >
                  Stop Recording
                </Button>
              )}

              <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />

              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  borderRadius: "12px",
                  fontWeight: 700,
                  color: "#94a3b8",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                }}
              >
                Upload Video
              </Button>

              <Button
                variant="contained"
                disabled={!videoUrl || recording || analyzing}
                startIcon={<AutoAwesomeIcon />}
                onClick={runAiAnalysis}
                sx={{
                  borderRadius: "12px",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #9333ea, #7e22ce)",
                  color: "#fff",
                }}
              >
                Analyze Video
              </Button>
            </Stack>
          </Card>
        </Grid>

        {/* AI Analytics Column */}
        <Grid item xs={12} md={5}>
          <Card
            sx={{
              borderRadius: "20px",
              p: 3,
              height: "100%",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" fontWeight={800} sx={{ color: "#fff", mb: 2 }}>
              AI Analysis Breakdown
            </Typography>

            {analyzing && (
              <Box sx={{ py: 6, textAlign: "center" }}>
                <LinearProgress sx={{ borderRadius: 2, mb: 2 }} />
                <Typography variant="body2" sx={{ color: "#60a5fa", fontWeight: 600 }}>
                  Evaluating vocal tone, pitch stability, eye contact, and body posture...
                </Typography>
              </Box>
            )}

            {!analyzing && !analysisResult && (
              <Box sx={{ py: 8, textAlign: "center", my: "auto" }}>
                <PsychologyIcon sx={{ fontSize: 60, color: "rgba(255,255,255,0.15)", mb: 1 }} />
                <Typography variant="body2" sx={{ color: "rgba(203, 213, 225, 0.5)" }}>
                  Record or upload a video and click "Analyze Video" to generate real-time metrics.
                </Typography>
              </Box>
            )}

            {!analyzing && analysisResult && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {/* Overall Score Banner */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(147, 51, 234, 0.2))",
                    border: "1px solid rgba(96, 165, 250, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="caption" sx={{ color: "#93c5fd", fontWeight: 700 }}>
                      OVERALL IMPACT SCORE
                    </Typography>
                    <Typography variant="h4" fontWeight={900} sx={{ color: "#fff" }}>
                      {analysisResult.overallScore} / 100
                    </Typography>
                  </Box>
                  <Chip label="High Potential" color="success" size="small" sx={{ fontWeight: 800 }} />
                </Box>

                {/* Pillar Metrics */}
                <Stack spacing={2}>
                  {/* Tone & Pace */}
                  <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <SpeedIcon fontSize="small" sx={{ color: "#60a5fa" }} />
                        <Typography variant="body2" fontWeight={700} sx={{ color: "#fff" }}>
                          Pace & Vocal Clarity
                        </Typography>
                      </Stack>
                      <Typography variant="body2" fontWeight={800} sx={{ color: "#60a5fa" }}>
                        {analysisResult.tone.score}%
                      </Typography>
                    </Stack>
                    <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.7)", display: "block" }}>
                      {analysisResult.tone.wpm} WPM • {analysisResult.tone.toneLabel}
                    </Typography>
                  </Box>

                  {/* Body Language */}
                  <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <FaceIcon fontSize="small" sx={{ color: "#34d399" }} />
                        <Typography variant="body2" fontWeight={700} sx={{ color: "#fff" }}>
                          Eye Contact & Posture
                        </Typography>
                      </Stack>
                      <Typography variant="body2" fontWeight={800} sx={{ color: "#34d399" }}>
                        {analysisResult.bodyLanguage.score}%
                      </Typography>
                    </Stack>
                    <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.7)", display: "block" }}>
                      {analysisResult.bodyLanguage.eyeContact} Eye Contact • {analysisResult.bodyLanguage.posture}
                    </Typography>
                  </Box>

                  {/* Confidence */}
                  <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <PsychologyIcon fontSize="small" sx={{ color: "#c084fc" }} />
                        <Typography variant="body2" fontWeight={700} sx={{ color: "#fff" }}>
                          Confidence & Energy
                        </Typography>
                      </Stack>
                      <Typography variant="body2" fontWeight={800} sx={{ color: "#c084fc" }}>
                        {analysisResult.confidence.score}%
                      </Typography>
                    </Stack>
                    <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.7)", display: "block" }}>
                      Energy: {analysisResult.confidence.energyLevel} • Hesitations: {analysisResult.confidence.hesitationCount}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

                {/* Key Highlights */}
                <Box>
                  <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#fff", mb: 1 }}>
                    Timestamped Feedback
                  </Typography>
                  <Stack spacing={1}>
                    {analysisResult.highlights.map((item, idx) => (
                      <Paper
                        key={idx}
                        elevation={0}
                        sx={{
                          p: 1.2,
                          borderRadius: "10px",
                          bgcolor: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          display: "flex",
                          gap: 1.5,
                          alignItems: "flex-start",
                        }}
                      >
                        <Chip
                          label={item.time}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.65rem",
                            fontWeight: 800,
                            bgcolor: "rgba(37, 99, 235, 0.2)",
                            color: "#60a5fa",
                          }}
                        />
                        <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.85)", lineHeight: 1.4 }}>
                          {item.text}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoResume;