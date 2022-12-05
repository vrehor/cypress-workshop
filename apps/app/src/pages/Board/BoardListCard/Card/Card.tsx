import React, {useState} from 'react';
import {ClockCircleOutlined, EditOutlined} from "@ant-design/icons";
import {useUpdateCardMutation} from "@common/data-access";
import moment from 'moment';

import {CardEditModal} from "./CardEditModal";

import * as S from './Card.styles';

type Props = {
  card: {
    id: string,
    name: string,
    description?: string,
    order: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deadline?: any,
    done: boolean
  }
}

export const Card = ({card}: Props) => {
  const [editVisible, setEditVisible] = useState(false);

  const [updateCard] = useUpdateCardMutation();

  const handleDoneClick = (e) => {
    e.stopPropagation();

    updateCard({
      variables: {
        cardId: card.id,
        input: {
          done: !card.done
        }
      }
    })
  }

  return <S.Wrapper onClick={() => setEditVisible(true)}>
    <S.Header>
      <S.InputLabel>
        <input type={"checkbox"} onClick={handleDoneClick} />
      </S.InputLabel>
      <S.Title>{card.name}</S.Title>
      <S.Edit><EditOutlined /></S.Edit>
    </S.Header>
    <S.Deadline>
      <S.ClockCircleIcon><ClockCircleOutlined /></S.ClockCircleIcon>
      <S.DeadlineText $isDone={card.done} $isOverdue={card.deadline && moment(card.deadline).isBefore(new Date())}>{card.deadline && moment(card.deadline).format("dddd, MMMM Do YYYY") }</S.DeadlineText>
    </S.Deadline>
    <CardEditModal card={card} isOpen={editVisible} onCancel={() => setEditVisible(false)} onOk={() => setEditVisible(false)} />
  </S.Wrapper>
}
