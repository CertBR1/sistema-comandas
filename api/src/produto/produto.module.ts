import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { RmqClientModule } from 'src/common/rmq-client/rmq-client.module';

@Module({
  imports: [RmqClientModule],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule { }
