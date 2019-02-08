const { createConnection } = require('../../mongoose/connection');
const { generatePaginateOptions } = require('../../utils/pagination');
const { responseSuccess, responseInternalError } = require('../../utils/response');
const Driver = require('../../mongoose/models/driver');
const TruckType = require('../../mongoose/models/truck-type');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { truckType = 'not-found' } = event.pathParameters;
    let { queryStringParameters } = event;
    queryStringParameters = queryStringParameters || {};

    await createConnection();

    // checking if the truck type exists in collection
    const checkTruckType = await TruckType.findOne({ cod: truckType }).lean();
    if (!checkTruckType) return responseInternalError({ message: `You must provide a valid truck type code.` });

    const query = { 'truckType.cod': parseInt(truckType, 10) };

    const optionsPaginate = generatePaginateOptions(queryStringParameters);
    optionsPaginate.select = 'origin destination';

    let data = await Driver.paginate(query, optionsPaginate);

    return responseSuccess(data);
  } catch (error) {
    return responseInternalError(error);
  }
}
