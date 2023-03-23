import React, { useCallback } from 'react';
import {
  useDeleteCardMutation,
  useUpdateCardMutation,
} from '@common/data-access';
import { Button, Form } from '@common-ui/components';
import { DatePicker, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';

import * as S from './CardEditModal.styles';

type Props = {
  card: {
    id: number;
    name: string;
    description?: string;
    order: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deadline?: any;
  };
  isOpen: boolean;
  onCancel: () => void;
  onOk: () => void;
};

export const CardEditModal = ({ onCancel, onOk, isOpen, card }: Props) => {
  const [form] = useForm();

  const [saveCard] = useUpdateCardMutation({
    onCompleted: () => {
      onOk();
    },
  });

  const [deleteCard] = useDeleteCardMutation({
    update: cache => {
      cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'board',
      });
    },
    onCompleted: () => {
      onCancel();
    },
  });

  const handleDelete = useCallback(async () => {
    deleteCard({
      variables: {
        cardId: card.id,
      },
    });
  }, [card]);

  const handleOk = useCallback(async () => {
    try {
      const values = await form.validateFields();
      saveCard({
        variables: {
          cardId: card.id,
          input: values,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }, [card]);

  return (
    <S.Modal
      title="Edit card"
      visible={isOpen}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose={true}
      footer={[
        <Button key="back" onClick={onCancel} data-cy="cancel">
          Return
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk} data-cy="save">
          Submit
        </Button>,
        <Button type="link" onClick={handleDelete} data-cy="card-detail-delete">
          Delete
        </Button>,
      ]}
    >
      <Form
        form={form}
        style={{ width: '100%' }}
        onFinish={handleOk}
        layout={'vertical'}
        data-cy="card-detail"
        initialValues={{
          ...card,
          deadline: card?.deadline ? moment(card.deadline) : null,
        }}
      >
        <Form.Item
          name="name"
          label={'Card name'}
          rules={[
            {
              required: true,
              message: 'Please input name!',
            },
          ]}
        >
          <Input placeholder="'Enter a name for this card ...'" name="name" />
        </Form.Item>
        <Form.Item name="deadline" label={'Deadline'} data-cy="deadline">
          <DatePicker format={'MMM DD YYYY'} />
        </Form.Item>
        <Form.Item
          label={'Description'}
          name="description"
          data-cy="card-description"
        >
          <TextArea placeholder="'Enter a description for this card ...'" />
        </Form.Item>
      </Form>
    </S.Modal>
  );
};
