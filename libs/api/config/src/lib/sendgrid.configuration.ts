import { Inject } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export const sgConfiguration = registerAs('sendgrid', () => ({
  apiKey:
    process.env.SENDGRID_API_KEY ||
    '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',
}));

export const InjectSgConfig = () => Inject(sgConfiguration.KEY);
