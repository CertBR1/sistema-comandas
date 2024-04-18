import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { RmqClientModule } from 'src/common/rmq-client/rmq-client.module';

@Module({
  imports: [RmqClientModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule { }
