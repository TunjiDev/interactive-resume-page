const nodemailer = require('nodemailer');
const ejs = require('ejs');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url = 1) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Igbatayo Adetunji <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD
            }
        });
    }

    async send(template, subject) {
        const html = await ejs.renderFile(`${__dirname}/../src/views/email/${template}.ejs`, {
            name: this.name,
            url: this.url,
            subject
        });

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html, 
            text: htmlToText.fromString(html)
        };

        await this.newTransport().sendMail(mailOptions);
    }

    async sendMessage() {
        await this.send('hello', 'Thank you for reaching out to me!');
    }
};