import { IsString, Length } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @Length(2, 25)
  name: string;

  @IsString()
  @Length(5, 25)
  passwd: string;
}
