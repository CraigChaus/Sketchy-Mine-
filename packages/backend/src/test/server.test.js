import supertest from 'supertest';
import server from '../app';

const requestWithSupertest = supertest(server);

describe('Status Endpoint', () => {
  it('GET / should show server status', async () => {
    const res = await requestWithSupertest.get('/');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('status');
  });
});
