import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  static readonly REQUIRED_KEYS: Array<{ key: string; minLength?: number; hint?: string }> = [
    { key: 'APP_ENV' },
    { key: 'DB_HOST' },
    { key: 'DB_PORT' },
    { key: 'DB_DATABASE' },
    { key: 'DB_USERNAME' },
    { key: 'DB_PASSWORD' },
    { key: 'JWT_SECRET_KEY', minLength: 32, hint: 'Generate a strong value with: openssl rand -base64 32' },
  ];

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    this.validateRequiredKeys();
  }

  private validateRequiredKeys(): void {
    for (const { key, minLength, hint } of ConfigService.REQUIRED_KEYS) {
      const value = this.envConfig[key];
      if (!value || value.trim() === '') {
        const message = `Required config key "${key}" is not set.${hint ? ' ' + hint : ''}`;
        throw new Error(message);
      }
      if (minLength && value.length < minLength) {
        const message = `Config key "${key}" must be at least ${minLength} characters (got ${value.length}).${hint ? ' ' + hint : ''}`;
        throw new Error(message);
      }
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  isEnv(env: string) {
    return this.envConfig.APP_ENV === env;
  }
}
