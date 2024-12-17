import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  signUp(@Body() userRequest: UserDto): Promise<UserRecord> {
    return this.userService.createUser(userRequest);
  }
}
