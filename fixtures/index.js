const { createConnection, closeConnection } = require('../mongoose/connection');
const driverFixture = require('./driver');
const truckTypeFixture = require('./truck-type');
const yenv = require('yenv');

const env = yenv('./config/.env.app.yml', { env: 'local' });
const [ operation ] = process.argv.slice(-1);

(async () => {
  try {
    const promises = [];
    const operations = ['create', 'clear'];

    if (operations.indexOf(operation) === -1) throw new Error('Command not found');

    const conn = await createConnection(env.MONGO_URI);

    if (operation === 'create') {
      // asyncs
      promises.push(truckTypeFixture.create());
      await Promise.all(promises);

      // syncs bacause depends on the others
      await driverFixture.create();
    }

    if (operation === 'clear') {
      const collections = await conn.connection.db.collections();
      for (let collection of collections) {
        promises.push(collection.drop());
      }
      await Promise.all(promises);
    }

    closeConnection();
  } catch (error) {
    console.log(JSON.stringify({ message: error.message }, null, 2));
  }
  closeConnection();
})();