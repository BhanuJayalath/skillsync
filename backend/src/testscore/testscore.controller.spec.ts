import { Test, TestingModule } from '@nestjs/testing';
import { TestScoreController } from './testscore.controller';

describe('TestscoreController', () => {
  let controller: TestScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestScoreController],
    }).compile();

    controller = module.get<TestScoreController>(TestScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
