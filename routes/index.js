"use strict";

const express = require('express'),
  router = express.Router();

const aes256 = require('nodejs-aes256');
const jwt = require("jsonwebtoken");


//models
const User  = require('../models/Users');

/* GET home page. */
router.get('/', (req, res, next) =>
  res.render('index', {
    title: 'Express'
  }));

router.post('/register', (req, res, next) => {
    const {username, password} = req.body;

    const Hpassword = aes256.encrypt('Aes256N0d3jSF!ndK3Y!', password);

    const user = new User({
      username,
      password: Hpassword
    });

    const promise = user.save();

    promise.then((data) => {
      if (!data)
        next({  message: 'user not insert database', code:79  });

      res.json({  status: 1 });
    }).catch((err) => {
      res.json(err)
    });
});


router.post('/authention', (req, res, next) =>{
    const {username,  password} = req.body;

    User.findOne({
      username
    },  (err, user) => {
      if (err)
        throw err;

      if (!user){
        res.json({
            status: false,
            message: 'Authention failed, user not found.'
        });
      }else{
        const deHash = aes256.decrypt('Aes256N0d3jSF!ndK3Y!', user.password);
          if (deHash !== password){
              res.json({
                status: false,
                message: 'password does not match.'
              });
          }else{
            const payload = {
              username
            };

            const token = jwt.sign(payload, req.app.get('api_secret_key'), {expiresIn: 720});

            res.json({
              status: true,
              token: token
            })
          }
      }

    });


});

module.exports = router;
