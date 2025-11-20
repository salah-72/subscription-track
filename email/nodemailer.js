import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'meda5103@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;
