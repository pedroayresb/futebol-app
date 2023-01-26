import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

const { expect } = chai;

import TeamsService from '../services/teams.services';
import Teams from '../database/models/Teams';



describe('Teams services', () => {
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

    const findAllStub = sinon.stub(Teams, 'findAll').resolves(teams as any);

    const teamsService = new TeamsService({});
    const result = await teamsService.getAll();

    expect(result).to.deep.equal(teams);
    expect(findAllStub.calledOnce).to.be.true;
  });

  it('should get team by id', async () => {
    const team = {
      id: 1,
      teamName: 'Team 1',
    };

    const findOneStub = sinon.stub(Teams, 'findOne').resolves(team as any);

    const teamsService = new TeamsService({ id: 1 });
    const result = await teamsService.getTeamById();

    expect(result).to.deep.equal(team);
    expect(findOneStub.calledOnce).to.be.true;
  });
});
