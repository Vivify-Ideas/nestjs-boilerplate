import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'modules/config';
import { AuthModule } from 'modules/auth';
import { CommonModule } from 'modules/common';

@Module({
  imports: [ConfigModule, AuthModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
