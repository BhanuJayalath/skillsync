import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { User } from './user-profile.schema';

@Controller()
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
  @Get('getUser/:id') //define the POST route /getUser
  async getUser(@Param('id') id: string) {
    const user = await this.userProfileService.findUser(id);
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

  @Patch('saveTestMark')
  async saveTestMark(
    @Body('userId') userId: string,
    @Body('jobId') jobId: string,
    @Body('testId') testId: string,
    @Body('score') score: number,
  ) {
    return this.userProfileService.saveTestMark(userId, jobId, testId, score);
  }

  @Get('allUsers')
  async getAllUsers(): Promise<User[]> {
    return this.userProfileService.getAllUsers();
  }

  @Delete('deleteUser/:userId')
  async deleteUser(
    @Param('userId') userId: string,
  ): Promise<{ message: string }> {
    return this.userProfileService.deleteUser(userId);
  }
}
