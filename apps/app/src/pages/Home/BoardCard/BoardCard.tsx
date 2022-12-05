import { useCallback } from 'react';
import { useHistory } from 'react-router';
import StarFilled from '@ant-design/icons/lib/icons/StarFilled';
import StarOutlined from '@ant-design/icons/lib/icons/StarOutlined';
import { BoardsQueryHookResult } from '@common/data-access';

import * as S from './BoardCard.styles';

type Props = {
  board: BoardsQueryHookResult['data']['boards'][number];
};

export const BoardCard = ({ board }: Props) => {
  const { push } = useHistory();

  const onBoardClick = useCallback(() => {
    push(`/boards/${board.id}`);
  }, [push]);

  return (
    <S.BoardWrapper onClick={onBoardClick} data-cy="board-item">
      <S.Title>{board.name}</S.Title>
      <S.Star> {board.starred ? <StarFilled /> : <StarOutlined />}</S.Star>
    </S.BoardWrapper>
  );
};
