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
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let UsuarioService = class UsuarioService {
    constructor(databaseService, authService) {
        this.databaseService = databaseService;
        this.authService = authService;
    }
    async login(credenciais) {
        try {
            const responseObsv = this.authService.send('login', credenciais);
            const response = await (0, rxjs_1.firstValueFrom)(responseObsv);
            console.log(response);
            return response;
        }
        catch (error) {
            console.log(error);
            if (error.error === 'Usuário ou senha inválidos') {
                throw new common_1.HttpException('Usuário ou senha inválidos', 401);
            }
            throw new common_1.HttpException(error, 500);
        }
    }
    async create(createUsuarioDto) {
        try {
            const responseObsv = this.databaseService.send('createUsuario', createUsuarioDto);
            const response = await (0, rxjs_1.firstValueFrom)(responseObsv);
            return response;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error, 500);
        }
    }
    findAll() {
        return `This action returns all usuario`;
    }
    findOne(id) {
        return `This action returns a #${id} usuario`;
    }
    update(id, updateUsuarioDto) {
        return `This action updates a #${id} usuario`;
    }
    remove(id) {
        return `This action removes a #${id} usuario`;
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_SERVICE')),
    __param(1, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map