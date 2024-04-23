import { Module } from '@nestjs/common';
import { VendaService } from './venda.service';
import { VendaController } from './venda.controller';
import { RmqClientModule } from 'src/common/rmq-client/rmq-client.module';

@Module({
  imports: [
    RmqClientModule

  ],
  controllers: [VendaController],
  providers: [VendaService],
})
export class VendaModule { }
