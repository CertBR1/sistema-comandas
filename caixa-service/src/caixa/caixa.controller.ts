import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CaixaService } from './caixa.service';
import { DepositoDto } from './dto/deposito-dto';


@Controller()
export class CaixaController {
  constructor(private readonly caixaService: CaixaService) { }

  @MessagePattern('createDeposit')
  deposito(@Payload() deposto: DepositoDto) {
    return this.caixaService.deposito(deposto);
  }

}
