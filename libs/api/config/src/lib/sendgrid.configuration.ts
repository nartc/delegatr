import { Inject } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export const sgConfiguration = registerAs('sendgrid', () => ({
  apiKey: process.env.SENDGRID_API_KEY,
}));

export const InjectSgConfig = () => Inject(sgConfiguration.KEY);
