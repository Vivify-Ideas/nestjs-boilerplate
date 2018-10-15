import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from 'modules/config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [
        ConfigModule
      ],
      useFactory: async (configService: ConfigService) => {
        return {
          secretOrPrivateKey: configService.get('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: parseInt(configService.get('JWT_EXPIRATION_TIME')),
          }
        }
      },
      inject: [
        ConfigService
      ]
    })
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ]
})
export class AuthModule {}
