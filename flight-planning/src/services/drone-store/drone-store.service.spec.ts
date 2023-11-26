import { Test, TestingModule } from '@nestjs/testing';
import { DroneStoreService } from './drone-store.service';

describe('DroneStoreService', () => {
  let service: DroneStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DroneStoreService],
    }).compile();

    service = module.get<DroneStoreService>(DroneStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
