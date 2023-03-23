import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0.5rem;
  background-color: white;
  border-color: rgb(248, 249, 249);
  border-style: solid;
  border-width: 1px;
  border-radius: 0.25rem;
  cursor: pointer;
  display: grid;
  margin-top: 0.375rem;
  margin-bottom: 0.375rem;
`;

export const Edit = styled.div`
  display: none;
  align-self: flex-start;
  justify-self: end;
`;

export const Header = styled.div`
  padding-left: 0.125rem;
  padding-right: 0.375rem;
  display: flex;

  &:hover ${Edit} {
    display: initial;
  }
`;
export const InputLabel = styled.label`
  display: inline-flex;
  align-items: center;

  & > input {
    height: 1rem;
    width: 1rem;
    color: rgb(41, 143, 202);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

export const Title = styled.div`
  color: rgb(31, 41, 55);
  white-space: break-spaces;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-left: 0.5rem;
  flex-grow: 1;
`;

export const Deadline = styled.div`
  padding-left: 0.125rem;
  padding-right: 0.375rem;
  display: flex;
  color: rgb(149, 157, 161);
  font-size: 0.75rem;
  line-height: 1rem;
  padding-left: 0.375rem;
  padding-right: 0.375rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

export const ClockCircleIcon = styled.div`
  width: 1rem;
  width: 1rem;
  display: inline-block;
  vertical-align: middle;
`;

export const DeadlineText = styled.span<{
  $isDone: boolean;
  $isOverdue: boolean;
}>`
  margin-left: 0.5rem;
  background-color: ${({ $isOverdue, $isDone }) =>
    $isDone ? 'rgb(123, 200, 108)' : $isOverdue ? 'rgb(239,68,68)' : 'inherit'};
  color: ${({ $isOverdue, $isDone }) =>
    $isDone || $isOverdue ? 'white' : 'inherit'};
`;
