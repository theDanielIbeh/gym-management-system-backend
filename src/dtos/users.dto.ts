import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsEnum } from 'class-validator';
import { Roles, SubscriptionType } from '../models/users.model';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(32)
  public password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  public first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  public last_name: string;

  @IsString()
  @IsOptional()
  public branch: String;

  @IsString()
  @IsOptional()
  @IsEnum(SubscriptionType)
  public subscription_type: String;

  @IsString()
  @IsOptional()
  @IsEnum(Roles)
  public role: String;

  @IsString()
  @IsOptional()
  public image: String;
}

export class SignInDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(32)
  public password: string;
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

export class SuperAdminUpdateUserDto {
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
