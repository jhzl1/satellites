import { Test, TestingModule } from '@nestjs/testing';
import { SatellitesService } from './satellites.service';

describe('SatellitesService', () => {
  let service: SatellitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SatellitesService],
    }).compile();

    service = module.get<SatellitesService>(SatellitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
