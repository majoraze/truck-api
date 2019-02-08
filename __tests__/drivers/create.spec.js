const mongoose = require('mongoose');
const mockingoose = require('mockingoose').default;
const connection = require('../../mongoose/connection');
const Driver = require('../../fixtures/driver');
const { handler } = require('../../services/drivers/create');

jest.mock('../../mongoose/connection');

describe('Create Driver:', () => {
  let createConnectionMock;

  const _id = new mongoose.Types.ObjectId().toHexString();

  const driverValid = {
    _id,
    ...Driver.validDriver()
  };

  const context = {};

  beforeAll(() => {
    createConnectionMock = connection.createConnection = jest.fn();
    createConnectionMock.mockImplementation(() => Promise.resolve());
  });

  it('testing creation driver success', async (done) => {
    const event = { body: JSON.stringify(driverValid) };
    const response = { _id };

    mockingoose.Driver.toReturn(driverValid, 'save');
    const result = await handler(event, context);

    expect(result).toHaveProperty('statusCode', 201);
    expect(result).toHaveProperty('body');
    expect(JSON.parse(result.body)).toHaveProperty('data', response);
    done();
  });

  it('testing creation driver error', async (done) => {
    const context = {};
    const event = { body: JSON.stringify(driverValid) };

    mockingoose.Driver.toReturn(new Error('Timeout'), 'save');

    const result = await handler(event, context);

    expect(result).toHaveProperty('statusCode', 500);
    expect(result).toHaveProperty('body');
    expect(JSON.parse(result.body)).toHaveProperty('message', 'Timeout');
    done();
  });
});
