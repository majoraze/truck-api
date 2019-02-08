const TruckType = require('../mongoose/models/truck-type');

module.exports.create = async () => {
  const body = this.seed();
  
  return TruckType.create(body);
}

module.exports.seed = () => {
  return [
    {
      cod: 1,
      name: 'Caminhão 3/4'
    },
    {
      cod: 2,
      name: 'Caminhão Toco'
    },
    {
      cod: 3,
      name: 'Caminhão Truck'
    },
    {
      cod: 4,
      name: 'Carreta Simples'
    },
    {
      cod: 5,
      name: 'Carreta Eixo Estendido'
    }
  ];
};