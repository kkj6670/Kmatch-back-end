import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

console.log(process.env.API_KEY, 'KEY');

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'X-Riot-Token': process.env.API_KEY,
      }, // object of headers you want to set
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
