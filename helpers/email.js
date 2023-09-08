const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export const sendMail = (to, subject, text, html, bcc) => {
  const message = {
    from: "Kids United Int <kidsunitedint@gmail.com>",
    to: to.join(", "),
    bcc,
    subject,
    text,
    html,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      throw new Error("Connection refused");
    }
  });
};
