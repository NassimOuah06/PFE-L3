const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 587,
      secure: "True",
      auth: {
        user: "21financee@gmail.com",
        pass: "sxvs nvqo sapc acel",
      },
    });

    await transporter.sendMail({
      from: "21financee@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
