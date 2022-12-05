import { Button as AntButton } from 'antd';
import styled from 'styled-components';

// $buttonColor instead of $color because it was colliding with SmallTextStyles css
export const StyledButton = styled(AntButton)<{
  $iconOnly: boolean;
  $hasIcon: boolean;
}>`
  &.ant-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm}px;
    width: ${({ $iconOnly }) => ($iconOnly ? '2rem' : 'min-content')};
    height: 2rem;

    box-shadow: none;
    transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1); // shortening antd click transition between states

    &.ant-btn-block {
      width: 100%;
    }

    &[ant-click-animating-without-extra-node='true']::after {
      display: none; // remove antd click animation
    }

    & > .ant-btn-loading-icon {
      display: ${({ $hasIcon }) => ($hasIcon ? 'none' : 'inline-block')};
      .anticon {
        padding-right: 2px; //fine-tuning
      }
    }
  }
`;
