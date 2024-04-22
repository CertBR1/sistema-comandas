import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { RmqClientModule } from 'src/common/rmq-client/rmq-client.module';


@Module({
  imports: [RmqClientModule],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule { }
