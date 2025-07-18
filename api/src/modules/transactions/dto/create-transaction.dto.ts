import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from "class-validator";
import { TransactionType } from "../entities/Transaction";


export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    bankAccountId: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    categoryId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    value: number;

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsEnum(TransactionType)
    @IsNotEmpty()
    type: TransactionType;
}
