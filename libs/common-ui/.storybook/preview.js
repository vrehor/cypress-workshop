import React, { useEffect } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { DarkModeProvider, useDarkModeContext } from '../src/context';
import { darkTheme, lightTheme } from '../src/themes';
import GlobalStyle from '../src/themes/global-style';

import 'antd/dist/antd.min.css';

// load Roboto Flex font from apps/webapp/public folder
export const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto Flex';
    src: url('/assets/fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf');
  }

  * {
      font-family: 'Roboto Flex';
  }
`;

// const OriginalNextImage = NextImage.default;
//
// // eslint-disable-next-line no-import-assign
// Object.defineProperty(NextImage, 'default', {
//   configurable: true,
//   value: props => <OriginalNextImage {...props} unoptimized />,
// });

function MyAppWrapper(props) {
  const darkmode = useDarkMode();
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  useEffect(() => {
    toggleDarkMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkmode]);

  const themeMode = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <FontStyle />
      {props.children}
    </ThemeProvider>
  );
}

export const decorators = [
  Story => {
    const darkmode = useDarkMode();
    return (
      <DarkModeProvider storage="" defaultValue={darkmode}>
        <MyAppWrapper>{Story()}</MyAppWrapper>
      </DarkModeProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
};
