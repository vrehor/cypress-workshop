import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  padding-left: 7rem;
  padding-right: 7rem;
  column-gap: 2rem;
  align-items: stretch;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  height: 100vh;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  line-height: 2.25rem;
  margin-bottom: 2rem;
`;

export const FormWrapper = styled.div`
  align-self: center;
`;

export const SignupLink = styled(Link)`
  text-align: center;
  margin-top: 1rem;
  text-decoration-line: underline;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export const Img = styled.img`
  align-self: center;
  place-self: center;
  column-gap: 1.25rem;
  height: auto;
  max-width: 100%;
`;
