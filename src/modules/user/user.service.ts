import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, ProjectionType, QueryOptions, Types } from 'mongoose'
import { User } from 'src/models/User'
import { CreateUserDTO, ProfileUpdateDTO } from './user.dto'
import { genSalt, hash } from 'bcrypt'

@Injectable()
export class UserService {
    logger: Logger = new Logger('UserService')
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

    async findByEmail(email: string, select?: ProjectionType<User>): Promise<User | undefined> {
        return await this.userModel.findOne({ email }, select).lean()
    }

    async findById(id: string | Types.ObjectId, select?: ProjectionType<User>): Promise<User | undefined> {
        return await this.userModel.findById(id, select).lean()
    }

    async findByExternalId(externalId: string | Types.ObjectId, select?: ProjectionType<User>): Promise<User | undefined> {
        return await this.userModel.findOne({ externalId }, select).lean()
    }

    async findByExternalIdAndUpdate(externalId: string | Types.ObjectId, updated: User): Promise<User | undefined> {
        return await this.userModel.findOneAndUpdate({ externalId }, { $set: updated }, { new: true, upsert: true  }).lean()
    }

    async findAll(filter?: FilterQuery<User>, select?: ProjectionType<User>, options?: QueryOptions<User>): Promise<User[]> {
        this.logger.debug(`findAll: filter=${JSON.stringify(filter)}, select=${JSON.stringify(select)}, options=${JSON.stringify(options)}`)
        return await this.userModel.find(filter, select, options)
    }

    async findOne(filter?: FilterQuery<User>, select?: ProjectionType<User>, options?: QueryOptions<User>): Promise<User> {
        this.logger.debug(`findOne: filter=${JSON.stringify(filter)}, select=${JSON.stringify(select)}, options=${JSON.stringify(options)}`)
        return await this.userModel.findOne(filter, select, options)
    }

    async updateOne(order: Partial<User> & { _id: Types.ObjectId }, options?: QueryOptions<User>): Promise<User> {
        this.logger.debug(`updateOne: order=${JSON.stringify(order)}, options=${JSON.stringify(options)}`)
        return await this.userModel.findByIdAndUpdate(order._id, { $set: order }, options)
    }

    async create(user: CreateUserDTO, isSubAccount = false) {
        const salt = await genSalt()

        let exists = await this.findByEmail(user.email)
        if (exists) throw new Error("L'email existe déjà")
        const newUser = new this.userModel({
            ...user,
            _id: new Types.ObjectId(),
            password: isSubAccount ? user.password : await hash(user.password, salt),
        })

        const newUserSave = await newUser.save()
        return newUserSave
    }

    async setProfile(userId: Types.ObjectId, body: ProfileUpdateDTO) {
        try {
            await this.userModel.updateOne({ _id: userId }, { $set: body })
            return { success: true, message: 'Modifié avec succès' }
        } catch (e) {
            this.logger.error(e)
            throw new Error(e)
        }
    }

    async getProfile(user: User) {
        const { externalId, _id, ...userInfo } = user
        return userInfo
    }
}
