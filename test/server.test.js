const supertest = require('supertest');
const app = require('../server');

const request = supertest(app);

// it('Gets the product info', async () => {
//   await request.get('/test')
//     .expect(200)
//     .then((res) => {
//       expect(Array.isArray(res.body)).toBeFalsy();
//       expect(res.body.message).toBe('pass!');
//       app.close();
//     });
// });
