import React, { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { StarFilled } from '@ant-design/icons';
import StarOutlined from '@ant-design/icons/lib/icons/StarOutlined';
import {
  useBoardQuery,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} from '@common/data-access';
import { Button } from '@common-ui/components';
import { Popover } from 'antd';

import { BoardListCard, NewBoardListCard } from './BoardListCard';

import * as S from './Board.styles';

export const Board = () => {
  const { boardId: boardIdAsString } = useParams<{ boardId: string }>();
  const boardId = Number(boardIdAsString);

  const [name, setName] = useState(null);
  const [isEdit, setEdit] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const { push } = useHistory();

  const { data } = useBoardQuery({
    variables: {
      boardId: Number(boardId),
    },
    onCompleted: data1 => {
      if (data1?.board?.__typename === 'Board') {
        setName(data1.board.name);
      }
    },
  });

  const [updateBoard] = useUpdateBoardMutation({
    onCompleted: () => {
      setEdit(false);
    },
  });

  const [deleteCard] = useDeleteBoardMutation({
    update: cache => {
      cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'boards',
      });
    },
    onCompleted: () => {
      push('/');
    },
  });

  const onStarClick = useCallback(() => {
    updateBoard({
      variables: {
        boardId,
        input: {
          starred:
            data?.board?.__typename === 'Board' ? !data.board.starred : false,
        },
      },
    });
  }, [boardId, data]);

  const onDelete = useCallback(() => {
    deleteCard({
      variables: {
        boardId,
      },
    });
  }, [boardId]);

  const save = useCallback(() => {
    updateBoard({
      variables: {
        boardId: boardId,
        input: {
          name,
        },
      },
    });
  }, [boardId, name, setEdit]);

  const handleEnter = useCallback(
    e => {
      if (e.key === 'Enter') {
        save();
      }
    },
    [save]
  );

  if (data?.board?.__typename !== 'Board') {
    return null;
  }

  return (
    <S.Wrapper>
      <S.Header>
        <S.NameInput
          data-cy="board-title"
          value={name}
          $isEdit={isEdit}
          onChange={e => setName(e.target.value?.trim())}
          onKeyDown={handleEnter}
          onBlur={save}
          onFocus={() => setEdit(true)}
        />
        <Button
          icon={data?.board?.starred ? <StarFilled /> : <StarOutlined />}
          type="primary"
          onClick={onStarClick}
        ></Button>
        <Popover
          content={
            <>
              <Button type={'text'} onClick={onDelete} data-cy="delete-board">
                Delete list
              </Button>
            </>
          }
          title="Board actions"
          trigger="click"
          visible={isPopupVisible}
          onVisibleChange={val => setPopupVisible(val)}
        >
          <Button data-cy="board-options">...</Button>
        </Popover>
      </S.Header>
      <S.ItemsWrapper>
        <NewBoardListCard board={data?.board} />
        {data?.board?.lists.map(list => (
          <BoardListCard key={list.id} list={list} />
        ))}
      </S.ItemsWrapper>
    </S.Wrapper>
  );
};
