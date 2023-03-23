import { Suspense, useEffect } from 'react';
import { useHistory } from 'react-router';
import { HomeOutlined } from '@ant-design/icons';
import { ApolloProvider } from '@apollo/client';
import { Loader, LoginButton, Skeleton } from '@common-ui/components';
import { useApollo } from '@common-ui/config';
import { useDarkModeContext } from '@common-ui/context';
import { Layout, Spin } from 'antd';
import { ThemeProvider } from 'styled-components';

import { withUser } from './hoc/withUser';
import GlobalStyle from './themes/global-style';
import { darkTheme, lightTheme } from './themes/theme';
import { Router } from './Router';

import * as S from './App.styles';

import 'antd/dist/antd.min.css';

const { Footer } = Layout;

const AppWrapper = withUser(() => {
  const { push } = useHistory();
  const { isDarkMode } = useDarkModeContext();
  const themeMode = isDarkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Layout style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <S.Header>
          <S.HomeButton icon={<HomeOutlined />} onClick={() => push('/')} />
          <S.Logo src={'/public/assets/trello-logo.gif'} />
          <S.LoginButtonWrapper>
            <LoginButton />
          </S.LoginButtonWrapper>
        </S.Header>
        <S.Content>
          <Suspense fallback={<Skeleton.Base />}>
            <Router />
          </Suspense>
        </S.Content>
        <Footer style={{ textAlign: 'center' }}>
          ...powered by coffee and love ❤️ Vladimir Rehor
        </Footer>
      </Layout>
    </ThemeProvider>
  );
});

export const App = () => {
  const apolloClient = useApollo(null);

  useEffect(() => {
    Spin.setDefaultIndicator(<Loader />);
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <AppWrapper />
    </ApolloProvider>
  );
};
