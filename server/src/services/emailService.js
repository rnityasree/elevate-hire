const transporter = require("../config/mailConfig");

const sendEmail = async ({
    to,
    subject,
    html,
    text = ""
}) => {
    try {

        const info = await transporter.sendMail({
            from: `"ElevateHire" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
            text
        });

        console.log("✅ Email Sent:", info.messageId);

        return info;

    } catch (error) {

        console.error("❌ Email Error:", error.message);

        throw error;
    }
};

module.exports = {
    sendEmail
};