import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from 'src/models/Game';
import { GameService } from './Game.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }])],
  providers: [GameService],
  controllers: [GameController],
  exports: [GameService]
})
export class GameModule {}
