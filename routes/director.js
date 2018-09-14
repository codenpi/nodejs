const express = require('express'),
   mongoose = require('mongoose'),
  router = express.Router();

//Models
const  Director = require('../models/Director');

/* GET director page. */
router.post('/', (req, res, next) =>
  {
    const director = new Director(req.body);
    const promise  = director.save();

    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  }
);

router.get('/', (req,res) => {
  const promise = Director.aggregate([
    {
      $lookup:{
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true //eşleştirmede data boşsa onu yansıtıyor, x direktorü film çekmedi gibi
      }
    },

    {
      $group:{  //dataları gruplamak içni X direktörünün filmlerini alt alta getiriyor
        _id:{
          _id: '$_id',
          name: '$name',
          surname:  '$surname',
          bio:  '$bio'
        },
        movies:{
          $push: '$movies'
        }

      }
    },
    {
      $project:{
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        movies: '$movies'
      }
    }

  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })

});

router.get('/:director_id', (req,res) => {
  const promise = Director.aggregate([
    {
      $match:{
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup:{
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true //eşleştirmede data boşsa onu yansıtıyor, x direktorü film çekmedi gibi
      }
    },

    {
      $group:{  //dataları gruplamak içni X direktörünün filmlerini alt alta getiriyor
        _id:{
          _id: '$_id',
          name: '$name',
          surname:  '$surname',
          bio:  '$bio'
        },
        movies:{
          $push: '$movies'
        }

      }
    },
    {
      $project:{
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        movies: '$movies'
      }
    }

  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })

});

module.exports = router;
