import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

const { expect } = chai;

import MatchesServices from '../services/matches.services';
import Matches from '../database/models/Matches';
import { allMatches, inProgressMatches, finisedMatches } from './mocks/matchesMocks';

describe('Matches Service', () => {
  afterEach(sinon.restore);

  it('returns all matches', async () => {
    const getAllMatches = sinon.stub(Matches, 'findAll').returns(allMatches as any);
    const matchesService = new MatchesServices({});
    const matches = await matchesService.getAllMatches();
    expect(getAllMatches.calledOnce).to.be.true;
    expect(matches).to.be.deep.equal(allMatches);
  });

  it('returns in progress matches', async () => {
    const getInProgressMatches = sinon.stub(Matches, 'findAll').returns(inProgressMatches as any);
    const matchesService = new MatchesServices({ inProgress: true });
    const matches = await matchesService.getAllMatches();
    expect(getInProgressMatches.calledOnce).to.be.true;
    expect(matches).to.be.deep.equal(inProgressMatches);
  });

  it('returns finised matches', async () => {
    const getFinisedMatches = sinon.stub(Matches, 'findAll').returns(finisedMatches as any);
    const matchesService = new MatchesServices({ inProgress: false });
    const matches = await matchesService.getAllMatches();
    expect(getFinisedMatches.calledOnce).to.be.true;
    expect(matches).to.be.deep.equal(finisedMatches);
  });

  it('creates a match', async () => {
    const createMatch = sinon.stub(Matches, 'create').returns(finisedMatches[0] as any);
    const matchesService = new MatchesServices({
      homeTeamId: 1,
      awayTeamId: 2,
    });
    const match = await matchesService.createMatch();
    expect(createMatch.calledOnce).to.be.true;
    expect(match).to.be.deep.equal(finisedMatches[0]);
  });
});