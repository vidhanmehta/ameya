// import * as nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND);

export async function sendEmail(email, subject, un, ps) {

  const __dirname = path.resolve();
  const filePath = path.join(__dirname, './utils/mail.html'); 
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    username: un,
    password: ps
  };
  const htmlToSend = template(replacements);

  const { data, error } = await resend.emails.send({
    from: "business@antrikshlabs.com",
    to: [email],
    subject: subject,
    html: htmlToSend
  })
  // const transporter = nodemailer.createTransport({
  //   service: "Gmail",
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: "business@antrikshlabs.com",
  //     pass:""
  //   }
  // });
  // const mailOptions = {
  //   from: '"business@antrikshlabs.com" <business@antrikshlabs.com>',
  //   to: email,
  //   subject: subject,
  //   html: htmlToSend
  // };
  // const info = await transporter.sendMail(mailOptions);
  // console.log("Message sent: %s", info.messageId);

  if (error) {
    return console.error({ error });
  }

  console.log("mail sent", { data });

}