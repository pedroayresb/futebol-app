import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LoginService from '../services/login.services';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const INCORRECT_EMAIL_OR_PASSWORD = { message: 'Incorrect email or password' };

describe('Login Controller', () => {
  afterEach(sinon.restore);

  it('should return 200 and a token when the user is logged in', async () => {
    const email = 'admin@admin.com';
    const password = 'secret_admin';
    const token = 'token';
    const loginService = new LoginService({ email, password });
    const stub = sinon.stub(jwt, 'sign').returns(token as any);
    sinon.stub(loginService, 'loginUser').resolves(token);
    const response = await chai.request(app).post('/login').send({ email, password });
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ token });
  });

  it('should return 401 when no user', async () => {
    const email = 'admina@admin.com';
    const password = 'secret_admin';
    const loginService = new LoginService({ email, password });
    const response = await chai.request(app).post('/login').send({ email, password });
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal(INCORRECT_EMAIL_OR_PASSWORD);
  });
});
