const mongoose  = require('mongoose');

module.exports  = () => {
  mongoose.connect('mongodb://movie_user:abcd1234@ds155352.mlab.com:55352/movie-api',{ useNewUrlParser: true });

  mongoose.connection.on('open', () => {
    //console.log("MongoDB Connected");
  });

  mongoose.connection.on('error', (err) => {
      console.log("MongoDB ERROR : ", err);
  });
};
