import { Test, TestingModule } from '@nestjs/testing';
import { HealtcheckController } from './healtcheck.controller';

describe('HealtcheckController', () => {
  let controller: HealtcheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealtcheckController],
    }).compile();

    controller = module.get<HealtcheckController>(HealtcheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
