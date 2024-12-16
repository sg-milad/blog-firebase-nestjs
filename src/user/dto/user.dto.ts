import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsEnum,
  IsAlpha,
} from 'class-validator';

enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  DEVELOPER = 'DEVELOPER',
}

export class UserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password for the user. Must be 8-20 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
    example: 'StrongPass1!',
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    description: 'First name of the user. Only alphabetic characters are allowed.',
    example: 'John',
  })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user. Only alphabetic characters are allowed.',
    example: 'Doe',
  })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  lastName: string;

  @ApiProperty({
    description: 'Role of the user. Can be ADMIN, USER, or DEVELOPER.',
    enum: Roles,
    example: Roles.USER,
  })
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
