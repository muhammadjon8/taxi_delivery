import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Cookiegetter } from '../decorators/cookie_getter.decorator';
import { Driver } from '../driver/entities/driver.entity';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: 'bu yerda post qilinadi' })
  @ApiResponse({
    status: 201,
    description: 'The post created.',
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'bu yerda login  qilinadi' })
  @ApiResponse({
    status: 201,
    description: 'The login  created.',
    type: Driver,
  })
  @Post('login')
  login(
    @Body() loginDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(loginDto, res);
  }

  @ApiOperation({ summary: 'bu yerda logout qilinadi' })
  @ApiResponse({
    status: 201,
    description: 'The logout qilinadi.',
    type: Driver,
  })
  @UseGuards(UserGuard)
  @Post('logout')
  logout(
    @Cookiegetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'bu yerda getALL qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The getALL created.',
    type: [Driver],
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'bu get qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The get created.',
    type: Driver,
  })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'bu yerda putch qilinadi' })
  @ApiResponse({
    status: 201,
    description: 'The putch created.',
    type: Driver,
  })
  @UseGuards(UserGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'bu yerda deleted qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The post deleted.',
    type: Driver,
  })
  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
