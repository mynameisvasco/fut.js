export interface GetAccountInfoResponse {
  userAccountInfo: {
    personas: {
      personaId: number;
      returningUser: number;
      personaName: string;
      userState: string;
      trial: boolean;
      trialFree: boolean;
      onlineAccess: boolean;
      userClubList: {
        year: string;
        platform: string;
        clubAbbr: string;
        clubName: string;
        divisionOnline: number; // byte in C# is a number in TypeScript
        lastAccessTime: number;
        teamId: number;
        established: number;
        assetId: number;
        badgeId: number;
        skuAccessList: { [key: string]: number };
      }[];
    }[];
  };
}
