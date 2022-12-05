import styled from 'styled-components';

export const Star = styled.div`
  display: none;
  align-self: flex-start;
  justify-self: end;
`;

export const BoardWrapper = styled.div`
  display: grid;
  height: 9rem;
  width: 18rem;
  cursor: pointer;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  justify-content: space-between;
  border-radius: 0.125rem;
  background-color: rgb(2, 106, 167);
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;

  &:hover ${Star} {
    display: initial;
  }
`;

export const Title = styled.h1`
  color: white;
  grid-column: span 5 / span 5;

  &.starred {
  }
`;
