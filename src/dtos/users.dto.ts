import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsEnum } from 'class-validator';
import { Roles, SubscriptionType } from '../models/users.model';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsString()
  @IsOptional()
  public branch: String;

  @IsString()
  @IsOptional()
  @IsEnum(SubscriptionType)
  public subscription_type: String;

  @IsString()
  @IsEnum(Roles)
  public role: String;

  @IsString()
  @IsOptional()
  public image: String;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export class AdminUpdateUserDto {
  @IsString()
  @IsOptional()
  public image: String;

  @IsString()
  @IsOptional()
  @IsEnum(SubscriptionType)
  public subscription_type: String;

  @IsString()
  @IsOptional()
  public branch: String;
}
