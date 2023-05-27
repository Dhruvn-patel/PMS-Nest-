/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, Req, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Get('')
  @Render('user')
  AllUsers() {
    return;
  }


  @Get('getUsers')
  async findAll(@Req() req, @Res() res) {
    const data = await this.userService.findAll()
    return res.status(200).json({
      data: data,
      errmsg: "",
      status: 200
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Req() req, @Res() res) {
    const data = await this.userService.update(id, updateUserDto);
    if (data.statusCode === 200) {
      return res.json({
        errmsg: "",
        status: 200,
        data: null
      })
    }
  }
  @Delete('remove/:id')
  async remove(@Param('id', new ValidationPipe()) id: number, @Req() req, @Res() res) {
    const data = await this.userService.remove(id);
    if (data.statusCode === 403) {
      return res.json({
        errmsg: "admin account only one user",
        status: 403,
        data: null
      })
    }
    else if (data.statusCode === 200) {
      return res.json({
        errmsg: "",
        status: 200,
        data: null
      })
    }
  }

}
