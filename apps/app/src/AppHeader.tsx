import React from 'react';
import { Helmet } from 'react-helmet';

export const AppHeader = () => {
  return (
    <Helmet>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/public/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/public/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/public/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/public/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/public/favicon/safari-pinned-tab.svg"
        color="#0c436b"
      />

      <meta name="msapplication-TileColor" content="#0c436b" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  );
};
