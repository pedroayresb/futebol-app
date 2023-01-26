import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsService from '../services/teams.services';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

describe('Teams controllers', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should get all teams', async () => {
    const teams = [
      {
        id: 1,
        teamName: 'Team 1',
      },
      {
        id: 2,
        teamName: 'Team 2',
      },
    ];

    const getAllStub = sinon.stub(TeamsService.prototype, 'getAll').resolves(teams as any);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(teams);
    expect(getAllStub.calledOnce).to.be.true;
  });

  it('should get team by id', async () => {
    const team = {
      id: 1,
      teamName: 'Team 1',
    };

    const getTeamByIdStub = sinon.stub(TeamsService.prototype, 'getTeamById').resolves(team as any);

    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(team);
    expect(getTeamByIdStub.calledOnce).to.be.true;
  });
});
