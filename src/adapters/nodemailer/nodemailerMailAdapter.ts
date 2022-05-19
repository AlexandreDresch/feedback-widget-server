import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from "../mailAdapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c4d82ee3af4f9e",
      pass: "1e3e2a55742f70"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
   async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Feedback Widget Team <test@feedback.com>',
            to: 'Owner <owner@feedback.com>',
            subject,
            html: body,
        });
    };
}

// [
//     `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
//     `<p>Feedback type: ${type}</p>`,
//     `<p>Comment: ${comment}</p>`,
//     `</div>`
// ].join('\n')