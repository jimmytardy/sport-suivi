import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateActionTypeDto } from './dto/create-action-type.dto';
import { ActionType } from 'src/models/ActionType';
import { UpdateActionTypeDto } from './dto/update-action-type.dto';

@Injectable()
export class ActionTypeService {
  constructor(@InjectModel(ActionType.name) private actionTypeModel: Model<ActionType>) {}

  async create(CreateActionTypeDto: CreateActionTypeDto, userId: Types.ObjectId): Promise<ActionType> {
    const createdActionType = new this.actionTypeModel({...CreateActionTypeDto, userId });
    return createdActionType.save();
  }

  async findAll(userId: Types.ObjectId): Promise<ActionType[]> {
    return this.actionTypeModel.find({ userId }).select('-userId').exec();
  }

  async findOne(id: string, userId: Types.ObjectId): Promise<ActionType> {
    const actionType = await this.actionTypeModel.findOne({ _id: id, userId }).select('-userId').exec();
    if (!actionType) {
      throw new NotFoundException('ActionType not found');
    }
    return actionType;
  }

  async update(id: string, userId: Types.ObjectId, UpdateActionTypeDto: UpdateActionTypeDto): Promise<ActionType> {
    const updatedActionType = await this.actionTypeModel.findOneAndUpdate({ _id: id, userId }, UpdateActionTypeDto, { new: true }).exec();
    if (!updatedActionType) {
      throw new NotFoundException('ActionType not found');
    }
    return updatedActionType;
  }

  async remove(id: string, userId: Types.ObjectId): Promise<ActionType> {
    const deletedActionType = await this.actionTypeModel.findOneAndDelete({_id: id, userId }).exec();
    if (!deletedActionType) {
      throw new NotFoundException('ActionType not found');
    }
    return deletedActionType;
  }
}
