import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreatePlayerDto } from './dto/create-player.dto'
import { Player } from 'src/models/Player'
import { UpdatePlayerDto } from './dto/update-player.dto'

@Injectable()
export class PlayerService {
    constructor(@InjectModel(Player.name) private playerModel: Model<Player>) {}

    async create(CreatePlayerDto: CreatePlayerDto, userId: Types.ObjectId): Promise<Player> {
        const createdPlayer = new this.playerModel({ ...CreatePlayerDto, userId })
        return createdPlayer.save()
    }

    async findAll(userId: Types.ObjectId): Promise<Player[]> {
        const players: any[] = await this.playerModel
            .find({ userId })
            .select('-userId')
            .populate('teamsIds', 'name') // Populate teamsIds to get full objects
            .lean()
            .exec()

        // Transformation de teamsIds
        return players.map((player) => {
            return {
              ...player,
              teamsIds: player.teamsIds.map(team => team.name).join(', ')
            }
        })
    }

    async findOne(id: string, userId: Types.ObjectId): Promise<Player> {
        const player = await this.playerModel.findOne({ _id: id, userId }).select('-userId').exec()
        if (!player) {
            throw new NotFoundException('Player not found')
        }
        return player
    }

    async update(id: string, userId: Types.ObjectId, UpdatePlayerDto: UpdatePlayerDto): Promise<Player> {
        const updatedPlayer = await this.playerModel.findOneAndUpdate({ _id: id, userId }, UpdatePlayerDto, { new: true }).exec()
        if (!updatedPlayer) {
            throw new NotFoundException('Player not found')
        }
        return updatedPlayer
    }

    async remove(id: string, userId: Types.ObjectId): Promise<Player> {
        const deletedPlayer = await this.playerModel.findOneAndDelete({ _id: id, userId }).exec()
        if (!deletedPlayer) {
            throw new NotFoundException('Player not found')
        }
        return deletedPlayer
    }
}
