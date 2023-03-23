import { ComponentProps, useCallback } from 'react';
import { useHistory } from 'react-router';
import { Button } from 'antd';

import { useUserStore } from '../../../store/userStore';

export const LoginButton = (props: ComponentProps<typeof Button>) => {
  const { user, setToken } = useUserStore();
  const { push } = useHistory();

  const redirectToLogin = useCallback(() => {
    push('/login');
  }, [push]);

  const logout = useCallback(() => {
    setToken(null);
  }, [push]);

  if (!user) {
    return (
      <Button {...props} onClick={redirectToLogin}>
        Login
      </Button>
    );
  }

  return (
    <Button onClick={logout} {...props} data-cy="logged-user">
      {user?.email}
    </Button>
  );
};
