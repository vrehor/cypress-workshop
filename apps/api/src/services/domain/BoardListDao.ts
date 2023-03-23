import { Prisma as P } from '@prisma/client';
import { Service } from 'typedi';

import { CurrentUser } from '../auth';
import { Prisma } from '../Prisma';

@Service()
export class BoardListDao {
  readonly DEFAULT_SELECT = {
    id: true,
    name: true,
    order: true,
    user: {
      select: {
        id: true,
      },
    },
  } as const;

  constructor(private prisma: Prisma, private currentUser: CurrentUser) {}

  private enhancedWhere<T extends P.ListWhereUniqueInput | P.ListWhereInput>(
    where: T
  ): T {
    return {
      ...(this.currentUser?.tokenData?.user_id
        ? { user: { id: this.currentUser?.tokenData?.user_id } }
        : {
            user: {
              is: null,
            },
          }),
      ...where,
    };
  }

  create(data: P.ListCreateInput) {
    return this.prisma.list.create({
      data: {
        user: this.currentUser?.tokenData?.user_id
          ? {
              connect: {
                id: this.currentUser?.tokenData?.user_id,
              },
            }
          : undefined,
        ...data,
      },
      select: this.DEFAULT_SELECT,
    });
  }

  update<
    T extends P.ListUpdateInput,
    Select extends P.ListSelect = this['DEFAULT_SELECT']
  >(data: T, where: P.ListWhereUniqueInput, select?: Select) {
    return this.prisma.list.update({
      where,
      data,
      select: (select ?? this.DEFAULT_SELECT) as Select,
    });
  }

  async delete<Select extends P.ListSelect = this['DEFAULT_SELECT']>(
    listId: number,
    select?: Select
  ) {
    await this.prisma.card.deleteMany({
      where: {
        list: {
          id: listId,
        },
      },
    });

    return await this.prisma.list.delete({
      where: {
        id: listId,
      },
      select: (select ?? this.DEFAULT_SELECT) as Select,
    });
  }

  findById<Select extends P.ListSelect = this['DEFAULT_SELECT']>(
    listId: number,
    select?: Select
  ) {
    return this.prisma.list.findFirst({
      where: this.enhancedWhere({
        id: listId,
      }),
      select: (select ?? this.DEFAULT_SELECT) as Select,
    });
  }

  find<Select extends P.ListSelect = this['DEFAULT_SELECT']>(
    where: P.ListWhereInput,
    select?: Select
  ) {
    return this.prisma.list.findMany({
      select: (select ?? this.DEFAULT_SELECT) as Select,
      where: this.enhancedWhere(where),
    });
  }
}
