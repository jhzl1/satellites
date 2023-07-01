import { Test, TestingModule } from '@nestjs/testing';
import { TopsecretController } from './topsecret.controller';

describe('TopsecretController', () => {
  let controller: TopsecretController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopsecretController],
    }).compile();

    controller = module.get<TopsecretController>(TopsecretController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
