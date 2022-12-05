import React from 'react';
import { ButtonProps as AntButtonProps } from 'antd/lib/button';

import { StyledButton } from './Button.styles';

type ButtonProps = AntButtonProps & {
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
};

export const Button = ({
  icon,
  onClick,
  disabled,
  loading,
  children,
  ...props
}: ButtonProps) => (
  <StyledButton
    $iconOnly={!children && !!icon}
    $hasIcon={!!icon}
    disabled={disabled}
    loading={loading}
    onClick={e => {
      onClick?.(e);
      e.stopPropagation();
    }}
    {...props}
  >
    {icon}
    {children}
  </StyledButton>
);
