import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamService } from './Team.service';
import { TeamController } from './Team.controller';
import { Team, TeamSchema } from 'src/models/Team';

@Module({
  imports: [MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
