/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    try {
      const userData = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          rolesId: true,
          googleId: false
        }
      })
      return userData;
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { name, email } = updateUserDto;
    console.log(name, email);

    const data = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: name,
        email: email
      }
    })
    return {
      statusCode: 200
    };
  }

  async remove(id: number) {
    const checkadmin = await prisma.user.findFirst({
      where: { id: Number(id) },
      select: {
        rolesId: true,
      }
    })
    const countAdmin = await prisma.user.count({
      where: { rolesId: 1 }
    })

    if (checkadmin.rolesId == 1) {
      if (countAdmin <= 1) {
        return {
          statusCode: 403,
          msg: "not possible to remove admin"
        }
      }
      const deleteData = await prisma.user.delete({
        where: { id: Number(id) }
      })
      return {
        statusCode: 200,
      };
    }
    else {
      const deleteData = await prisma.user.delete({
        where: { id: Number(id) }
      })
      return {
        statusCode: 200,
      };
    }
  }
}
