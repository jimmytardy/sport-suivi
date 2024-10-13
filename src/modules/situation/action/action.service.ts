import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateActionDto } from './dto/create-action.dto';
import { Action } from 'src/models/Action';
import { UpdateActionDto } from './dto/update-action.dto';

@Injectable()
export class ActionService {
  constructor(@InjectModel(Action.name) private actionModel: Model<Action>) {}

  async create(CreateActionDto: CreateActionDto, userId: Types.ObjectId): Promise<Action> {
    const createdAction = new this.actionModel({...CreateActionDto, userId });
    return createdAction.save();
  }

  async findAll(userId: Types.ObjectId): Promise<Action[]> {
    return this.actionModel.find({ userId }).select('-userId').exec();
  }

  async findOne(id: string, userId: Types.ObjectId): Promise<Action> {
    const action = await this.actionModel.findOne({ _id: id, userId }).select('-userId').exec();
    if (!action) {
      throw new NotFoundException('Action not found');
    }
    return action;
  }

  async update(id: string, userId: Types.ObjectId, UpdateActionDto: UpdateActionDto): Promise<Action> {
    const updatedAction = await this.actionModel.findOneAndUpdate({ _id: id, userId }, UpdateActionDto, { new: true }).exec();
    if (!updatedAction) {
      throw new NotFoundException('Action not found');
    }
    return updatedAction;
  }

  async remove(id: string, userId: Types.ObjectId): Promise<Action> {
    const deletedAction = await this.actionModel.findOneAndDelete({_id: id, userId }).exec();
    if (!deletedAction) {
      throw new NotFoundException('Action not found');
    }
    return deletedAction;
  }
}
