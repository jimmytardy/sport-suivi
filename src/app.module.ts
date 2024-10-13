import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './config/configuration'
import { ModulesModule } from './modules/modules.module'
import { MulterModule } from '@nestjs/platform-express'
import { multerModuleFactory } from './storage.config'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('database.uri'),
            }),
            inject: [ConfigService],
        }),
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useFactory: multerModuleFactory,
            inject: [ConfigService],
        }),
        ModulesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
