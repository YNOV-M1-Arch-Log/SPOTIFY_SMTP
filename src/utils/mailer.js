import nodemailer from 'nodemailer';
import { env } from "../config/env.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: parseInt(env.smtpPort),
  secure: env.smtpPort === 465,
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass,
  },
});

export const sendMail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"SPOTIFY" <noreply@mailtrap.io>`,
    to,
    subject,
    html,
    attachments: [
      {
        filename: 'logo_fleximate.png',
        path: path.resolve(__dirname, '../assets/logo_fleximate.png'),
        cid: 'logo-header',
      },
      {
        filename: 'label_ceweb.png',
        path: path.resolve(__dirname, '../assets/label_ceweb.png'),
        cid: 'logo-footer',
      },
    ],
  });
};
