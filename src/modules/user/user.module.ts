import { Module } from '@nestjs/common';
import { UsersService } from './user.service';

@Module({
  exports: [UsersService],
  providers: [UsersService],
})
export class UserModule {}
