import { Test, TestingModule } from '@nestjs/testing';
import { JobRecommendationService } from './job-recommendation.service';

describe('JobRecommendationService', () => {
  let service: JobRecommendationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobRecommendationService],
    }).compile();

    service = module.get<JobRecommendationService>(JobRecommendationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
