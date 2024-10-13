import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { ActionTypeService } from './Action-type.service';
import { CreateActionTypeDto } from './dto/create-action-type.dto';
import { UpdateActionTypeDto } from './dto/update-action-type.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('actionType')
export class ActionTypeController {
  constructor(private readonly actionTypeService: ActionTypeService) {}

  @Post()
  create(@Body() CreateActionTypeDto: CreateActionTypeDto, @Request() { user }) {
    return this.actionTypeService.create(CreateActionTypeDto, user._id);
  }

  @Get()
  findAll(@Request() { user }) {
    return this.actionTypeService.findAll(user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() { user }) {
    return this.actionTypeService.findOne(id, user._id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateActionTypeDto: UpdateActionTypeDto, @Request() { user }) {
    return this.actionTypeService.update(id, user._id, UpdateActionTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() { user }) {
    return this.actionTypeService.remove(id, user._id);
  }
}
