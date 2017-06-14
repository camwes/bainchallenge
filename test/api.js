(function(){
  'use strict';

  const assert  = require('assert');
  const expect  = require('chai').expect;
  const request = require('supertest');

  describe('Providers Database', () => {
    describe('Get GA providers with (40000 < average coverage charges < 50000) and (6000 < average medicare payments < 10000)', () => {
      it('should return 138 providers', (done) => {
        request('http://localhost:8000')
          .get('/providers?max_average_covered_charges=50000&min_average_covered_charges=40000&min_average_medicare_payments=6000&max_average_medicare_payments=10000&state=GA')
          .expect(200)
          .expect((res) => {
            return expect(res.body.length).to.equal(138);
          })
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      });
    });
    describe('Get CA providers with (40000 < average coverage charges < 50000) and (6000 < average medicare payments < 10000)', () => {
      it('should return 935 providers', (done) => {
        request('http://localhost:8000')
          .get('/providers?max_average_covered_charges=50000&min_average_covered_charges=40000&min_average_medicare_payments=6000&max_average_medicare_payments=10000&state=CA')
          .expect(200)
          .expect((res) => {
            return expect(res.body.length).to.equal(935);
          })
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      });
    });
    describe('Get all providers', () => {
      it('should return 138 providers', (done) => {
        request('http://localhost:8000')
          .get('/providers')
          .expect(200)
          .expect((res) => {
            return expect(res.body.length).to.equal(163065);
          })
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      }).timeout(10000);
    });
  });
}());
