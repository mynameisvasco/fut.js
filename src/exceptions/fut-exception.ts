export class FutException extends Error {
  constructor(message: string, public readonly parameters?: any) {
    super(message);
  }
}
