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


const ALL_FIELDS_MUST_BE_FILLED = { error: 'All fields must be filled' };
const INCORRECT_EMAIL_OR_PASSWORD = { error: 'Incorrect email or password' };


describe('Login middlewares', () => {
  afterEach(sinon.restore);

  it('should return 400 when no password', async () => {
    const email = 'admin@admin.com';
    const password = '';
    const response = await chai.request(app).post('/login').send({ email, password });
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal(ALL_FIELDS_MUST_BE_FILLED);
  });

  it('should return 400 when no email', async () => {
    const email = '';
    const password = 'secret_admin';
    const response = await chai.request(app).post('/login').send({ email, password });
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal(ALL_FIELDS_MUST_BE_FILLED);
  });

  it('should return 401 when invalid password', async () => {
    const email = 'admin@admin.com';
    const password = '123';
    const response = await chai.request(app).post('/login').send({ email, password });
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal(INCORRECT_EMAIL_OR_PASSWORD);
  });

  it('should return 401 when invalid email', async () => {
    const email = 'admin';
    const password = 'secret_admin';
    const response = await chai.request(app).post('/login').send({ email, password });
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal(INCORRECT_EMAIL_OR_PASSWORD);
  });
});

describe('token middlewares', () => {
  afterEach(sinon.restore);

  it('should return 401 when no token', async () => {
    const response = await chai.request(app).get('/login/validate');
    expect(response.status).to.equal(401);
  });

  it('should return 401 when invalid token', async () => {
    sinon.stub(jwt, 'verify').throws();
    const response = await chai.request(app).get('/login/validate').set('Authorization', 'token');
    expect(response.status).to.equal(401);
  });

  it('should return 200 when valid token', async () => {
    sinon.stub(jwt, 'verify').returns({ id: 1 } as any);
    const response = await chai.request(app).get('/login/validate').set('Authorization', 'token');
    expect(response.status).to.equal(200);
  });
}); 