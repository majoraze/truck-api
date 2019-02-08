const mockingoose = require('mockingoose').default;
const mongoose = require('mongoose');
const connection = require('../../mongoose/connection');
const Driver = require('../../fixtures/driver');
const { handler } = require('../../services/drivers/update');

jest.mock('../../mongoose/connection');

describe('Update Driver:', () => {
  let createConnectionMock;

  const context = {};

  const _id = new mongoose.Types.ObjectId().toHexString();

  const driverValid = {
    _id,
    ...Driver.validDriver()
  };

  beforeAll(() => {
    createConnectionMock = connection.createConnection = jest.fn();
    createConnectionMock.mockImplementation(() => Promise.resolve());
  })

  it('testing update driver success', async (done) => {
    const event = {
      body: JSON.stringify(driverValid),
      pathParameters: { id: _id }
    };

    mockingoose.Driver.toReturn(driverValid, 'findOneAndUpdate');

    const result = await handler(event, context);

    expect(result).toHaveProperty('statusCode', 200);
    expect(result).toHaveProperty('body');
    expect(JSON.parse(result.body)).toHaveProperty('_id', _id);
    done();
  });

  it('testing update driver not exists', async (done) => {
    const event = {
      body: JSON.stringify({}),
      pathParameters: { id: _id }
    };

    const doc = null;
    mockingoose.Driver.toReturn(doc, 'findOneAndUpdate');

    const result = await handler(event, context);

    expect(result).toHaveProperty('statusCode', 404);
    expect(result).toHaveProperty('body');
    expect(JSON.parse(result.body)).toHaveProperty('message', `Driver id: ${_id} not found`);
    done()
  })

  it('testing update driver error', async (done) => {
    const event = {
      body: JSON.stringify({}),
      pathParameters: { id: _id }
    };

    mockingoose.Driver.toReturn(new Error('Timeout'), 'findOneAndUpdate');

    const result = await handler(event, context);
    expect(result).toHaveProperty('statusCode', 500);
    expect(result).toHaveProperty('body');
    expect(JSON.parse(result.body)).toHaveProperty('message', 'Timeout');
    done();
  });
})
