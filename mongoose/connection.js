const mongoose = require('mongoose');

let hasConnection = false;

const mongoConnection = {
  async createConnection (uri = process.env.MONGO_URI) {
    if (hasConnection) return;
    const connection = await mongoose.connect(uri);
    hasConnection = true;
    return connection;
  },
  closeConnection () {
    mongoose.connection.close();
  }
}

mongoose.connection.on('connected', () => {
  console.log(`Mongo connected`);
})

mongoose.connection.on('disconnected', () => {
  console.log(`Mongo has disconnected`);
  hasConnection = false;
})

module.exports = mongoConnection;
