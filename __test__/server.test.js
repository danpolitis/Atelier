const supertest = require('supertest');
const app = require('../server/app.js');

describe('int::app', () => {
  let request = null;
  let server = null;

  beforeAll((done) => {
    server = app.listen(done);
    request = supertest.agent(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('Gets the product info', async () => {
    await request.get('/test')
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeFalsy();
        expect(res.body.message).toBe('pass!');
      });
  });

  it('Gets the Product info and style', async () => {
    await request.get('/products/42366')
    .expect(200)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeFalsy();
      expect(res.body.message).toBe('pass!');
    });
  });

  it('Gets the related', async () => {
  });

  it('Gets the reviews and metadata', async () => {
    await request.get('/api/reviews?product_id=42366')
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.results)).toBeTruthy();
      });
  });

  it('Gets the questions', async () => {
  });
});
