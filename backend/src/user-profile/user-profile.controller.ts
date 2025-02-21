import { Body, Controller, Post } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';

@Controller()
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
  @Post('getUser') //define the POST route /getUser
  async getUser(@Body() body: { userId: string }) {
    const userId = body.userId;
    const user = await this.userProfileService.findOne(userId);
    if (!user) {
      return { error: 'User not found' }; //Return an error if user is not found
    }
    return user;
  }
}
