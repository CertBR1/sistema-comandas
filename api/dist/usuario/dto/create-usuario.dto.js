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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
class Credenciais {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome de usuário obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'Nome de usuário deve ser uma string' }),
    __metadata("design:type", String)
], Credenciais.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Senha obrigatória' }),
    (0, class_validator_1.IsString)({ message: 'Senha deve ser uma string' }),
    __metadata("design:type", String)
], Credenciais.prototype, "senha", void 0);
class CreateUsuarioDto {
}
exports.CreateUsuarioDto = CreateUsuarioDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'Nome deve ser uma string' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Sobrenome obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'Sobrenome deve ser uma string' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "sobrenome", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Credenciais)
], CreateUsuarioDto.prototype, "credenciais", void 0);
//# sourceMappingURL=create-usuario.dto.js.map