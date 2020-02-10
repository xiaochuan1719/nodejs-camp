"use strict";
const nodemailer = require("nodemailer");

// 1. 创建发送邮件的对象
let transporter = nodemailer.createTransport({
  host: "smtp.qq.com", // 发送方邮箱
  port: 465, // 端口号
  secure: true, // true for 465, false for other ports
  auth: {
    user: "634018102@qq.com", // 发送方的邮箱地址
    pass: "jidchfqkovqebcbj" // 发送方邮箱的授权码
  }
});

const sendMail = (mail, code) => {
  // 邮件信息
  let info = {
    from: '"Y2K0 👻" <634018102@qq.com>',
    to: mail,
    subject: "888888",
    text: `您的验证码是 ${code}，有效期五分钟`
    // html: "<b>Hello world?</b>"
  };

  // 封装 Promise 对象
  return new Promise((resolve, reject) => {
    // 发送邮件
    transporter.sendMail(info, (err, data) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });
};

// module.exports = { sendMail: sendMail }
module.exports = { sendMail };
