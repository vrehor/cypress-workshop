import { Form as FormBase } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0.375rem;
  background-color: rgb(235, 236, 240);
  border-radius: 0.25rem;
  margin-bottom: 8rem;
  margin-left: 0.75rem;
  width: 18rem;
`;

export const Header = styled.div`
  display: flex;
  margin-bottom: 0.25rem;
`;

export const NameInput = styled.input<{
  $isEdit: boolean;
}>`
  outline: 0px solid transparent;
  outline-offset: 0px;
  color: rgb(17, 24, 39);
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
  flex-grow: 1;
  height: 2rem;
  display: inline-block;
  cursor: ${({ $isEdit }) => ($isEdit ? 'inherit' : 'pointer')};
  background-color: ${({ $isEdit }) =>
    $isEdit ? 'white' : 'rgb(235, 236, 240)'};

  &:hover {
    outline: 0px solid transparent;
    border-color: transparent;
  }
`;
export const Title = styled.div`
  color: rgb(107, 114, 128);
  cursor: pointer;
`;

export const Form = styled(FormBase)`
  padding: 0.375rem;
  background-color: white;
  border-radius: 0.25rem;
`;
