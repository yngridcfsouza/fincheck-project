import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninDto {
  /* você pode costumizar mensagens @IsString({ message: 'O email precisa ser uma string' }) */
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
