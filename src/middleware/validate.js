import { AppError } from './errorHandler.js';

export function validate(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = result.error.issues || result.error.errors || [];
      const messages = issues.map(e => e.message).join(', ');
      throw new AppError(messages, 400);
    }
    req.validatedBody = result.data;
    next();
  };
}
