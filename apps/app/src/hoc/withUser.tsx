import React, { useEffect } from 'react';
import { useUserLazyQuery } from '@common/data-access';
import { useUserStore } from '@common-ui/store';
import { Skeleton } from 'antd';

export const withUser = <T,>(Component: React.ComponentType<T>) => {
  return (hocProps: T) => {
    const { token, user, setUser } = useUserStore();

    const [loadUser] = useUserLazyQuery({
      onCompleted: response => {
        let user: { email: string; id: number } | null = null;
        if (response?.user?.__typename === 'User') {
          user = response.user;
        }
        setUser(user);
      },
    });

    useEffect(() => {
      if (token) {
        loadUser();
      }
    }, [token]);

    if (!user && !!token) {
      return <Skeleton />;
    }

    return <Component {...hocProps} />;
  };
};
