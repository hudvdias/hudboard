import React from 'react';
import ReactDOM from 'react-dom';
import { ColorModeScript } from '@chakra-ui/react';

import { App } from './views/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ColorModeScript />
  </React.StrictMode>,
  document.getElementById('root')
);