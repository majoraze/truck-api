const { createConnection } = require('../../mongoose/connection');
const { responseSuccess, responseInternalError, responseNotfound } = require('../../utils/response');
const Driver = require('../../mongoose/models/driver');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id } = event.pathParameters;
  let body = JSON.parse(event.body);

  try {
    await createConnection();

    body.updatedAt = new Date();

    const driver = await Driver.findByIdAndUpdate(id, body);
    if (!driver) return responseNotfound({ message: `Driver id: ${id} not found` });

    return responseSuccess({ _id: driver.id });
  } catch (error) {
    return responseInternalError(error);
  }
}
