import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { User } from './user-profile.schema';

@Controller()
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
  @Post('getUser') //define the POST route /getUser
  async getUser(@Body() body: { userId: string }) {
    const userId = body.userId;
    const user = await this.userProfileService.findUser(userId);
    if (!user) {
      return { error: 'User not found' }; //Return an error if user is not found
    }
    return user;
  }

  @Patch('updateUser/:id')
  async updateUser(@Param('id') id: string, @Body() updateData: Partial<User>) {
    const updatedUser = await this.userProfileService.updateUser(
      id,
      updateData,
    );

    if (!updatedUser) {
      return { error: 'User not found' };
    }

    return updatedUser;
  }
}
