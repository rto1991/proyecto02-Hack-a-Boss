"use strict";

const sendGridMail = require("@sendgrid/mail");

sendGridMail.setApiKey(process.env.SECRET_API_KEY);

const sendMail = async (to, subject, body) => {
  try {
    const message = {
      to,
      from: process.env.SENGRID_FROM,
      text: body,
      html: `
    <div>
    <h1>${subject}<h1>
    <p>${body}<p>
    <div>
    `,
    };
    await sendGridMail.send(message);
  } catch (error) {
    console.log("Error en el envió del email", error);
  }
};

module.exports = sendMail;
