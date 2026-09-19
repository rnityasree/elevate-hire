const nodemailer = require("nodemailer");
const twilio = require("twilio");

// Initialize Nodemailer Transporter with Gmail App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Initialize Twilio Client conditionally
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

/**
 * Send Job Email Notification for ALL matching opportunities
 */
async function sendJobEmailNotification(studentEmail, studentName, jobDetails) {
  try {
    const isUrgent = jobDetails.isUrgent || false;

    const mailOptions = {
      from: `"ElevateHire Alert Engine" <${process.env.EMAIL_USER}>`,
      to: studentEmail,
      subject: `${isUrgent ? "🚨 URGENT INTERVIEW ALERT: " : "💼 New Job Match: "}${jobDetails.title} at ${jobDetails.company}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; background-color: #0b0f19; color: #ffffff; border-radius: 12px; max-width: 600px; margin: auto;">
          <h2 style="color: #60a5fa; margin-top: 0;">
            ${isUrgent ? "🔥 Urgent 48-Hour Interview Alert" : "🎯 New Skill-Matched Job Opportunity"}
          </h2>
          <p style="font-size: 16px;">Hi <strong>${studentName}</strong>,</p>
          <p style="font-size: 15px; color: #cbd5e1;">A new position matching your technical skills has been posted on ElevateHire!</p>
          
          <div style="background-color: rgba(255, 255, 255, 0.05); padding: 18px; border-radius: 10px; margin: 20px 0; border: 1px solid rgba(255, 255, 255, 0.1);">
            <p style="margin: 6px 0; font-size: 15px;"><strong>Role:</strong> <span style="color: #60a5fa;">${jobDetails.title}</span></p>
            <p style="margin: 6px 0; font-size: 15px;"><strong>Company:</strong> ${jobDetails.company}</p>
            <p style="margin: 6px 0; font-size: 15px;"><strong>Interview Date:</strong> <span style="color: ${isUrgent ? "#f59e0b" : "#60a5fa"}; font-weight: bold;">${jobDetails.interviewDate || "To be scheduled"}</span></p>
            <p style="margin: 6px 0; font-size: 15px;"><strong>Matching Skills:</strong> ${jobDetails.skills ? jobDetails.skills.join(", ") : "N/A"}</p>
          </div>

          <p style="font-size: 14px; color: #94a3b8;">Log in to your ElevateHire portal to review the job requirements and apply.</p>
          
          <div style="text-align: center; margin-top: 25px;">
            <a href="http://localhost:5173/jobs" style="background-color: #2563eb; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; display: inline-block;">View Opportunity</a>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Opportunity Email Dispatched:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email Alert Failed:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Send Urgent Job WhatsApp Alert via Twilio (ONLY for 48-Hour Interviews)
 */
async function sendJobSMSNotification(phone, studentName, jobDetails) {
  if (!twilioClient) {
    console.log("ℹ️ Twilio credentials not provided in .env. Skipping WhatsApp dispatch.");
    return { success: false, reason: "Twilio credentials missing" };
  }

  try {
    const recipientFormatted = phone.startsWith("whatsapp:") ? phone : `whatsapp:${phone}`;
    const senderFormatted = `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`;
    const contentSid = process.env.TWILIO_CONTENT_SID;

    const payload = {
      from: senderFormatted,
      to: recipientFormatted,
      contentSid: contentSid,
    };

    const message = await twilioClient.messages.create(payload);

    console.log("✅ Twilio WhatsApp Alert Dispatched successfully! SID:", message.sid);
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error("❌ Twilio WhatsApp Dispatch Error:");
    console.error("   └─ Error Code:", error.code || "N/A");
    console.error("   └─ Error Message:", error.message || error);
    
    return {
      success: false,
      error: error.message || "Twilio WhatsApp dispatch failed",
      code: error.code || null,
    };
  }
}

module.exports = {
  sendJobEmailNotification,
  sendJobSMSNotification,
};