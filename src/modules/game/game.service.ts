import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from 'src/models/Game';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async create(CreateGameDto: CreateGameDto, userId: Types.ObjectId): Promise<Game> {
    const createdGame = new this.gameModel({...CreateGameDto, userId });
    return createdGame.save();
  }

  async findAll(userId: Types.ObjectId): Promise<Game[]> {
    return this.gameModel.find({ userId }).select('-userId').exec();
  }

  async findOne(id: string, userId: Types.ObjectId): Promise<Game> {
    const game = await this.gameModel.findOne({ _id: id, userId }).select('-userId').exec();
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }

  async update(id: string, userId: Types.ObjectId, UpdateGameDto: UpdateGameDto): Promise<Game> {
    const updatedGame = await this.gameModel.findOneAndUpdate({ _id: id, userId }, UpdateGameDto, { new: true }).exec();
    if (!updatedGame) {
      throw new NotFoundException('Game not found');
    }
    return updatedGame;
  }

  async remove(id: string, userId: Types.ObjectId): Promise<Game> {
    const deletedGame = await this.gameModel.findOneAndDelete({_id: id, userId }).exec();
    if (!deletedGame) {
      throw new NotFoundException('Game not found');
    }
    return deletedGame;
  }
}
