import { Test } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { databaseProviders } from './database.provider';

describe('Database Providers', () => {
  let connection: mongoose.Connection;

  const mockMongooseConnect = jest.fn().mockImplementation(() => {
    connection = mongoose.connection;
    return connection;
  });

  beforeAll(async () => {
    jest.spyOn(mongoose, 'connect').mockImplementation(mockMongooseConnect);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should create a database connection', async () => {
    await Test.createTestingModule({
      providers: databaseProviders,
    }).compile();

    expect(mockMongooseConnect).toHaveBeenCalledWith(process.env.DATABASE_URL);
    expect(connection).toBeDefined();
  });
});
