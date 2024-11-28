'use server'

import nodemailer from 'nodemailer'

export async function sendFeedback(name: string, email: string, message: string) {
  const transporter = nodemailer.createTransport({
    // Configure your email service here
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.DEVELOPER_EMAIL,
    subject: `Gratitude Vault Feedback from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  }

  await transporter.sendMail(mailOptions)
}

