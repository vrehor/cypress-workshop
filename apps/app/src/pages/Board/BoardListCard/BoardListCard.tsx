import React, { useCallback, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import {
  useCreateCardMutation,
  useDeleteBoardListMutation,
  useUpdateBoardListMutation,
} from '@common/data-access';
import { Button } from '@common-ui/components';
import { Form, Input, Popover } from 'antd';

import { Card } from './Card';

import * as S from './BoardListCard.styles';

type Props = {
  list: {
    id: number;
    name: string;
    order: number;
    cards?: {
      id: number;
      name: string;
      description?: string;
      order: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      deadline?: any;
      done: boolean;
    }[];
  };
};

export const BoardListCard = ({ list }: Props) => {
  const [form] = Form.useForm();

  const [name, setName] = useState(list.name);
  const [isEdit, setEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const [saveBoardList] = useUpdateBoardListMutation({
    onCompleted: () => {
      setEdit(false);
    },
  });

  const save = useCallback(() => {
    saveBoardList({
      variables: {
        listId: list.id,
        input: {
          name,
        },
      },
    });
  }, [list, name, setEdit]);

  const [createCard] = useCreateCardMutation({
    update: cache => {
      cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'board',
      });
    },
    onCompleted: response => {
      if (response?.createCard?.__typename === 'Card') {
        form.resetFields();
      }
    },
  });

  const [deleteList] = useDeleteBoardListMutation({
    update: cache => {
      cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'board',
      });
    },
  });

  const onCancel = useCallback(() => {
    setShowForm(false);
    form.resetFields();
  }, [form]);

  const onFinish = useCallback(async () => {
    try {
      const values = await form.validateFields();
      await createCard({
        variables: {
          listId: list.id,
          input: {
            ...values,
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  }, [form, list]);

  const onDelete = useCallback(() => {
    deleteList({
      variables: {
        listId: list.id,
      },
    });
  }, [list]);

  const handleEnter = useCallback(
    e => {
      if (e.key === 'Enter') {
        save();
      }
    },
    [save]
  );

  return (
    <S.Wrapper data-cy="list">
      <S.Header>
        <S.NameInput
          value={name}
          $isEdit={isEdit}
          onChange={e => setName(e.target.value?.trim())}
          onKeyDown={handleEnter}
          onBlur={save}
          onFocus={() => setEdit(true)}
          data-cy="list-name"
        />
        <Popover
          content={
            <div data-cy="list-dropdown">
              <Button
                type={'text'}
                onClick={() => {
                  setShowForm(true);
                  setPopupVisible(false);
                }}
              >
                Add another card
              </Button>
              <Button type={'text'} onClick={onDelete} data-cy="delete-list">
                Delete list
              </Button>
            </div>
          }
          title="List actions"
          trigger="click"
          visible={isPopupVisible}
          onVisibleChange={val => setPopupVisible(val)}
        >
          <Button data-cy="list-options">...</Button>
        </Popover>
      </S.Header>
      {list?.cards?.map(card => (
        <Card key={card.id} card={card} />
      ))}
      {!showForm ? (
        <S.Title onClick={() => setShowForm(true)} data-cy="new-card">
          + Add another card
        </S.Title>
      ) : (
        <S.Form
          form={form}
          style={{ width: '100%' }}
          onFinish={onFinish}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              form.submit();
            }
          }}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input title!',
              },
            ]}
            data-cy="new-card-input"
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="'Enter a title for this card ...'"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="save-form-button"
            >
              Save
            </Button>
            <Button type={'text'} onClick={onCancel} block>
              cancel
            </Button>
          </Form.Item>
        </S.Form>
      )}
    </S.Wrapper>
  );
};
