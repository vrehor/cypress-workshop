import {useCallback, useState} from "react";
import {UserOutlined} from "@ant-design/icons";
import {useCreateBoardMutation} from "@common/data-access";
import {Button, Form, Input} from "antd";

import * as S from './NewBoardCard.styles'

export const NewBoardCard = () => {
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);

  const [createBoard] = useCreateBoardMutation({
    update: (cache) => {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: "boards"
      })
    },
    onCompleted: (response) => {
      if (response?.createBoard?.__typename === 'Board') {
        setShowForm(false);
        form.resetFields();
      }
    }
  });

  const onCancel = useCallback(() => {
    setShowForm(false)
    form.resetFields()
  }, [form])

  const onFinish = useCallback(async () => {
    try {
      const values = await form.validateFields();
      await createBoard({
        variables: {
          input: {
            ...values
          }
        }
      })
    } catch (e) {
      console.error(e);
    }
  }, [form])


  return <S.BoardWrapper>
    {!showForm
      ? <S.Title onClick={() => setShowForm(true)}>Create new board</S.Title>
      : <S.Form form={form} style={{width: '100%'}}
              onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input board name!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Board name"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="save-form-button">
            Save
          </Button>
          <Button type={'text'} onClick={onCancel}>cancel</Button>
        </Form.Item>
      </S.Form>}
  </S.BoardWrapper>
}
