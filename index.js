const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/fcclientcontact", async (req, res) => {
  try {
    const {
      fName,
      lName,
      email,
      phone,
      company,
      job,
      account,
      bookKeep,
      business,
      tax,
      message,
    } = req.body;
    // Setup Nodemailer transport
    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com", // Use your SMTP service (Gmail, Outlook, etc.)
      auth: {
        user: "webmaster@farukhicompany.com", // Replace with your email
        pass: "Farukhic@2030", // Replace with your email password or app password
        // pass: "ywus obbt lmkz qtqm", // Replace with your email password or app password
      },
    });
    // Email content
    let mailOptions = {
      from: "webmaster@farukhicompany.com",
      to: email, // Uncomment if needed
      cc: "cellmehroz@gmail.com",
      subject: "Your trusted tax advisors | Contact",
      text: `
                First Name: ${fName}
                Last Name: ${lName}
                Email: ${email}
                Phone: ${phone}
                Company: ${company}
                Job: ${job}
                Accounting: ${account}
                Bookkeeping: ${bookKeep}
                Business Consulting: ${business}
                Taxation: ${tax}
                Message: ${message}
            `,
    };
    // Send email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log("Server started on port : " + PORT);
});
