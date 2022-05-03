const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const connectionString = process.env.ATLAS_URI;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;
let mongooseConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('jz_wallet');
      console.log('Successfully connected to MongoDB.');

      mongooseConnection = mongoose.connect(
        connectionString,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        () => {
          console.log('Successfully connected to Mongoose.');
        }
      );

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },

  getMongoose: function () {
    return mongooseConnection;
  },
};
