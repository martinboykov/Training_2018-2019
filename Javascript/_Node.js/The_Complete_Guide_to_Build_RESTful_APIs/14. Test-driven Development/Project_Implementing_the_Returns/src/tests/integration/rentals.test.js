const request = require('supertest');
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const { Movie } = require('../../models/movie');
const { Customer } = require('../../models/customer');
const mongoose = require('mongoose');

describe('/api/rentals', () => {
  let app;
  let token;
  let customer;
  let movie;
  let customerId;
  let movieId;
  const exec = async () => {
    return await request(app)
        .post('/api/rentals')
        .set('x-auth-token', token)
        .send({
          customerId: customerId,
          movieId: movieId,
        });
  };

  beforeEach(async () => {
    app = require('../../index');
    token = new User().generateAuthToken();
    customer = new Customer({
      'name': 'Customer #4',
      'phone': '1234567891011',
    });
    movie = new Movie({
      'title': 'The Cube',
      'genre': {
        'name': 'Triler',
      },
      'numberInStock': 7,
      'dailyRentalRate': 38,
    });
    // eslint-disable-next-line new-cap
    customerId = mongoose.Types.ObjectId().toHexString();
    // eslint-disable-next-line new-cap
    movieId = mongoose.Types.ObjectId().toHexString();
  });
  afterEach(async () => {
    app = '';
    if (Rental) {
      await Rental.remove({});
    }
    await User.remove({});
    await Customer.remove({});
    await Movie.remove({});
  });

  describe('POST /', () => {
    // FAILURS
    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });
    it('should return 400 if customerId is not provided', async () => {
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it('should return 400 if movieId is not provided', async () => {
      const res = await exec();

      expect(res.status).toBe(400);
    });


    // SUCCESS
    it('should return the rental if it is valid', async () => {
      customer = await customer.save();
      customerId = customer._id;
      movie = await movie.save();
      movieId = movie._id;
      const res = await exec();
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('customer');
      expect(res.body).toHaveProperty('movie');
      expect(res.status).toBe(200);
    });
  });
});
