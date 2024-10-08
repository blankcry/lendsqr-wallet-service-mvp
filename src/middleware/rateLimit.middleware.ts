import rateLimit from 'express-rate-limit';

export const postLimit = rateLimit({
  windowMs: 10 * 1000, // 10 Seconds
  max: 1, // limit each IP to 10 requests per windowMs
  message: 'Too many request, please wait a bit before initiating another.',
});
