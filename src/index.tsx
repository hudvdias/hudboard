import React from 'react';
import ReactDOM from 'react-dom';
import { ColorModeScript } from '@chakra-ui/react';

import { theme } from './styles/theme';
import { App } from './views/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
  </React.StrictMode>,
  document.getElementById('root')
);