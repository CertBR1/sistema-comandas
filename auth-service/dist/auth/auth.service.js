"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const jwt_1 = require("@nestjs/jwt");
const rxjs_1 = require("rxjs");
const argon = require("argon2");
let AuthService = class AuthService {
    constructor(databaseService, jwtService) {
        this.databaseService = databaseService;
        this.jwtService = jwtService;
    }
    async login(data) {
        console.log(data);
        try {
            const responseObsv = this.databaseService.send('findbyUsername', data.username);
            const response = await (0, rxjs_1.firstValueFrom)(responseObsv);
            console.log(response);
            if (!response) {
                throw new microservices_1.RpcException('Usuário ou senha inválidos');
            }
            const isPasswordValid = await argon.verify(response.senha, data.senha);
            if (!isPasswordValid) {
                throw new microservices_1.RpcException('Usuário ou senha inválidos');
            }
            const payload = { username: response.username, sub: response.id };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        catch (error) {
            console.log(error);
            throw new microservices_1.RpcException(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map