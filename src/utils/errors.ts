export class InvalidPasswordError extends Error {
  constructor(message?: any) {
    super(message);
  }
  name: string;
  stack?: string;
}
export class StoreAccessTokenError extends Error {
  constructor(message?: any) {
    super(message);
  }
  name: string;
  stack?: string;
}
