const request = require('supertest');
const { Genre } = require('../../models/genre');
let server;

describe('/api/genres', () => {
    // as we need to loadd the server aggain and aggain =>
    // we will get error, as the server will be already runnging =>
    // beforeEach/afterEach start/close the server
    beforeEach(() => {
        server = require('../../index');
    });
    afterEach(async () => {
        server.close();

        // we need to clean the db after every test run
        await Genre.remove({});
    });
    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            // asserting that we get the two objects above in the db_test
            expect(res.body.length).toBe(2);

            // making sure that we have name: genre1 in the response obj
            expect(res.body.some((g) => {
                return g.name === 'genre1';
            }
            )).toBeTruthy();
            expect(res.body.some((g) => {
                return g.name === 'genre2';
            }
            )).toBeTruthy();
        });
    });
});
