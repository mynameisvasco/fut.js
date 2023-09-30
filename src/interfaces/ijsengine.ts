export interface IJSEngine {
  getDs(authCode: string): Promise<string>;
  getTel(sid: string, nucleusId: number, personaId: number): Promise<string>;
}
