import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { SituationService } from './Situation.service';
import { CreateSituationDto } from './dto/create-situation.dto';
import { UpdateSituationDto } from './dto/update-situation.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('situation')
export class SituationController {
  constructor(private readonly situationService: SituationService) {}

  @Post()
  create(@Body() CreateSituationDto: CreateSituationDto, @Request() { user }) {
    return this.situationService.create(CreateSituationDto, user._id);
  }

  @Get()
  findAll(@Request() { user }) {
    return this.situationService.findAll(user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() { user }) {
    return this.situationService.findOne(id, user._id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateSituationDto: UpdateSituationDto, @Request() { user }) {
    return this.situationService.update(id, user._id, UpdateSituationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() { user }) {
    return this.situationService.remove(id, user._id);
  }
}
