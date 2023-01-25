import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

const { expect } = chai;

import LoginService from '../services/login.services';
import Users from '../database/models/Users';

describe('Login Service', () => {
  afterEach(sinon.restore);

  it('should return a token when the user is logged in', async () => {
    const email = 'admin@admin.com';
    const password = 'secret_admin';
    const token = 'token';
    const loginService = new LoginService({ email, password });
    const stub = sinon.stub(loginService, 'loginUser').resolves(token);
    const response = await loginService.loginUser();
    expect(response).to.equal(token);
    expect(stub.calledOnce).to.be.true;
  });

  it('should return a role when the user is logged in', async () => {
    const id = 1;
    const role = 'admin';
    const loginService = new LoginService({ id });
    const stub = sinon.stub(loginService, 'getRole').resolves(role);
    const response = await loginService.getRole();
    expect(response).to.equal(role);
    expect(stub.calledOnce).to.be.true;
  });

  it('should return null when incorrect password', async () => {
    const email = 'admin@admin.com';
    const loginService = new LoginService({ email, password:'secret_admina' });
    const stub = sinon.stub(bcrypt, 'compareSync');
    stub.withArgs('this.password', 'user.password').returns(false);
    const response = await loginService.loginUser();
    expect(response).to.equal(null);
  });

  it('should return null when no user', async () => {
    const id = 7;
    const role = 'admin';
    const loginService = new LoginService({ id });
    const stub = sinon.stub(Users, 'findOne').resolves(null);
    const response = await loginService.getRole();
    expect(response).to.equal(null);
    expect(stub.calledOnce).to.be.true;
  });
});