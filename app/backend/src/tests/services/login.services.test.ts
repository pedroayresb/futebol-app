import * as sinon from 'sinon';
import * as chai from 'chai';

import LoginService from '../../services/login.services';

describe('Login Service', () => {
  afterEach(sinon.restore);

  it('should return a token when the user is logged in', async () => {
    const email = 'pedro@pedro.com';
    const password = '123456';
    const token = 'token';
    const loginService = new LoginService({ email, password });
    const stub = sinon.stub(loginService, 'loginUser').resolves({token});
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
});