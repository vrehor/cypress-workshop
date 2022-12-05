import {useBoardsQuery} from "@common/data-access";

import {BoardCard, NewBoardCard} from "./BoardCard";

import * as S from "./Home.styles";

export const Home = () => {
  const {data} = useBoardsQuery();

  console.log('aaa')

  return (
    <>
      <S.Header>My Boards</S.Header>
      <S.Wrapper>
        {
          data?.boards?.map(board => <BoardCard board={board} key={board.id}/>)
        }
        <NewBoardCard/>
      </S.Wrapper>
    </>
  )
};
