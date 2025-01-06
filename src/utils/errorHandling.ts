export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public field?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    console.error(`${error.code}: ${error.message}`);
    return error.message;
  }
  
  console.error('Unexpected error:', error);
  return 'An unexpected error occurred';
};