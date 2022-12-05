import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  body > div:first-child {
    margin: 0;
    height: 100%;
  }

  div,
  header,
  footer {
    box-sizing: border-box;
  }

  .ant-layout-header {
    height: 3.5rem;
    line-height: 2.5rem;
    background-color: ${({ theme }) => theme.color.blue_60};
  }
`;

export default GlobalStyle;
