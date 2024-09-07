import { FC } from 'react';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';

import { NotesProvider } from './NotesProvider';

interface IProviders {
  readonly children: JSX.Element;
}

const queryClient = new QueryClient();

export const RootProviders: FC<IProviders> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        preventDuplicate
      >
        <NotesProvider>{children}</NotesProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};
