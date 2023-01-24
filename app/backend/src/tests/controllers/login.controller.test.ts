import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
import LoginService from '../../services/login.services';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Controller', () => {
  afterEach(sinon.restore);

  it('should return 200 and a token when the user is logged in', async () => {
    const email = 'pedro@pedro.com';
    const password = '123456';
    const token = 'token';
    const loginService = new LoginService({ email, password });
    const stub = sinon.stub(loginService, 'loginUser').resolves({token});
    const response = await chai.request(app).post('/login').send({ email, password });
    expect(response.status).to.equal(200);
    expect(response.body).to.equal(token);
    expect(stub.calledOnce).to.be.true;
  });
});
