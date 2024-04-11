import { Squad } from "../models/squad";

export interface GetSbcSetSquadResponse {
  challengeId: number;
  playerRequirements: { index: 0; playerType: string }[];
  squad: Squad;
}
