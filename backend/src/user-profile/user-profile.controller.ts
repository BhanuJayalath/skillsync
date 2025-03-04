import { Body, Controller, Post } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
// import { put } from '@vercel/blob';

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

  // @Post('uploadImage') //define the POST route /getUser
  // async uploadImage(@Body() req: Request) {
  //   const form = await req.formData();
  //   const file = form.get('file') as File;
  //   if (!file.name) {
  //     return { error: 'No file provided' }; //Return an error if file is not found
  //   }
  //   const blob = await put(file.name, file, {
  //     access: 'public',
  //   });
  //   return Response.json(blob);
  // }
}
