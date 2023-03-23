import React from 'react';
import { ClockCircleOutlined, EditOutlined } from '@ant-design/icons';
import { useUpdateCardMutation } from '@common/data-access';
import moment from 'moment';
import { NumberParam, useQueryParam } from 'use-query-params';

import { CardEditModal } from './CardEditModal';

import * as S from './Card.styles';

type Props = {
  card: {
    id: number;
    name: string;
    description?: string;
    order: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deadline?: any;
    done: boolean;
  };
};

export const Card = ({ card }: Props) => {
  const [cardId, setCardId] = useQueryParam('card', NumberParam);

  const [updateCard] = useUpdateCardMutation();

  const handleDoneClick = e => {
    e.stopPropagation();

    updateCard({
      variables: {
        cardId: card.id,
        input: {
          done: !card.done,
        },
      },
    });
  };

  const isOverdue = card.deadline && moment(card.deadline).isBefore(new Date());

  return (
    <S.Wrapper onClick={() => setCardId(card.id)} data-cy="card">
      <S.Header>
        <S.InputLabel>
          <input
            data-cy="card-checkbox"
            type={'checkbox'}
            checked={card.done}
            onClick={handleDoneClick}
          />
        </S.InputLabel>
        <S.Title data-cy="card-text">{card.name}</S.Title>
        <S.Edit>
          <EditOutlined />
        </S.Edit>
      </S.Header>
      <S.Deadline>
        <S.ClockCircleIcon>
          <ClockCircleOutlined />
        </S.ClockCircleIcon>
        <S.DeadlineText
          data-cy="due-date"
          $isDone={card.done}
          $isOverdue={isOverdue}
          className={card.done ? 'completed' : isOverdue ? 'overdue' : ''}
        >
          {card.deadline && moment(card.deadline).format('MMM DD YYYY')}
        </S.DeadlineText>
      </S.Deadline>
      <CardEditModal
        card={card}
        isOpen={cardId && cardId === card?.id}
        onCancel={() => setCardId(null)}
        onOk={() => setCardId(null)}
      />
    </S.Wrapper>
  );
};
