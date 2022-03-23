import supertest from 'supertest';
import app from '../app';
import setupDatabase from '../database';

let requestWithSupertest;

beforeAll(async () => {
  await setupDatabase();
  requestWithSupertest = supertest(app);
});

describe('Status Endpoint', () => {
  it('GET / should show server status', async () => {
    const res = await requestWithSupertest.get('/');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('status');
  });
});
