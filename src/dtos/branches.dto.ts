import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsString()
  @IsOptional()
  public branch: String;

  @IsNumber()
  @IsOptional()
  utility_cost: number;

  @IsString()
  @IsOptional()
  public admin: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public users: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public staff: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public equipment: string[];
}

export class AssignBranchDto {
  @IsString()
  @IsNotEmpty()
  public admin: string;
}

export class AddStaffDto {
  @IsString()
  @IsNotEmpty()
  public user_id: string;
}
