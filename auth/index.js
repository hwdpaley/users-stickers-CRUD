const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../db/user');

router.get('/', (req, res) => {
  res.json({
    message: 'auth'
  });
});

function validUser(user) {
  const valiemail = typeof user.email == 'string' && user.email.trim() != '';
  const valipassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.length > 6;
  return valiemail && valipassword;
}

router.post('/signup', (req, res, next) => {
  if (validUser(req.body)) {
    User
      .getOneByEmail(req.body.email)
      .then(user => {
        console.log('user', user);
        if (!user) {
          // user is not use
          bcrypt.hash(req.body.password, 12)
            .then((hash) => {
              const user = {
                email: req.body.email,
                password: hash,
                created_at: new Date()
              }
              User
                .create(user)
                .then(id => {
                  res.json({
                    id,
                    message: 'signup'
                  });
                });
            });

        } else {
          //email in use
          next(new Error('email in use'));
        }
      });
  } else {
    next(new Error('validate email or password'));
  }
});

router.post('/login', (req, res, next) => {
  if (validUser(req.body)) {
    User
      .getOneByEmail(req.body.email)
      .then(user => {
        if (user) {
          console.log('user', user);
          bcrypt.compare(req.body.password, user.password)
            .then(result => {
              if (result) {
                const isSecret = req.app.get('env') != 'development';
                res.cookie('user_id', user.id, {
                  httpOnly: true,
                  signed: true,
                  secure: isSecret
                });
                res.json({
                  user,
                  message: '登录成功'
                });
              } else {
                next(new Error('非法登录！'));
              }
            })

        } else {
          next(new Error('非法登录！'));
        }
      });
  } else {
    next(new Error('非法登录！'));
  }
});
module.exports = router;