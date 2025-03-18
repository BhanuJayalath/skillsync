import { Test, TestingModule } from '@nestjs/testing';
import { MocktestController } from './mocktest.controller';

describe('MocktestController', () => {
  let controller: MocktestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MocktestController],
    }).compile();

    controller = module.get<MocktestController>(MocktestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
