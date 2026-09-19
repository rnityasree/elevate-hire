const express = require("express");
const router = express.Router();
const { sendJobEmailNotification, sendJobSMSNotification } = require("../utils/notificationService");

// @route   POST /api/notifications/check-urgent-matches
// @desc    Always send Email for matching job opportunities; Send SMS only if interview is within 48 hours.
router.post("/check-urgent-matches", async (req, res) => {
  try {
    const { studentEmail, studentName, studentPhone, jobDetails } = req.body;

    const recipientEmail = studentEmail || process.env.EMAIL_USER;
    const recipientName = studentName || "Candidate";

    // 1. Calculate hours remaining until interview
    let hoursRemaining = null;
    let isWithin48Hours = false;

    if (jobDetails.interviewTimestamp) {
      const interviewTime = new Date(jobDetails.interviewTimestamp).getTime();
      const currentTime = new Date().getTime();
      hoursRemaining = (interviewTime - currentTime) / (1000 * 3600);
      isWithin48Hours = hoursRemaining > 0 && hoursRemaining <= 48;
    }

    // 2. ALWAYS Send Email Notification for any job opportunity match
    const emailResult = await sendJobEmailNotification(recipientEmail, recipientName, jobDetails);

    // 3. Send SMS ONLY if interview is within the 48-Hour urgent window
    let smsResult = { success: false, reason: "Interview not within 48-hour window" };
    
    if (isWithin48Hours && studentPhone) {
      smsResult = await sendJobSMSNotification(studentPhone, recipientName, jobDetails);
    } else if (isWithin48Hours && !studentPhone) {
      smsResult = { success: false, reason: "No student phone number provided" };
    }

    res.json({
      success: true,
      emailSent: emailResult.success,
      smsSent: smsResult.success,
      smsReason: smsResult.reason || (smsResult.success ? "SMS Dispatched" : "Failed"),
      isUrgent48HrWindow: isWithin48Hours,
      hoursRemaining: hoursRemaining ? Math.round(hoursRemaining) : null,
      message: `Email alert sent to ${recipientEmail}.${
        isWithin48Hours
          ? " 🚨 48-Hour Urgent window active: SMS triggered."
          : " Interview outside 48hr window: SMS skipped."
      }`,
    });
  } catch (error) {
    console.error("Notification Handler Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;