import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateSituationDto } from './dto/create-situation.dto';
import { Situation } from 'src/models/Situation';
import { UpdateSituationDto } from './dto/update-situation.dto';

@Injectable()
export class SituationService {
  constructor(@InjectModel(Situation.name) private situationModel: Model<Situation>) {}

  async create(CreateSituationDto: CreateSituationDto, userId: Types.ObjectId): Promise<Situation> {
    const createdSituation = new this.situationModel({...CreateSituationDto, userId });
    return createdSituation.save();
  }

  async findAll(userId: Types.ObjectId): Promise<Situation[]> {
    return this.situationModel.find({ userId }).select('-userId').exec();
  }

  async findOne(id: string, userId: Types.ObjectId): Promise<Situation> {
    const situation = await this.situationModel.findOne({ _id: id, userId }).select('-userId').exec();
    if (!situation) {
      throw new NotFoundException('Situation not found');
    }
    return situation;
  }

  async update(id: string, userId: Types.ObjectId, UpdateSituationDto: UpdateSituationDto): Promise<Situation> {
    const updatedSituation = await this.situationModel.findOneAndUpdate({ _id: id, userId }, UpdateSituationDto, { new: true }).exec();
    if (!updatedSituation) {
      throw new NotFoundException('Situation not found');
    }
    return updatedSituation;
  }

  async remove(id: string, userId: Types.ObjectId): Promise<Situation> {
    const deletedSituation = await this.situationModel.findOneAndDelete({_id: id, userId }).exec();
    if (!deletedSituation) {
      throw new NotFoundException('Situation not found');
    }
    return deletedSituation;
  }
}
