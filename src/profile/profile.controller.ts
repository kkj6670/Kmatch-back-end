import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Get('/:name')
  getProfile(@Param('name') name: string) {
    return this.profileService.getProfile(name);
  }
}
