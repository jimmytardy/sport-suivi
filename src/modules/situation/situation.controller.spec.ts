import { Test, TestingModule } from '@nestjs/testing';
import { SituationController } from './situation.controller';
import { SituationService } from './situation.service';

describe('SituationController', () => {
  let controller: SituationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SituationController],
      providers: [SituationService],
    }).compile();

    controller = module.get<SituationController>(SituationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
