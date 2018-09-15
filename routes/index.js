"use strict";

const express = require('express'),
  router = express.Router();

const aes256 = require('nodejs-aes256');



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

module.exports = router;
