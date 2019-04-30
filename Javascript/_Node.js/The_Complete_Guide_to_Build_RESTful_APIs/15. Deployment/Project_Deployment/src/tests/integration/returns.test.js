const request = require('supertest');
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const { Movie } = require('../../models/movie');
const { Customer } = require('../../models/customer');
const mongoose = require('mongoose');

describe('/api/returns', () => {
  describe('POST /', () => {
    let app;
    let token;
    let customer;
    let movie;
    let customer2;
    let movie2;
    let rental;
    let rental2;
    let customerId;
    let movieId;
    const exec = async () => {
      return await request(app)
          .post('/api/returns')
          .set('x-auth-token', token)
          .send({
            customerId: customer._id,
            movieId: movie._id,
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
      customer2 = new Customer({
        'name': 'Customer #1',
        'phone': '1234567891011',
      });
      movie2 = new Movie({
        'title': 'The Cube',
        'genre': {
          'name': 'Triler',
        },
        'numberInStock': 7,
        'dailyRentalRate': 38,
      });
      rental = new Rental({
        customer: {
          _id: customer._id,
          name: customer.name,
          phone: customer.phone,
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate,
        },
      });
      rental2 = new Rental({
        customer: {
          _id: customer._id,
          name: customer.name,
          phone: customer.phone,
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate,
        },
        dateReturned: '2018-09-15 22:55:57.463',
      });
      // eslint-disable-next-line new-cap
      customerId = mongoose.Types.ObjectId().toHexString();
      // eslint-disable-next-line new-cap
      movieId = mongoose.Types.ObjectId().toHexString();
    });
    afterEach(async () => {
      app = '';
      await Rental.remove({});
      await User.remove({});
      await Customer.remove({});
      await Movie.remove({});
    });
    // -------
    // FAILURS
    // -------
    it('should return 401 if no token/ not logged-in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });
    it(`should return 400 if customerId
    is not provided/ not eligible`, async () => {
      const res = await request(app)
          .post('/api/returns')
          .set('x-auth-token', token)
          .send({
            customerId: customerId,
          });
      expect(res.status).toBe(400);
    });
    it(`should return 400 if movieId
     is not provided/ not eligible`, async () => {
      const res = await request(app)
          .post('/api/returns')
          .set('x-auth-token', token)
          .send({
            movieId: movieId,
          });

      expect(res.status).toBe(400);
    });
    it(`should return 400 if Rental is processed`, async () => {
      rental2 = await rental2.save();

      const res = await request(app)
          .post('/api/returns')
          .set('x-auth-token', token)
          .send({
            movieId: movie2._id,
            customerId: customer2._id,
          });

      expect(res.status).toBe(400);
    });
    it('should return 404 if no rental is found', async () => {
      customer = await customer.save();
      movie = await movie.save();
      rental = await rental.save();
      customer2 = await customer2.save();
      movie2 = await movie2.save();

      const res = await request(app)
          .post('/api/returns')
          .set('x-auth-token', token)
          .send({
            movieId: movie2._id,
            customerId: customer2._id,
          });

      expect(res.status).toBe(404);
    });


    it('should return 200 if rental is returned', async () => {
      customer = await customer.save();
      movie = await movie.save();
      rental = await rental.save();

      const res = await request(app)
          .post('/api/returns')
          .set('x-auth-token', token)
          .send({
            movieId: movie._id,
            customerId: customer._id,
          });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('dateOut');
      expect(res.body).toHaveProperty('rentalFee');
      expect(res.body).toHaveProperty('dateReturned');
      expect(res.body).toHaveProperty('customer');
      expect(res.body).toHaveProperty('movie');
    });
  });
});
