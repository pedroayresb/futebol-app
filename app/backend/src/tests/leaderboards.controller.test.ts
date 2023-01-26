import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { getHomeClassification, getAwayClassification, getAllClassification } from '../controllers/leaderboards.controllers';
import LeaderboardsService from '../services/leaderboards.services';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
import { mockedAllLeaderboards, mockedHomeLeaderboards, mockedAwayLeaderboards } from './mocks/leaderboardsMocks';

describe('Leaderboards Controller', () => {
  afterEach(sinon.restore);

  it('returns all Leaderboards', async () => {
    sinon.stub(LeaderboardsService, 'getAllClassification').resolves(mockedAllLeaderboards);
    const response = await chai.request(app).get('/leaderboard');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(mockedAllLeaderboards);
  });

  it('returns home Leaderboards', async () => {
    sinon.stub(LeaderboardsService, 'getHomeClassification').resolves(mockedHomeLeaderboards);
    const response = await chai.request(app).get('/leaderboard/home');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(mockedHomeLeaderboards);
  });

  it('returns away Leaderboards', async () => {
    sinon.stub(LeaderboardsService, 'getAwayClassification').resolves(mockedAwayLeaderboards);
    const response = await chai.request(app).get('/leaderboard/away');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(mockedAwayLeaderboards);
  });
});