export interface GetUserInfoResponse {
  gotWCEStarterPack: boolean;
  isHighTierReturningUser: boolean;
  isPlayerPicksTemporaryStorageNotEmpty: boolean;
  userInfo: {
    feature: { mtx: number; rivals: number; trade: number };
    accountCreatedPlatformName: string;
    clubAbbr: string;
    clubName: string;
    credits: number;
    draw: number;
    loss: number;
    won: number;
    personaId: number;
    established: string;
    personaName: string;
    reliability: {
      finishedMatches: number;
      matchUnfinishedTime: number;
      reliability: number;
      startedMatches: number;
    };
  };
}
