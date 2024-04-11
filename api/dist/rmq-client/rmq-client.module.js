"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RmqClientModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
let RmqClientModule = class RmqClientModule {
};
exports.RmqClientModule = RmqClientModule;
exports.RmqClientModule = RmqClientModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            microservices_1.ClientsModule.register([
                {
                    name: 'DATABASE_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [process.env.RMQ_URL],
                        queue: process.env.RMQ_DATABASE_QUEUE,
                        queueOptions: {
                            durable: true
                        },
                    }
                },
                {
                    name: 'AUTH_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [process.env.RMQ_URL],
                        queue: process.env.RMQ_AUTH_QUEUE,
                        queueOptions: {
                            durable: true
                        },
                    }
                }
            ]),
        ],
        controllers: [],
        providers: [],
        exports: [microservices_1.ClientsModule]
    })
], RmqClientModule);
//# sourceMappingURL=rmq-client.module.js.map