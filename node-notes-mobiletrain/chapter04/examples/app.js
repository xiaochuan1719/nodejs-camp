"use strict";
const nodemailer = require("nodemailer");

// 1. 创建发送邮件的对象
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",  // 发送方邮箱
    port: 465,  // 端口号
    secure: true,  // true for 465, false for other ports
    auth: {
        user: '634018102@qq.com',  // 发送方的邮箱地址
        pass: 'jidchfqkovqebcbj'  // 发送方邮箱的授权码      
    }
});

// 2. 创建邮件信息
let info = {
    from: '"Y2K0 👻" <634018102@qq.com>',
    to: "634018102@qq.com, swordman210@126.com",
    subject: "888888",
    text: "您的验证码是 888888，有效期五分钟",
    // html: "<b>Hello world?</b>"
};

// 3. 发送邮件
transporter.sendMail(info, (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Official Demo: https://nodemailer.com/about/
// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass // generated ethereal password
//     }
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>" // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);
