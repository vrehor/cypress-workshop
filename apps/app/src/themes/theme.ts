import { DefaultTheme } from 'styled-components';

const commonThemeConfig: Pick<
  DefaultTheme,
  'breakpoint' | 'spacing' | 'typography'
> = {
  breakpoint: {
    mobile: '479px',
    tablet: '767px',
    smDesktop: '991px',
    desktop: '1199px',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
  },
  typography: {
    fontFamily: 'Roboto',
    size: {
      xs: 12,
      sm: 14,
      md: 16,
    },
    height: {
      xs: 18,
      sm: 22,
      md: 24,
    },
    fontWeight: {
      regular: 400,
      semiBold: 600,
    },
  },
};

export const commonColors = {
  // Grey
  grey_100: '#051925',
  grey_90: '#182B39',
  grey_80: '#233D4F',
  grey_60: '#4F697D',
  grey_40: '#9FB4C5',
  grey_20: '#EAF4FB',
  grey_10: '#F7FCFF',
  grey_0: '#FFFFFF',
  // Blue
  blue_100: '#00162D',
  blue_80: '#003A6A',
  blue_60: '#0867B5',
  blue_40: '#6EABFF',
  blue_20: '#D1E6FF',
  blue_10: '#EFF4FF',
  // Green
  green_100: '#011A0E',
  green_80: '#004329',
  green_60: '#008563',
  green_40: '#00C07E',
  green_20: '#B0FCD5',
  green_10: '#E9FFF3',
  // Red
  red_100: '#2D0709',
  red_80: '#750E13',
  red_60: '#C11A23',
  red_40: '#FF5B63',
  red_20: '#FFD7D9',
  red_10: '#FFF1F1',
  // Yellow
  yellow_100: '#221800',
  yellow_80: '#513D12',
  yellow_60: '#7E6302',
  yellow_40: '#E1B050',
  yellow_20: '#FFE2B1',
  yellow_10: '#FFF9F1',
};

export const lightTheme: DefaultTheme = {
  color: {
    ...commonColors,
  },
  ...commonThemeConfig,
};

export const darkTheme: DefaultTheme = {
  color: {
    ...commonColors,
  },
  ...commonThemeConfig,
};
