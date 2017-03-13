const expect = require('chai').expect;
const request = require('supertest');
const app = require('../src/server.js');

describe('CRUD Routes', () => {
  // Test for Multiple Apps
  it('should GET /api/v1/urls returns all urls', (done) => {
    request(app)
      .get('/api/v1/urls')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        const urls = res.body;
        // Save one single app from the list to test on in later tests
        this.app = urls[0];

        expect(urls.length);
      })
      .end(done);
  });
});
