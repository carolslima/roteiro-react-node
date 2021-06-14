declare namespace Express {
  export interface Request {
    user: {
      id: string;
      provider_id: string;
      role: number;
    };
  }
}
