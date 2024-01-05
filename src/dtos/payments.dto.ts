import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { PaymentType } from '@/models/payments.model';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(PaymentType)
  public payment_type: string;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @IsString()
  @IsNotEmpty()
  public payee: String;
}
