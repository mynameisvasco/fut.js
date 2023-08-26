export interface GetUserInfoResponse {
  gotWCEStarterPack: boolean;
  isHighTierReturningUser: boolean;
  isPlayerPicksTemporaryStorageNotEmpty: boolean;
  userInfo: {
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
  };
}
