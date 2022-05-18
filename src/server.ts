import express from "express";
import nodemailer from 'nodemailer';

import { prisma } from "./prisma";

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c4d82ee3af4f9e",
      pass: "1e3e2a55742f70"
    }
  });

app.post('/feedbacks', async (req, res) => {
    const{ type, comment, screenshot } = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type, 
            comment, 
            screenshot,
        }
    })

    await transport.sendMail({
        from: 'Feedback Widget Team <test@feedback.com>',
        to: 'Owner <owner@feedback.com>',
        subject: 'New feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Feedback type: ${type}</p>`,
            `<p>Comment: ${comment}</p>`,
            `</div>`
        ].join('\n')
    });

    return res.status(201).json({ data: feedback });
})

app.listen(3333, () => {
    console.log('HTTP server listening!');
});