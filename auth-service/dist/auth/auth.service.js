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
const argon = require("argon2");
let AuthService = class AuthService {
    constructor(databaseService, jwtService) {
        this.databaseService = databaseService;
        this.jwtService = jwtService;
    }
    async login(data) {
        try {
            const { credenciais, user } = data;
            console.log("Credenciais", credenciais, "user", user);
            const validateCredenciais = await argon.verify(user.senha, credenciais.senha);
            if (!validateCredenciais) {
                throw new microservices_1.RpcException('Credenciais inválidas');
            }
            const payload = { name: `${user.usuario.nome} ${user.usuario.sobrenome}`, username: user.username, sub: user.usuario.id, nivel_acesso: user.nivel_acesso };
            const token = await this.jwtService.sign(payload);
            return { token };
        }
        catch (error) {
            console.log(error);
            throw new microservices_1.RpcException(error);
        }
    }
    async decodeToken(data) {
        try {
            const validateToken = this.jwtService.verify(data);
            if (!validateToken) {
                throw new microservices_1.RpcException('Token inválido');
            }
            const payload = await this.jwtService.decode(data);
            return payload;
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