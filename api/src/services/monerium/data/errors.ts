export interface MoneriumError {
  code: number;
  status: string;
  message: string;
  errors: {
    [key: string]: string;
  };
  details: {
    [key: string]: string;
  };
  errorId: string;
}
