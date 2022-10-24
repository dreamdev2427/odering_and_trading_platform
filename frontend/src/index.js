import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client';
import Auth, { StoProvider } from 'services/core/auth';
import client from 'services/apollo';
import themeController, { ThemeContext } from 'lib/themes/themeController';

import GlobalStyles from 'lib/globalStyles';
import Root from 'layouts/Root';

import 'react-datepicker/dist/react-datepicker.css';
import 'assets/scss/bootstrap.scss';
import 'assets/css/project.css';
import 'assets/css/imagegalary.css';
import 'assets/css/themify-icons.css';
import 'assets/scss/paper-dashboard.scss';

const App = () => {
  const [sto, setSto] = useState({ sto: Auth.sto });
  const [theme, setTheme] = useState(themeController);
  const updateTheme = useCallback((newTheme) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      ...newTheme,
    }))
  }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeContext.Provider value={{ setTheme: updateTheme }}>
        <ThemeProvider theme={theme}>
          <StoProvider value={{ ...sto, setSto }}>
            <BrowserRouter>
              <Root />
            </BrowserRouter>
            <GlobalStyles />
          </StoProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
