import { Injectable, BadRequestException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { FirebaseAdmin } from 'src/configs/firebase.setup';

@Injectable()
export class UserService {
  constructor(private readonly admin: FirebaseAdmin) { }

  async createUser(userRequest: UserDto): Promise<any> {
    const { email, password, firstName, lastName, role } = userRequest;
    const app = this.admin.setup();

    try {
      const createdUser = await app.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
      });
      await app.auth().setCustomUserClaims(createdUser.uid, { role });
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
