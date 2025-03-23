import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { User } from './user-profile.schema';

@Controller()
export class UserProfileController {
  //Inject the UserProfileService
  constructor(private readonly userProfileService: UserProfileService) {}
  //Define the POST route /createUser
  @Get('getUser/:id') //define the POST route /getUser
  async getUser(@Param('id') id: string) {
    //Get the user by id
    const user = await this.userProfileService.findUser(id);
    if (!user) {
      return { error: 'User not found' }; //Return an error if user is not found
    }
    return user;
  }

  //Define the PATCH route /createUser
  @Patch('updateUser/:id')
  //Define the updateUser method
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

  //Define the GET route /allUsers
  @Get('allUsers')
  //Define the getAllUsers method
  async getAllUsers(): Promise<User[]> {
    return this.userProfileService.getAllUsers();
  }

  //Define the DELETE route /deleteUser
  @Delete('deleteUser/:userId')
  //Define the deleteUser method
  async deleteUser(
    @Param('userId') userId: string,
  ): Promise<{ message: string }> {
    return this.userProfileService.deleteUser(userId);
  }
}
