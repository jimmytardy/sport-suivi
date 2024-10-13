import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateTeamDto } from './dto/create-team.dto'
import { Team } from 'src/models/Team'
import { UpdateTeamDto } from './dto/update-team.dto'

@Injectable()
export class TeamService {
    constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

    async create(CreateTeamDto: CreateTeamDto, userId: Types.ObjectId): Promise<Team> {
        const createdTeam = new this.teamModel({ ...CreateTeamDto, userId })
        return createdTeam.save()
    }

    async findAll(userId: Types.ObjectId): Promise<Team[]> {
        return this.teamModel.find({ userId }).select('-userId').exec()
    }

    async findAllSport(userId: Types.ObjectId): Promise<string[]> {
        return this.teamModel.distinct('sport', { userId }).select('-userId').exec()
    }

    async findOne(id: string, userId: Types.ObjectId): Promise<Team> {
        const team = await this.teamModel.findOne({ _id: id, userId }).select('-userId').exec()
        if (!team) {
            throw new NotFoundException('Team not found')
        }
        return team
    }

    async update(id: string, userId: Types.ObjectId, UpdateTeamDto: UpdateTeamDto): Promise<Team> {
        const updatedTeam = await this.teamModel.findOneAndUpdate({ _id: id, userId }, UpdateTeamDto, { new: true }).exec()
        if (!updatedTeam) {
            throw new NotFoundException('Team not found')
        }
        return updatedTeam
    }

    async remove(id: string, userId: Types.ObjectId): Promise<Team> {
        const deletedTeam = await this.teamModel.findOneAndDelete({ _id: id, userId }).exec()
        if (!deletedTeam) {
            throw new NotFoundException('Team not found')
        }
        return deletedTeam
    }
}
