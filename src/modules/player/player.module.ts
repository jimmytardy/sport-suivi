import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from 'src/models/Player';
import { PlayerService } from './Player.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }])],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
