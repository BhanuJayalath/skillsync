import { Test, TestingModule } from '@nestjs/testing';
import { MocktestService } from './mocktest.service';

describe('MocktestService', () => {
  let service: MocktestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MocktestService],
    }).compile();

    service = module.get<MocktestService>(MocktestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
