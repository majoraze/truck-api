const moment = require('moment');
const validator = require('validator');
const { createConnection } = require('../../mongoose/connection');
const { generatePaginateOptions } = require('../../utils/pagination');
const { responseSuccess, responseInternalError } = require('../../utils/response');
const PossiblePeriods = require('../../utils/enums/possibile-period-values');
const Driver = require('../../mongoose/models/driver');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    let { queryStringParameters } = event;
    queryStringParameters = queryStringParameters || {};

    await createConnection();

    const { loaded, truckOwner, countOnly, period } = queryStringParameters;
    const query = {};

    if (loaded) { 
      if (!validator.isBoolean(loaded)) return responseInternalError({ message: `You must provide a boolean value for the loaded parameter.` });
      query.loaded = loaded;
    }

    if (truckOwner) { 
      if (!validator.isBoolean(truckOwner)) return responseInternalError({ message: `You must provide a boolean value for the truckOwner parameter.` });
      query.truckOwner = truckOwner;
    }

    if (countOnly && !validator.isBoolean(countOnly)) return responseInternalError({ message: `You must provide a boolean value for the countOnly parameter.` });

    if (period) { 
      if (!PossiblePeriods.POSSIBLE_PERIOD_VALUES.includes(period)) return responseInternalError({ message: `You must provide one of the following values for the period parameter: ${PossiblePeriods.POSSIBLE_PERIOD_VALUES.join(', ')}.` });
      if (PossiblePeriods.DAILY == period) {
        query.arrivedAt = { $gte: moment().startOf('day').toDate(), $lte: moment().toDate() };
      } else if (PossiblePeriods.WEEKLY == period) {
        query.arrivedAt = { $gte: moment().startOf('week').toDate(), $lte: moment().toDate() };
      } else if (PossiblePeriods.MONTHLY == period) {
        query.arrivedAt = { $gte: moment().startOf('month').toDate(), $lte: moment().toDate() };
      }
    }

    const optionsPaginate = generatePaginateOptions(queryStringParameters);

    let data;
    if (!countOnly) {
      data = await Driver.paginate(query, optionsPaginate);
    } else {
      data = await Driver.countDocuments(query);
      data = { count: data };
    }

    return responseSuccess(data);
  } catch (error) {
    return responseInternalError(error);
  }
}
