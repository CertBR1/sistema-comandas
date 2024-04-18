import { Module } from '@nestjs/common';
import { CaixaService } from './caixa.service';
import { CaixaController } from './caixa.controller';
import { RmqClientModule } from 'src/common/rmq-client/rmq-client.module';

@Module({
  imports: [RmqClientModule],
  controllers: [CaixaController],
  providers: [CaixaService],
})
export class CaixaModule { }
