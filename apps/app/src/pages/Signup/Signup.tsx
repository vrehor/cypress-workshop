import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useSignupMutation } from '@common/data-access';
import { useUserStore } from '@common-ui/store';
import { Button, Form, Input } from 'antd';

import * as S from '../Login/Login.styles';

export const Signup = () => {
  const [form] = Form.useForm();
  const { setToken } = useUserStore();

  const { push } = useHistory();

  const [login] = useSignupMutation({
    onCompleted: response => {
      if (response?.signup?.__typename === 'LoginData') {
        setToken(response.signup.token);
        push('/');
      }
    },
  });

  const onFinish = useCallback(async () => {
    try {
      const values = await form.validateFields();
      await login({
        variables: {
          input: {
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
      <S.FormWrapper>
        <S.Title>Create a new account</S.Title>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="login-form-button"
            >
              Register
            </Button>
          </Form.Item>
          <S.SignupLink to="/login">
            Already have an account? Log in here
          </S.SignupLink>
        </Form>
      </S.FormWrapper>
      <S.Img src="/public/assets/signup.png" />
    </S.Wrapper>
  );
};
