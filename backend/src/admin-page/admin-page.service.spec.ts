import { Test, TestingModule } from '@nestjs/testing';
import { AdminPageService } from './admin-page.service';

describe('AdminPageService', () => {
  let service: AdminPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminPageService],
    }).compile();

    service = module.get<AdminPageService>(AdminPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
