/* eslint-disable react/prop-types */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled, { ThemeProvider } from 'styled-components';

import Header from 'components/common/Header';
import { useDarkMode } from 'lib/theme/useDarkMode';
// import FooterBar from 'components/common/FooterBar';
import Footer from 'components/common/Footer';
import { lightTheme, darkTheme } from '../lib/theme/theme';
import { GlobalStyles } from '../lib/theme/global';

const Page = ({ title, children }) => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <>loading...</>;
  }

  return (
    <ThemeProvider theme={themeMode}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <GlobalStyles />
      <Header theme={theme} toggleTheme={toggleTheme} />
      {children}
    </ThemeProvider>
  );
};

export default Page;

const FooterWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 1rem;
  bottom: 1rem;
  left: -6rem;
`;
