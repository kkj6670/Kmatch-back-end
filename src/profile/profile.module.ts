import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
