import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty({
    message: 'email is required.',
  })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'password is required.',
  })
  password: string;
}
