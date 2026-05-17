import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  private static readonly REQUIRED_KEYS: { key: string; minLength?: number }[] = [
    { key: 'JWT_SECRET_KEY', minLength: 32 },
  ];

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    this.validateRequiredKeys();
  }

  private validateRequiredKeys(): void {
    for (const { key, minLength } of ConfigService.REQUIRED_KEYS) {
      const value = this.envConfig[key];
      if (!value || value.trim() === '') {
        throw new Error(
          `Required config key "${key}" is not set. ` +
          `Generate a strong value (e.g., openssl rand -base64 32) and add it to your .env file.`,
        );
      }
      if (minLength && value.length < minLength) {
        throw new Error(
          `Config key "${key}" must be at least ${minLength} characters (got ${value.length}). ` +
          `Generate a strong value with: openssl rand -base64 32`,
        );
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
