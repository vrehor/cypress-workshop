import { Prisma as P } from '@prisma/client';
import { Service } from 'typedi';

import { CurrentUser } from '../auth';
import { Prisma } from '../Prisma';

@Service()
export class CardDao {
  readonly DEFAULT_SELECT = {
    id: true,
    name: true,
    deadline: true,
    description: true,
    order: true,
    done: true,
    user: {
      select: {
        id: true,
      },
    },
  } as const;

  constructor(private prisma: Prisma, private currentUser: CurrentUser) {}

  private enhancedWhere<T extends P.CardWhereUniqueInput | P.CardWhereInput>(
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

  findById<Select extends P.CardSelect = this['DEFAULT_SELECT']>(
    cardId: number,
    select?: Select
  ) {
    return this.prisma.card.findFirst({
      where: this.enhancedWhere({
        id: cardId,
      }),
      select: (select ?? this.DEFAULT_SELECT) as Select,
    });
  }

  create(data: P.CardCreateInput) {
    return this.prisma.card.create({
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

  delete<Select extends P.CardSelect = this['DEFAULT_SELECT']>(
    where: P.CardWhereUniqueInput,
    select?: Select
  ) {
    return this.prisma.card.delete({
      where: where,
      select: (select ?? this.DEFAULT_SELECT) as Select,
    });
  }

  update<
    T extends P.CardUpdateInput,
    Select extends P.CardSelect = this['DEFAULT_SELECT']
  >(data: T, where: P.CardWhereUniqueInput, select?: Select) {
    return this.prisma.card.update({
      where: where,
      data,
      select: (select ?? this.DEFAULT_SELECT) as Select,
    });
  }

  find<Select extends P.CardSelect = this['DEFAULT_SELECT']>(
    where: P.CardWhereInput,
    select?: Select
  ) {
    return this.prisma.card.findMany({
      select: (select ?? this.DEFAULT_SELECT) as Select,
      where: this.enhancedWhere(where),
    });
  }
}
