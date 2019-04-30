const { User } = require('../../models/user');
const { Genre } = require('../../models/genre');
const request = require('supertest');
let app;
describe('auth middleware', () => {
  beforeEach(async () => {
    app = require('../../index');
    await Genre.remove({});
  });
  afterEach(async () => {
    app = '';
    await Genre.remove({});
  });

  let token;

  const exec = () => {
    return request(app)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name: 'genre1' });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it('should return 401 if no token is provided', async () => {
    token = '';

    const res = await exec();

    expect(res.status).toBe(401);
    await Genre.remove({});
  });

  it('should return 400 if token is invalid', async () => {
    token = 'a';

    const res = await exec();

    expect(res.status).toBe(400);
    await Genre.remove({});
  });

  it('should return 200 if token is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
    await Genre.remove({});
  });
});
