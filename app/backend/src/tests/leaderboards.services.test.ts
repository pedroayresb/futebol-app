import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

const { expect } = chai;

import LeaderboardsService from '../services/leaderboards.services';
import Matches from '../database/models/Matches';
import LeaderboardsCreator from '../utils/leaderboardsCreator';
import { mockedAllLeaderboards, mockedHomeLeaderboards, mockedAwayLeaderboards } from './mocks/leaderboardsMocks';
import { finisedMatches } from './mocks/matchesMocks';

describe('Leaderboards Service', () => {
  afterEach(sinon.restore);

  it('returns all Leaderboards', async () => {
    sinon.stub(Matches, 'findAll').resolves(finisedMatches as any);
    sinon.stub(LeaderboardsCreator.prototype, 'calculateAllLeaderboards').returns(mockedAllLeaderboards);
    const response = await LeaderboardsService.getAllClassification();

    expect(response).to.deep.equal(mockedAllLeaderboards);
  });

  it('returns home Leaderboards', async () => {
    sinon.stub(Matches, 'findAll').resolves(finisedMatches as any);
    sinon.stub(LeaderboardsCreator.prototype, 'calculateHomeLeaderboards').returns(mockedHomeLeaderboards);
    const response = await LeaderboardsService.getHomeClassification();

    expect(response).to.deep.equal(mockedHomeLeaderboards);
  });

  it('returns away Leaderboards', async () => {
    sinon.stub(Matches, 'findAll').resolves(finisedMatches as any);
    sinon.stub(LeaderboardsCreator.prototype, 'calculateAwayLeaderboards').returns(mockedAwayLeaderboards);
    const response = await LeaderboardsService.getAwayClassification();

    expect(response).to.deep.equal(mockedAwayLeaderboards);
  });
});

