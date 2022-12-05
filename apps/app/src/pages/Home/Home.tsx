import { useBoardsQuery } from '@common/data-access';
import { notification } from 'antd';

import { BoardCard, NewBoardCard } from './BoardCard';

import * as S from './Home.styles';

export const Home = () => {
  const { data } = useBoardsQuery({
    onError: () => {
      notification.error({
        message: 'Unexpected error occurred',
      });
    },
  });

  return (
    <>
      <S.Header>My Boards</S.Header>
      <S.Wrapper>
        {data?.boards?.map(board => (
          <BoardCard board={board} key={board.id} />
        ))}
        <NewBoardCard />
      </S.Wrapper>
    </>
  );
};
