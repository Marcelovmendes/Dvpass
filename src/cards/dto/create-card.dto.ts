import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @Length(12, 16)
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  printedName: string;

  @IsNotEmpty()
  @Length(3)
  @IsNumber()
  securityCode: string;

  @IsNotEmpty()
  @IsString()
  expirationDate: string;

  @IsNotEmpty()
  @IsNumber()
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  isVirtual: boolean;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  title: string;
}
