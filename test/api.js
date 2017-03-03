var request = require('supertest');

describe('Routing', function(){

  var server;

  beforeEach(function(){
    server = require('../src/server.js');
  });

  afterEach(function(){
    server.close();
  });

  it('should load.', function(done) {
    request(server)
      .get('/api/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, done);
  });
});