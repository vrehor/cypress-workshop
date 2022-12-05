import 'styled-components';

declare module '*.json' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any;
  export default value;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoint: {
      mobile: string;
      tablet: string;
      smDesktop: string;
      desktop: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
    };
    color: {
      // Grey
      grey_100: string;
      grey_90: string;
      grey_80: string;
      grey_60: string;
      grey_40: string;
      grey_20: string;
      grey_10: string;
      grey_0: string;
      // Blue
      blue_100: string;
      blue_80: string;
      blue_60: string;
      blue_40: string;
      blue_20: string;
      blue_10: string;
      // Green
      green_100: string;
      green_80: string;
      green_60: string;
      green_40: string;
      green_20: string;
      green_10: string;
      // Red
      red_100: string;
      red_80: string;
      red_60: string;
      red_40: string;
      red_20: string;
      red_10: string;
      // Yellow
      yellow_100: string;
      yellow_80: string;
      yellow_60: string;
      yellow_40: string;
      yellow_20: string;
      yellow_10: string;
    };
    typography: {
      fontFamily: string;
      fontWeight: {
        regular: number;
        semiBold: number;
      };
      size: {
        xs: number;
        sm: number;
        md: number;
      };
      height: {
        xs: number;
        sm: number;
        md: number;
      };
    };
  }
}
