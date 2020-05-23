import { Inject } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export const webConfiguration = registerAs('web', () => ({
  verifyEndpoint: `/verify`,
}));

export const InjectWebConfig = () => Inject(webConfiguration.KEY);
