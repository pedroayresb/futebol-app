import LeaderboardsCreator from "../utils/leaderboardsCreator";
import { finisedMatches } from "./mocks/matchesMocks";
import { mockedAllLeaderboards, mockedHomeLeaderboards, mockedAwayLeaderboards } from "./mocks/leaderboardsMocks";
import { expect } from "chai";

describe("Leaderboards Creator", () => {
  it("returns all Leaderboards", async () => {
    const leaderboardsCreator = new LeaderboardsCreator(finisedMatches as any);
    const response = leaderboardsCreator.calculateAllLeaderboards();

    expect(response).to.deep.equal(mockedAllLeaderboards);
  });

  it("returns home Leaderboards", async () => {
    const leaderboardsCreator = new LeaderboardsCreator(finisedMatches as any);
    const response = leaderboardsCreator.calculateHomeLeaderboards();

    expect(response).to.deep.equal(mockedHomeLeaderboards);
  });

  it("returns away Leaderboards", async () => {
    const leaderboardsCreator = new LeaderboardsCreator(finisedMatches as any);
    const response = leaderboardsCreator.calculateAwayLeaderboards();

    expect(response).to.deep.equal(mockedAwayLeaderboards);
  });
});
