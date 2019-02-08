const { createConnection } = require('../../mongoose/connection');
const { responseCreatedSuccess, responseInternalError } = require('../../utils/response');
const Driver = require('../../mongoose/models/driver');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let body = JSON.parse(event.body);

  body.arrivedAt = body.arrivedAt || new Date();
  body.createdAt = new Date();
  body.updatedAt = new Date();

  try {
    await createConnection();
    const driver = await Driver.create(body);

    const response = { data: { _id: driver._id } };
    return responseCreatedSuccess(response);
  } catch (error) {
    return responseInternalError(error);
  }
}
