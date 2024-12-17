import { Injectable, BadRequestException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { FirebaseAdmin } from 'src/configs/firebase.setup';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly admin: FirebaseAdmin,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,) { }

  async createUser(userRequest: UserDto): Promise<UserRecord> {
    const { email, password, firstName, lastName, role } = userRequest;
    const app = this.admin.setup();

    try {
      const createdUser = await app.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
      });
      const user = this.userRepository.create({ uId: createdUser.uid })
      await this.userRepository.save(user)
      await app.auth().setCustomUserClaims(createdUser.uid, { role });
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async findOneUser(uId: string) {
    return await this.userRepository.findOne({ where: { uId: uId } })
  }
}
