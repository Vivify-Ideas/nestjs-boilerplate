import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ExistsValidator } from './validator/exists.validator';
import { UniqueValidator } from './validator/unique.validator';

@Global()
@Module({
  providers: [UniqueValidator, ExistsValidator, PrismaService],
  exports: [PrismaService]
})
export class CommonModule {}
