const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const nodemailer = require("nodemailer");
const twilio = require("twilio");

// Initialize Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Initialize Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function runStandaloneTest() {
  try {
    console.log("--------------------------------------------------");
    console.log("🚀 Starting Direct Notification Engine Test...");
    console.log("--------------------------------------------------\n");

    // 1. Send Email Notification
    console.log("📧 Dispatching Email to rnityasree@gmail.com...");
    const emailInfo = await transporter.sendMail({
      from: `"ElevateHire Alert Engine" <${process.env.EMAIL_USER}>`,
      to: "rnityasree@gmail.com",
      subject: "🚨 URGENT INTERVIEW ALERT: Senior Full Stack Engineer at ElevateHire AI",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; background-color: #0b0f19; color: #ffffff; border-radius: 12px; max-width: 600px; margin: auto;">
          <h2 style="color: #60a5fa; margin-top: 0;">🔥 Urgent 48-Hour Interview Alert</h2>
          <p style="font-size: 16px;">Hi <strong>R Nitya Sree</strong>,</p>
          <p style="font-size: 15px; color: #cbd5e1;">A new position matching your technical skills has been posted on ElevateHire!</p>
          <div style="background-color: rgba(255, 255, 255, 0.05); padding: 18px; border-radius: 10px; margin: 20px 0; border: 1px solid rgba(255, 255, 255, 0.1);">
            <p style="margin: 6px 0;"><strong>Role:</strong> <span style="color: #60a5fa;">Senior Full Stack Engineer</span></p>
            <p style="margin: 6px 0;"><strong>Company:</strong> ElevateHire AI</p>
            <p style="margin: 6px 0;"><strong>Interview Date:</strong> Tomorrow at 10:00 AM</p>
          </div>
          <p style="font-size: 14px; color: #94a3b8;">Log in to your ElevateHire portal to review the job requirements and apply.</p>
        </div>
      `,
    });
    console.log("✅ Email Dispatched! Message ID:", emailInfo.messageId);

    // 2. Send WhatsApp Notification
    console.log("\n💬 Dispatching WhatsApp Alert to +919986599599...");
    const whatsappMessage = await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: "whatsapp:+919986599599",
      contentSid: process.env.TWILIO_CONTENT_SID,
    });
    console.log("✅ WhatsApp Dispatched! SID:", whatsappMessage.sid);

    console.log("\n--------------------------------------------------");
    console.log("✨ ALL NOTIFICATIONS DELIVERED SUCCESSFULLY!");
    console.log("--------------------------------------------------");
  } catch (error) {
    console.error("\n❌ Dispatch Failed:", error.message || error);
  }
}

runStandaloneTest();