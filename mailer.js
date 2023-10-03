const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "olskerLotta@gmail.com",
    pass: "dqel gwll xxqx zimo",
  },
});

const sendEmail = (emailMessage, to) => {
  const mailOptions = {
    from: "olskerLotta@gmail.com",
    to: to,
    subject: "UN Invitation.",
    text: emailMessage,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
