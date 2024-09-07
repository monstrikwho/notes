import { createRoot } from 'react-dom/client';

import App from 'app/App';
import { RootProviders } from 'app/providers';

import 'app/styles/main.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <RootProviders>
    <App />
  </RootProviders>,
);
