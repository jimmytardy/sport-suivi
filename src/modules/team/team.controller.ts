import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { TeamService } from './Team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() CreateTeamDto: CreateTeamDto, @Request() { user }) {
    return this.teamService.create(CreateTeamDto, user._id);
  }

  @Get()
  findAll(@Request() { user }) {
    return this.teamService.findAll(user._id);
  }

  @Get()
  findAllSport(@Request() { user }) {
    return this.teamService.findAllSport(user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() { user }) {
    return this.teamService.findOne(id, user._id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateTeamDto: UpdateTeamDto, @Request() { user }) {
    return this.teamService.update(id, user._id, UpdateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() { user }) {
    return this.teamService.remove(id, user._id);
  }
}
