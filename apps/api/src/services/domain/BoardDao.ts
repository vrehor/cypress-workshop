import { Prisma as P } from '@prisma/client';
import { Service } from 'typedi';

import { CurrentUser } from '../auth/CurrentUser';
import { Prisma } from '../Prisma';

@Service()
export class BoardDao {
  readonly DEFAULT_SELECT = {
    id: true,
    name: true,
    starred: true,
    createdAt: true,
    user: {
      select: {
        id: true,
      },
    },
  } as const;

  constructor(private prisma: Prisma, private currentUser: CurrentUser) {}

  private enhancedWhere<T extends P.BoardWhereUniqueInput | P.BoardWhereInput>(
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

  create(data: P.BoardCreateInput) {
    return this.prisma.board.create({
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
    T extends P.BoardUpdateInput,
    Select extends P.BoardSelect = this['DEFAULT_SELECT']
  >(data: T, where: P.BoardWhereUniqueInput, select?: Select) {
    return this.prisma.board.update({
      where: where,
      data,
      select: (select ?? this.DEFAULT_SELECT) as Select,
    });
  }

  findById<Select extends P.BoardSelect = this['DEFAULT_SELECT']>(
    boardId: number,
    select?: Select
  ) {
    return this.prisma.board.findUnique({
      where: {
        id: boardId,
      },
      select: (select ?? this.DEFAULT_SELECT) as Select,
    });
  }

  find<Select extends P.BoardSelect = this['DEFAULT_SELECT']>(
    where: P.BoardWhereInput,
    select?: Select
  ) {
    return this.prisma.board.findMany({
      select: (select ?? this.DEFAULT_SELECT) as Select,
      where: this.enhancedWhere(where),
    });
  }

  findAll<Select extends P.BoardSelect = this['DEFAULT_SELECT']>(
    select?: Select
  ) {
    return this.find({}, select);
  }

  async delete<Select extends P.BoardSelect = this['DEFAULT_SELECT']>(
    boardId: number,
    select?: Select
  ) {
    await this.prisma.card.deleteMany({
      where: {
        list: {
          board: {
            id: boardId,
          },
        },
      },
    });

    await this.prisma.list.deleteMany({
      where: {
        board: {
          id: boardId,
        },
      },
    });

    return await this.prisma.board.delete({
      where: {
        id: boardId,
      },
      select: (select ?? this.DEFAULT_SELECT) as Select,
    });
  }
}
