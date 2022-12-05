import { Layout } from 'antd';
import styled from 'styled-components';

const { Header: HeaderBase } = Layout;

export const Wrapper = styled.div`
  background-color: rgb(0, 121, 191);
  min-height: 100vh;
`;

export const Header = styled(HeaderBase)`
  width: 100%;
  display: flex;
  gap: 0.125rem;
  padding: 0 1rem !important;
  background-color: rgb(0, 121, 191) !important;

  & > * {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }
`;

export const ItemsWrapper = styled.div`
  gap: 2rem;
  align-content: flex-start;
  flex-wrap: wrap;
  flex-grow: 1;
  display: flex;
  margin-left: 1rem;
  margin-right: 1rem;
`;

export const NameInput = styled.input<{
  $isEdit: boolean;
}>`
  outline: 0px solid transparent;
  outline-offset: 0px;
  color: ${({ $isEdit }) => ($isEdit ? 'inherit' : 'white')};
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-color: transparent;
  border-width: 0px;
  border-radius: 0.125rem;
  height: 2rem;
  display: inline-block;
  cursor: ${({ $isEdit }) => ($isEdit ? 'inherit' : 'pointer')};
  background-color: ${({ $isEdit }) => ($isEdit ? 'white' : '#1890ff')};

  &:hover {
    outline: 0px solid transparent;
    border-color: transparent;
  }
`;
