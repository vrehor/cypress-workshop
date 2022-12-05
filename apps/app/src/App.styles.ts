import { Button, Layout } from 'antd';
import styled from 'styled-components';

const { Header: HeaderBase, Content: ContentBase } = Layout;

export const Header = styled(HeaderBase)`
  display: grid;
  height: 3.5rem;
  width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  background-color: rgb(2, 106, 167);
  padding: 0;

  & > * {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }
`;

export const Content = styled(ContentBase)``;

export const Logo = styled.img`
  place-self: center;
  height: 2rem;
  opacity: 0.6;
`;

export const LoginButtonWrapper = styled.div`
  margin-right: 0.125rem;
  display: flex;
  justify-content: flex-end;
`;

export const HomeButton = styled(Button)`
  margin-left: 0.125rem;
  place-self: left;
`;
