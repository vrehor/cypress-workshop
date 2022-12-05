import { Prisma as P } from '@prisma/client';
import { Service } from 'typedi';

import { Prisma } from '../Prisma';

@Service()
export class UserDao {
  readonly DEFAULT_SELECT = {
    id: true,
    email: true,
    token: true,
    password: true,
  } as const;

  constructor(private prisma: Prisma) {}

  create(data: P.UserCreateInput) {
    return this.prisma.user.create({ data, select: this.DEFAULT_SELECT });
  }

  update<
    T extends P.UserUpdateInput,
    Select extends P.UserSelect = this['DEFAULT_SELECT']
  >(data: T, where: P.UserWhereUniqueInput, select?: Select) {
    return this.prisma.user.update({
      where,
      data,
      select: (select ?? this.DEFAULT_SELECT) as Select,
    });
  }

  findById<Select extends P.UserSelect = this['DEFAULT_SELECT']>(
    userId: number,
    select?: Select
  ) {
    return this.prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
      select: (select ?? this.DEFAULT_SELECT) as Select,
    });
  }

  find<Select extends P.UserSelect = this['DEFAULT_SELECT']>(
    where: P.UserWhereInput,
    select?: Select
  ) {
    return this.prisma.user.findMany({
      select: (select ?? this.DEFAULT_SELECT) as Select,
      where,
    });
  }

  findAll<Select extends P.UserSelect = this['DEFAULT_SELECT']>(
    select?: Select
  ) {
    return this.find({}, select);
  }

  findByEmail<Select extends P.UserSelect = this['DEFAULT_SELECT']>(
    email: string,
    select?: Select
  ) {
    return this.prisma.user.findFirst({
      select: (select ?? this.DEFAULT_SELECT) as Select,
      where: { email: email },
    });
  }
}
