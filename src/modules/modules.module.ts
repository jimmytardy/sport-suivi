import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { PlayerModule } from './player/player.module';
import { SituationModule } from './situation/situation.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [AuthModule, UserModule, TeamModule, PlayerModule, SituationModule, GameModule]
})
export class ModulesModule {}
