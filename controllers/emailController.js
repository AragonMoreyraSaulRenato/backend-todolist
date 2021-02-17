const Queue = require('../lib/Queue');

exports.send = async (req, res) => {
   const { to, name, subject, content } = req.body;

   const user = {
      to, name, subject, content
   }

   await Queue.add('RegistrationMail', { user })
   return res.json({ msg: `We will send a message to ${to}` });
}

exports.user = async (req, res) => {
   const { to, name, subject, content } = req.body;

   const user = {
      to, name, subject, content
   }

   await Queue.add('UserReport', { user })
   return res.json({ msg: `We will send a message to ${to}` });
}
