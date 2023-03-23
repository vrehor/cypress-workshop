import { Form as FormBase } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  height: 9rem;
  width: 18rem;
  cursor: pointer;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  justify-content: space-between;
  border-radius: 0.125rem;
  background-color: rgb(196, 201, 204);
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
`;

export const Title = styled.h1`
  color: white;
  grid-column: span 6 / span 5;
`;

export const Form = styled(FormBase)`
  grid-column: span 6 / span 5;
`;
