import { useCallback, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useCreateBoardListMutation } from '@common/data-access';
import { Button, Form, Input } from 'antd';

import * as S from './NewBoardListCard.styles';

type Props = {
  board: {
    id: number;
    lists?: {
      id: number;
      name: string;
      order: number;
    }[];
  };
};

export const NewBoardListCard = ({ board }: Props) => {
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);

  const [createBoardList] = useCreateBoardListMutation({
    update: cache => {
      cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'board',
      });
    },
    onCompleted: response => {
      if (response?.createBoardList?.__typename === 'BoardList') {
        setShowForm(false);
        form.resetFields();
      }
    },
  });

  const onCancel = useCallback(() => {
    setShowForm(false);
    form.resetFields();
  }, [form]);

  const onFinish = useCallback(async () => {
    try {
      const values = await form.validateFields();
      await createBoardList({
        variables: {
          boardId: board.id,
          input: {
            order: (board?.lists?.length || 0) + 1,
            ...values,
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  }, [form]);

  return (
    <S.Wrapper>
      {!showForm ? (
        <S.Title onClick={() => setShowForm(true)} data-cy="create-list">
          Create new list
        </S.Title>
      ) : (
        <S.Form form={form} style={{ width: '100%' }} onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input list name!',
              },
            ]}
            data-cy="add-list-input"
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="List name"
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
            <Button type={'text'} block onClick={onCancel}>
              cancel
            </Button>
          </Form.Item>
        </S.Form>
      )}
    </S.Wrapper>
  );
};
