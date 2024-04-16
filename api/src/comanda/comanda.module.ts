import { Module } from '@nestjs/common';
import { ComandaService } from './comanda.service';
import { ComandaController } from './comanda.controller';
import { RmqClientModule } from 'src/rmq-client/rmq-client.module';

@Module({
  imports: [RmqClientModule],
  controllers: [ComandaController],
  providers: [ComandaService],
})
export class ComandaModule { }
