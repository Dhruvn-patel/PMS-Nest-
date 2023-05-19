import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class DashboardService {
  constructor(private prismService: PrismaService) { }

  // user add ,delete,update
  // async addUser(user: UserDto, req: Request, res: Response) {
  //   const { name, email, password } = UserDto
  //   const hashpassword = await bcrypt.hash(password, 10)
  //   try {
  //     const createUser = await this.prismService.user.create({
  //       data: {
  //         email: email,
  //         name: name,
  //         password: hashpassword,
  //         userRoles: {
  //           create: [{
  //           }]
  //         },
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error.message);
  //     return error;
  //   }
  // }

  async deleteUser(userId: number) {
    // check user exists or not
    const userfind = await this.prismService.user.findUnique(
      {
        where: { id: userId }
      });

    if (!userfind)
      throw new NotFoundException("user not found");

    return this.prismService.user.delete(
      {
        where: { id: userId }
      }
    )
  }

  async updateUser(user: UserDto, userId: any, req: Request, res: Response) {
    const { name, email, password, roleId } = user;
    try {
      return await this.prismService.user.update({
        where: { id: userId },
        data: {
          name, email, password,
          userRoles: {
            update: {
              where: {
              
              },
              data: {
                rolesId: roleId
              }
            },
          }
        },
        include: { userRoles: true },
      })
    } catch (error) {
      console.log(error.message);
      return error;
    }

  }

}
