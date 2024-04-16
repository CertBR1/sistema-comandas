import { IsNumber, IsPositive } from "class-validator";

export class CreateDepositoDto {
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsPositive({ message: 'O valor deve ser positivo' })
    valor: number
}