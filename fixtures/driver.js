const faker = require('faker/locale/pt_BR');
const Driver = require('../mongoose/models/driver');
const TruckType = require('./truck-type');

module.exports.create = async () => {
  const body = [];
  const driversFaked = 1000;
  
  // faking drivers
  for (let i = 0; i < driversFaked; i++) {
    body.push(this.validDriver());
  }

  return Driver.create(body);
}

module.exports.validDriver = () => {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    birthDate: faker.date.between('1980-01-01', '1999-12-31'),
    gender: faker.random.boolean() ? 'Masculino' : 'Feminino',
    truckOwner: faker.random.boolean(),
    licenseType: faker.helpers.shuffle(['A', 'B', 'C'])[0],
    loaded: faker.random.boolean(),
    truckType: faker.helpers.shuffle(TruckType.seed())[0],
    origin: {
      lat: faker.address.latitude(),
      lng:faker.address.longitude()
    },
    destination: {
      lat: faker.address.latitude(),
      lng:faker.address.longitude()
    },
    arrivedAt: faker.date.recent(45), // randomize last 45 days
    updatedAt: new Date(),
    createdAt: new Date()
  };
}