const Mail = require('../lib/Email');

module.exports = {
   key: "RegistrationMail",
   async handle({ data }) {
      const { to, name, subject, content } = data.user;
      const dataMail = {
         from: `EmailRegister <goldenhunter21@gmail.com>`,
         to: `${name} <${to}>`,
         subject: `${subject} ✔`,
         text: `${content} ${new Date()} ✔`,
         html: `<b>${content} ${new Date()} ✔</b>`
      }
      await Mail.sendMail(dataMail);

   }
}
