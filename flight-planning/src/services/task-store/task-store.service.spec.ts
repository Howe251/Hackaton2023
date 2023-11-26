import { Test, TestingModule } from '@nestjs/testing';
import { TaskStoreService } from './task-store.service';

describe('TaskStoreService', () => {
  let service: TaskStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskStoreService],
    }).compile();

    service = module.get<TaskStoreService>(TaskStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
