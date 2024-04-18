import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ClientsModule.register([
            {
                name: 'DATABASE_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RMQ_URL],
                    queue: process.env.RMQ_DATABASE_QUEUE,
                    queueOptions: {
                        durable: true
                    },
                }
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [ClientsModule]
})
export class RmqClientModule { }
