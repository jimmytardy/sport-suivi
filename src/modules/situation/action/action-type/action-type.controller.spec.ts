import { Test, TestingModule } from '@nestjs/testing';
import { ActionTypeController } from './action-type.controller';
import { ActionTypeService } from './action-type.service';

describe('ActionTypeController', () => {
  let controller: ActionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionTypeController],
      providers: [ActionTypeService],
    }).compile();

    controller = module.get<ActionTypeController>(ActionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
