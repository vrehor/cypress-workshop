import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useLoginMutation } from '@common/data-access';
import { useUserStore } from '@common-ui/store';
import { Button, Form, Input } from 'antd';

import * as S from './Login.styles';

export const Login = () => {
  const [form] = Form.useForm();
  const { setToken } = useUserStore();

  const { push } = useHistory();

  const [login] = useLoginMutation({
    onCompleted: response => {
      if (response?.login?.__typename === 'LoginData') {
        setToken(response.login.token);
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
        <S.Title>Welcome back!</S.Title>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            data-cy="login-email"
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
            data-cy="login-password"
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
              block
              data-cy="login-submit"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
          <S.SignupLink to="/signup">
            Don't have an account? Sign up here
          </S.SignupLink>
        </Form>
      </S.FormWrapper>
      <S.Img src="/public/assets/login.png" />
    </S.Wrapper>
  );
};
