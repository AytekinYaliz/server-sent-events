const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/app');


chai.use(chaiHttp)

describe('Test..', () => {
   it('should..', done => {
      chai.request(app)
         .get('/')
         .end((err, res) => {
            chai.expect(res.status).to.equal(200);
            done();
         });
   })
})
