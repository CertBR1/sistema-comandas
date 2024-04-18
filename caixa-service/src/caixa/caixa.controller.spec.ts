import { Test, TestingModule } from '@nestjs/testing';
import { CaixaController } from './caixa.controller';
import { CaixaService } from './caixa.service';

describe('CaixaController', () => {
  let controller: CaixaController;
  let caixaService: CaixaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaixaController],
      providers: [CaixaService],
    }).compile();

    controller = module.get<CaixaController>(CaixaController);
    caixaService = module.get<CaixaService>(CaixaService);
  });

  it('should call caixaService.deposito with the correct data', () => {
    const mockData = { value: 100, PIN: '1234', idUsuario: 1 };
    const spy = jest.spyOn(caixaService, 'deposito');

    controller.deposito(mockData);

    expect(spy).toHaveBeenCalledWith(mockData);
  });

  it('should return the result of caixaService.deposito', async () => {
    const mockData = { value: 100, PIN: '1234', idUsuario: 1 };
    const expectedResult = 'Deposito realizado com sucesso';
    jest.spyOn(caixaService, 'deposito').mockResolvedValue(expectedResult);

    const result = await controller.deposito(mockData);

    expect(result).toBe(expectedResult);
  });
});