import { Test, TestingModule } from '@nestjs/testing';
import { TestScoreService } from './testscore.service';

describe('TestscoreService', () => {
  let service: TestScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestScoreService],
    }).compile();

    service = module.get<TestScoreService>(TestScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
