import { Modal as ModalBase } from 'antd';
import styled from 'styled-components';

export const Modal = styled(ModalBase)`
  & .ant-modal-footer > * {
    display: inline-block;
  }
`;
