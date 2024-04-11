export interface SubmitSbcSetResponse {
  challengeId: number;
  setId: number;
  grantedChallengeAwards: {
    value: number;
    type: string;
    halId: number;
    count: number;
    isUntradeable: boolean;
    loan: number;
    loanType: string;
  }[];
}
