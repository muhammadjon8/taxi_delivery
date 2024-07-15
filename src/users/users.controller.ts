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

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Generate a token' })
  @ApiResponse({
    status: 201,
    description: 'The token has been successfully generated.',
  })
  @Post('token')
  async getToken() {
    return await this.usersService.getToken();
  }

  @ApiOperation({ summary: 'Send an SMS to the user' })
  @ApiResponse({
    status: 201,
    description: 'The SMS has been successfully sent.',
  })
  @Post('sms')
  async sendSms(@Body('phone') phone: string) {
    return await this.usersService.sendSms(phone);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged in.',
    type: Driver,
  })
  @Post('login')
  login(
    @Body() loginDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(loginDto, res);
  }

  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged out.',
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

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Retrieved all users successfully.',
    type: [Driver],
  })
  // @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Retrieved the user successfully.',
    type: Driver,
  })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully updated.',
    type: Driver,
  })
  @UseGuards(UserGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: Driver,
  })
  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
