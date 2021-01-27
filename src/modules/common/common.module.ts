import { Global, Module } from '@nestjs/common';
import { ExistsValidator } from './validator/exists.validator';
import { UniqueValidator } from './validator/unique.validator';

@Global()
@Module({
  providers: [UniqueValidator, ExistsValidator],
})
export class CommonModule {}
