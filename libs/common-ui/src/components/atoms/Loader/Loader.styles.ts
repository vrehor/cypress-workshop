import { Spin as SpinBase } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
`;

export const Spin = styled(SpinBase)`
  .ant-spin-dot {
    color: ${({ theme }) => theme.color.green_20};
  }
`;
