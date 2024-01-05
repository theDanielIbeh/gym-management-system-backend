import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsEnum, IsNumber, IsDate } from 'class-validator';
import { PaymentType } from '@/models/payments.model';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(PaymentType)
  public payment_type: string;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @IsDate()
  @IsNotEmpty()
  public date: Date;

  @IsString()
  @IsNotEmpty()
  public payee: String;
}
