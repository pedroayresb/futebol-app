import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesService from '../services/matches.services';
import { allMatches, inProgressMatches, finisedMatches } from './mocks/matchesMocks';

import { Response } from 'superagent';
import TeamsService from '../services/teams.services';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches controllers', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should get all matches', async () => {
    const getAllStub = sinon.stub(MatchesService.prototype, 'getAllMatches').resolves(allMatches as any);

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(allMatches);
    expect(getAllStub.calledOnce).to.be.true;
  });

  it('should get in progress matches', async () => {
    const getInProgressStub = sinon.stub(MatchesService.prototype, 'getInProgressMatches').resolves(inProgressMatches as any);

    const response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(inProgressMatches);
    expect(getInProgressStub.calledOnce).to.be.true;
  });

  it('should get finished matches', async () => {
    const getFinishedStub = sinon.stub(MatchesService.prototype, 'getInProgressMatches').resolves(finisedMatches as any);

    const response = await chai.request(app).get('/matches?inProgress=false');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(finisedMatches);
    expect(getFinishedStub.calledOnce).to.be.true;
  });

  it('should create match', async () => {
    const request = {
      homeTeamId: 16,
      awayTeamId: 8, 
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    }

    const match = {
      id: 1,
      homeTeamId: 16,
      awayTeamId: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true,
    }

    sinon.stub(TeamsService.prototype, 'getTeamById').onCall(0).resolves({ id: 16, teamName: 'Team 1' } as any).onCall(1).resolves({ id: 8, teamName: 'Team 2' } as any);

    const createMatchStub = sinon.stub(MatchesService.prototype, 'createMatch').resolves(match as any);
    
    sinon.stub(jwt, 'verify').returns({ id: 1, role: 'admin' } as any);
    const response = await chai.request(app).post('/matches').send(request).set('Authorization', 'token');

    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal(match);
    expect(createMatchStub.calledOnce).to.be.true;
  });

  it('should not create match with team that does not exist', async () => {
    const request = {
      homeTeamId: 16,
      awayTeamId: 99,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    }

    sinon.stub(TeamsService.prototype, 'getTeamById').onCall(0).resolves({ id: 16, teamName: 'Team 1' } as any).onCall(1).resolves(null);

    sinon.stub(jwt, 'verify').returns({ id: 1, role: 'admin' } as any);

    const createMatchStub = sinon.stub(MatchesService.prototype, 'createMatch').resolves('error');
    const response = await chai.request(app).post('/matches').send(request).set('Authorization', 'token');

    expect(response.status).to.equal(404);
    expect(createMatchStub.calledOnce).to.be.true;
  });
  
  it('should not create match with same team', async () => {
    const request = {
      homeTeamId: 16,
      awayTeamId: 16,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    }
  
    sinon.stub(jwt, 'verify').returns({ id: 1, role: 'admin' } as any);

    const response = await chai.request(app).post('/matches').send(request).set('Authorization', 'token');

    expect(response.status).to.equal(422);
  });

  it('should update match', async () => {
    const request =  {
      homeTeamGoals: 3,
      awayTeamGoals: 1
    }

    const match = {
      id: 1,
      homeTeamId: 16,
      awayTeamId: 8,
      homeTeamGoals: 3,
      awayTeamGoals: 1,
      inProgress: true,
    }

    sinon.stub(TeamsService.prototype, 'getTeamById').onCall(0).resolves({ id: 16, teamName: 'Team 1' } as any).onCall(1).resolves({ id: 8, teamName: 'Team 2' } as any);

    const updateMatchStub = sinon.stub(MatchesService.prototype, 'updateMatch').resolves(match as any);

    sinon.stub(jwt, 'verify').returns({ id: 1, role: 'admin' } as any);

    const response = await chai.request(app).patch('/matches/1').send(request).set('Authorization', 'token');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(match);
    expect(updateMatchStub.calledOnce).to.be.true;
  });

  it('should not update match that does not exist', async () => {
    const request =  {
      homeTeamGoals: 3,
      awayTeamGoals: 1
    }
    sinon.stub(TeamsService.prototype, 'getTeamById').onCall(0).resolves({ id: 16, teamName: 'Team 1' } as any).onCall(1).resolves({ id: 8, teamName: 'Team 2' } as any);
    sinon.stub(MatchesService.prototype, 'updateMatch').resolves(null);

    sinon.stub(jwt, 'verify').returns({ id: 1, role: 'admin' } as any);

    const response = await chai.request(app).patch('/matches/1').send(request).set('Authorization', 'token');

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ error: 'Match not found' });
  });

  it('should finish the match', async () => {
    const request =  {
      homeTeamId: 3,
      awayTeamId: 1
    }

    const match = {
      id: 1,
      homeTeamId: 16,
      awayTeamId: 8,
      homeTeamGoals: 3,
      awayTeamGoals: 1,
      inProgress: false,
    }

    sinon.stub(TeamsService.prototype, 'getTeamById').onCall(0).resolves({ id: 16, teamName: 'Team 1' } as any).onCall(1).resolves({ id: 8, teamName: 'Team 2' } as any);

    const updateMatchStub = sinon.stub(MatchesService.prototype, 'finishMatch').resolves(match as any);

    sinon.stub(jwt, 'verify').returns({ id: 1, role: 'admin' } as any);

    const response = await chai.request(app).patch('/matches/1/finish').send(request).set('Authorization', 'token');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'Finished' });
    expect(updateMatchStub.calledOnce).to.be.true;
  });

  it('should not finish the match that does not exist', async () => {
    const request =  {
      homeTeamGoals: 3,
      awayTeamGoals: 1
    }
    sinon.stub(TeamsService.prototype, 'getTeamById').onCall(0).resolves({ id: 16, teamName: 'Team 1' } as any).onCall(1).resolves({ id: 8, teamName: 'Team 2' } as any);
    sinon.stub(MatchesService.prototype, 'finishMatch').resolves(null);

    sinon.stub(jwt, 'verify').returns({ id: 1, role: 'admin' } as any);

    const response = await chai.request(app).patch('/matches/1/finish').send(request).set('Authorization', 'token');

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ error: 'Match not found' });
  });
});
