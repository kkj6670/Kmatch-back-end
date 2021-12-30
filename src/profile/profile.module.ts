import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'X-Riot-Token': 'RGAPI-302fdcd4-3dc7-442d-86eb-79e4abecbc94',
      }, // object of headers you want to set
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
