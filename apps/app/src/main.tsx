import ReactDOM from 'react-dom';
import { Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeProvider } from '@common-ui/context';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5';

import { App } from './App';
import { AppHeader } from './AppHeader';

ReactDOM.render(
  <div className="application">
    <AppHeader />
    <BrowserRouter>
      <Switch>
        <DarkModeProvider storage="local" defaultValue={null}>
          <QueryParamProvider adapter={ReactRouter5Adapter}>
            <App />
          </QueryParamProvider>
        </DarkModeProvider>
      </Switch>
    </BrowserRouter>
  </div>,
  document.getElementById('root')
);
