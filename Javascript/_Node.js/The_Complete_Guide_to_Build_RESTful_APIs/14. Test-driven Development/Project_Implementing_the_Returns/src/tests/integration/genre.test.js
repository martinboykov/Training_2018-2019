const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let app;
describe('/api/genres', () => {
  beforeEach(async () => {
    app = require('../../index');
    // await Genre.remove({});
  });
  afterEach(async () => {
    app = '';
    await Genre.remove({});
    await User.remove({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      const genres = [
        { name: 'genre1' },
        { name: 'genre2' },
      ];

      await Genre.collection.insertMany(genres);

      const res = await request(app).get('/api/genres');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body.some((g) => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some((g) => g.name === 'genre2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a genre if valid id is passed', async () => {
      const genre = new Genre({ name: 'genre1' });
      await genre.save();

      const res = await request(app).get('/api/genres/' + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(app).get('/api/genres/1');

      expect(res.status).toBe(404);
    });

    it('should return 404 if no genre with the given id exists', async () => {
      const id = mongoose.Types.ObjectId(); // eslint-disable-line new-cap
      const res = await request(app).get('/api/genres/' + id);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the
    // test.
    let token;
    let name;

    const exec = async () => {
      return await request(app)
          .post('/api/genres')
          .set('x-auth-token', token)
          .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'genre1';
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if genre is less than 5 characters', async () => {
      name = '1234';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 50 characters', async () => {
      name = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should save the genre if it is valid', async () => {
      await exec();

      const genre = await Genre.find({ name: 'genre1' });

      expect(genre).not.toBeNull();
    });

    it('should return the genre if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });
  describe('PUT /:id', () => {
    it('should return 400 if genre is less than 5 characters', async () => {
      let genre = new Genre({ name: 'genre1' });
      genre = await genre.save();
      const name = '1234';
      const token = new User().generateAuthToken();
      const res = await request(app)
          .put(`/api/genres/${genre._id}`)
          .set('x-auth-token', token)
          .send({ name });

      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 50 characters', async () => {
      let genre = new Genre({ name: 'genre1' });
      genre = await genre.save();
      const name = new Array(52).join('a');
      const token = new User().generateAuthToken();
      const res = await request(app)
          .put(`/api/genres/${genre._id}`)
          .set('x-auth-token', token)
          .send({ name });

      expect(res.status).toBe(400);
    });
    it('should return 404 if genre is not found', async () => {
      let genre = new Genre({ name: 'genre1' });
      genre = await genre.save();
      const name = 'Updated';
      const token = new User().generateAuthToken();
      // eslint-disable-next-line new-cap
      const _id = mongoose.Types.ObjectId().toHexString();
      genre = await Genre.findById(_id);
      expect(genre).toBeNull();
      const res = await request(app)
          .put(`/api/genres/${_id}`)
          .set('x-auth-token', token)
          .send({ name });

      expect(res.status).toBe(404);
    });
    it('should return 200 if genre is updated succesfully', async () => {
      let genre = new Genre({ name: 'genre1' });
      genre = await genre.save();
      const name = 'Updated';
      const token = new User().generateAuthToken();
      const res = await request(app)
          .put(`/api/genres/${genre._id}`)
          .set('x-auth-token', token)
          .send({ name });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', name);
    });
  });
  describe('DELETE /:id', () => {
    it('should return 404 if genre is not found', async () => {
      let genre = new Genre({ name: 'genre1' });
      genre = await genre.save();
      const token = new User({ isAdmin: true }).generateAuthToken();
      // eslint-disable-next-line new-cap
      const _id = mongoose.Types.ObjectId().toHexString();
      genre = await Genre.findById(_id);
      expect(genre).toBeNull();
      const res = await request(app)
          .delete(`/api/genres/${_id}`)
          .set('x-auth-token', token);

      expect(res.status).toBe(404);
    });
    it('should return 403 if user is not admin', async () => {
      let genre = new Genre({ name: 'genre1' });
      genre = await genre.save();
      const token = new User({ isAdmin: false }).generateAuthToken();
      const res = await request(app)
          .delete(`/api/genres/${genre._id}`)
          .set('x-auth-token', token);

      expect(res.status).toBe(403);
    });
    it('should return 200 if genre was deleted succesfully', async () => {
      let genre = new Genre({ name: 'genre1' });
      genre = await genre.save();
      const token = new User({ isAdmin: true }).generateAuthToken();
      const res = await request(app)
          .delete(`/api/genres/${genre._id}`)
          .set('x-auth-token', token);

      expect(res.status).toBe(200);
    });
  });
});
