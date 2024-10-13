import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { ActionService } from './Action.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post()
  create(@Body() CreateActionDto: CreateActionDto, @Request() { user }) {
    return this.actionService.create(CreateActionDto, user._id);
  }

  @Get()
  findAll(@Request() { user }) {
    return this.actionService.findAll(user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() { user }) {
    return this.actionService.findOne(id, user._id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateActionDto: UpdateActionDto, @Request() { user }) {
    return this.actionService.update(id, user._id, UpdateActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() { user }) {
    return this.actionService.remove(id, user._id);
  }
}
