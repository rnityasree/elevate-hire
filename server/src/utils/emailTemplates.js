const FRONTEND_URL = "http://localhost:5173";

const welcomeTemplate = (name) => `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Welcome to ElevateHire</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:#f4f7fb;
    font-family:Arial,Helvetica,sans-serif;
    padding:40px 15px;
}

.container{
    max-width:650px;
    margin:auto;
}

.card{
    background:#ffffff;
    border-radius:18px;
    overflow:hidden;
    box-shadow:0 10px 30px rgba(0,0,0,.08);
}

.header{
    background:linear-gradient(135deg,#2563eb,#4338ca,#7c3aed);
    color:white;
    text-align:center;
    padding:45px 30px;
}

.header h1{
    font-size:34px;
    margin-bottom:10px;
}

.header p{
    font-size:17px;
    opacity:.95;
}

.content{
    padding:40px;
    color:#444;
    line-height:1.8;
}

.content h2{
    margin-bottom:20px;
    color:#111827;
}

.content p{
    margin-bottom:18px;
}

.featureBox{
    background:#f8fafc;
    border:1px solid #e5e7eb;
    border-radius:12px;
    padding:25px;
    margin:30px 0;
}

.featureBox h3{
    margin-bottom:15px;
    color:#2563eb;
}

.feature{
    margin:10px 0;
    font-size:15px;
}

.buttonWrapper{
    text-align:center;
    margin:35px 0;
}

.button{
    display:inline-block;
    padding:15px 34px;
    background:#2563eb;
    color:#ffffff !important;
    text-decoration:none;
    border-radius:10px;
    font-weight:bold;
    font-size:16px;
}

.footer{
    background:#f8fafc;
    text-align:center;
    padding:25px;
    color:#6b7280;
    font-size:13px;
}

</style>

</head>

<body>

<div class="container">

<div class="card">

<div class="header">

<h1>🚀 Welcome to ElevateHire</h1>

<p>Your AI Powered Career Platform</p>

</div>

<div class="content">

<h2>Hello ${name}, 👋</h2>

<p>
Welcome to <strong>ElevateHire</strong>.
Your account has been successfully created.
</p>

<p>
We're excited to help you discover internships,
jobs, AI resume analysis, career insights,
and much more.
</p>

<div class="featureBox">

<h3>What's Next?</h3>

<div class="feature">✅ Complete your profile</div>

<div class="feature">📄 Upload your Resume</div>

<div class="feature">🤖 Get AI Resume Analysis</div>

<div class="feature">💼 Discover Jobs & Internships</div>

<div class="feature">🎯 Track your Career Journey</div>

</div>

<div class="buttonWrapper">

<a
href="${FRONTEND_URL}/dashboard"
class="button"
target="_blank"
>

Go to Dashboard →

</a>

</div>

<p>
Thank you for joining the ElevateHire community.
We're here to help you elevate your career.
</p>

</div>

<div class="footer">

© ${new Date().getFullYear()} ElevateHire<br>

AI Powered Career Platform

</div>

</div>

</div>

</body>

</html>
`;

module.exports = {
    welcomeTemplate
};