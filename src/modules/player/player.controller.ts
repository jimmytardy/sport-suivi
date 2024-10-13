import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { PlayerService } from './Player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  create(@Body() CreatePlayerDto: CreatePlayerDto, @Request() { user }) {
    console.log(CreatePlayerDto.teamsIds)
    return this.playerService.create(CreatePlayerDto, user._id);
  }

  @Get()
  findAll(@Request() { user }) {
    return this.playerService.findAll(user._id); 
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() { user }) {
    return this.playerService.findOne(id, user._id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdatePlayerDto: UpdatePlayerDto, @Request() { user }) {
    return this.playerService.update(id, user._id, UpdatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() { user }) {
    return this.playerService.remove(id, user._id);
  }
}
