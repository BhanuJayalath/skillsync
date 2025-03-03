import { Test, TestingModule } from '@nestjs/testing';
import { JobRecommendationController } from './job-recommendation.controller';

describe('JobRecommendationController', () => {
  let controller: JobRecommendationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobRecommendationController],
    }).compile();

    controller = module.get<JobRecommendationController>(JobRecommendationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
