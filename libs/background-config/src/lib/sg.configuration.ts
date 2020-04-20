import { registerAs } from '@nestjs/config';

export const sgConfiguration = registerAs('sendgrid', () => ({
  apiKey: process.env.SENDGRID_API_KEY,
}));
