import appError from './appError.js';
import { emailTemplates } from './emailTemplate.js';
import transporter from '../email/nodemailer.js';
import dayjs from 'dayjs';

export const sendEmail = async ({ to, type, subscription }) => {
  //   console.log(to);
  //   console.log(type);

  if (!to || !type) return console.log('required parameters missed');
  const template = emailTemplates.find((t) => t.label === type);
  if (!template) return console.log('invalid email type');

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate),
    planName: subscription.name,
    price: `${subscription.price} ${subscription.currency}`,
    paymentMethod: subscription.paymentMethod,
  };
  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: 'meda5103@gmail.com',
    to: to,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.log(err, 'error sending email');

    console.log('email sent successfuly');
  });
};
