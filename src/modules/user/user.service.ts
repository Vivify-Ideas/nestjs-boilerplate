import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'modules/common/prisma.service';

import { User, UserFillableFields } from './user.entity';
import { Hash } from '../../utils/Hash';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async get(id: number, includePass = false) {
    return await this.prisma.user.findFirst({
      where: { id },
      select: includePass ? User.selectWithPassword : User.defaultSelect,
    });
  }

  async getByEmail(email: string, includePass = false) {
    return await this.prisma.user.findFirst({
      where: { email },
      select: includePass ? User.selectWithPassword : User.defaultSelect,
    });
  }

  async create(payload: UserFillableFields) {
    const user = await this.getByEmail(payload.email);

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }

    return (await this.prisma.user.create({
      data: {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: Hash.make(payload.password),
      },
      select: User.defaultSelect,
    })) as User;
  }
}
