import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { GameService } from './Game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @UseInterceptors(FileInterceptor('video'))
  create(@Body() CreateGameDto: CreateGameDto, @Request() { user }, @UploadedFile() file: Express.Multer.File) {
    console.log('file', file)
    return this.gameService.create(CreateGameDto, user._id);
  }

  @Get()
  findAll(@Request() { user }) {
    return this.gameService.findAll(user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() { user }) {
    return this.gameService.findOne(id, user._id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateGameDto: UpdateGameDto, @Request() { user }) {
    return this.gameService.update(id, user._id, UpdateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() { user }) {
    return this.gameService.remove(id, user._id);
  }
}
