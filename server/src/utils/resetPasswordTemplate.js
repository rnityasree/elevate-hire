const FRONTEND_URL = "http://localhost:5173";

const resetPasswordTemplate = (name, token) => `
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<style>

body{
background:#f4f7fb;
font-family:Arial,sans-serif;
padding:40px;
}

.card{
max-width:600px;
margin:auto;
background:#fff;
border-radius:16px;
overflow:hidden;
box-shadow:0 8px 25px rgba(0,0,0,.08);
}

.header{
background:linear-gradient(135deg,#dc2626,#ef4444);
padding:35px;
text-align:center;
color:#fff;
}

.content{
padding:35px;
color:#444;
line-height:1.8;
}

.button{
display:inline-block;
padding:14px 28px;
background:#dc2626;
color:#fff !important;
text-decoration:none;
border-radius:10px;
font-weight:bold;
margin-top:20px;
}

.warning{
margin-top:25px;
padding:15px;
background:#fef2f2;
border-left:4px solid #dc2626;
border-radius:8px;
}

.footer{
background:#f8fafc;
padding:20px;
text-align:center;
color:#777;
font-size:13px;
}

</style>

</head>

<body>

<div class="card">

<div class="header">

<h1>🔒 Password Reset</h1>

</div>

<div class="content">

<h2>Hello ${name},</h2>

<p>
We received a request to reset your ElevateHire password.
</p>

<p>
Click the button below to create a new password.
</p>

<a
class="button"
href="${FRONTEND_URL}/reset-password/${token}"
target="_blank"
>
Reset Password
</a>

<div class="warning">

<b>This link expires in 15 minutes.</b>

<br><br>

If you didn't request this, you can safely ignore this email.

</div>

</div>

<div class="footer">

© ${new Date().getFullYear()} ElevateHire

</div>

</div>

</body>

</html>
`;

module.exports = {
    resetPasswordTemplate
};