const request = require('supertest');

let server;

describe('/api/genres', () => {
    // as we need to loadd the server aggain and aggain =>
    // we will get error, as the server will be already runnging =>
    // beforeEach/afterEach start/close the server
    beforeEach(() => {
        server = require('../../index');
    });
    afterEach(() => {
        server.close();
    });

    describe('GET /', () => {
        it('should return all genres', async () => {
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
        });
    });

});
