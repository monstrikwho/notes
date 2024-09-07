import { NotesApi, TNote } from 'entities/Note';
import { nanoid } from 'nanoid';
import { enqueueSnackbar } from 'notistack';
import { createContext, useState, useEffect, useContext } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useLocalStorage, useWebSocket } from 'shared/libs/hooks';
import { Socket } from 'socket.io-client';
// import { DefaultEventsMap } from 'socket.io/dist/typed-events';

interface NotesContext {
  socket: Socket | null;
  userId: string;
  notes: TNote[];
  listNotes: () => void;
  createNote: (message: string) => void;
  clearNotes: () => void;
}

interface INotesProvider {
  readonly children: JSX.Element;
}

const NotesContext = createContext<NotesContext>({} as NotesContext);

const NotesProvider: React.FC<INotesProvider> = ({ children }) => {
  const queryClient = useQueryClient();

  const [userId, setUserId] = useLocalStorage('userId', nanoid());
  const { socket } = useWebSocket({ userId });

  const { data: notes } = useQuery<TNote[]>(['list', userId], async () => (await NotesApi.list()).payload?.data || [], {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const handleCreate = (note: TNote) => {
      queryClient.setQueryData(['list', userId], (prevNotes: TNote[] | undefined) => [note, ...(prevNotes || [])]);
      enqueueSnackbar('Заметка создана');
    };
    const handleDelete = (note: TNote) => {
      queryClient.setQueryData(['list', userId], (prevNotes: TNote[] | undefined) => [
        ...(prevNotes || []).filter((item) => item.id !== note.id),
      ]);
      enqueueSnackbar('Заметка удалена');
    };
    const handleClear = () => {
      queryClient.setQueryData(['list', userId], (prevNotes: TNote[] | undefined) => []);
      enqueueSnackbar('Список заметок очищен');
    };

    socket.on('create', handleCreate);
    socket.on('delete', handleDelete);
    socket.on('clear', handleClear);

    return () => {
      socket.off('create', handleCreate);
      socket.off('delete', handleDelete);
      socket.off('clear', handleClear);
    };
  }, [socket, userId]);

  const listNotes = () => {
    NotesApi.list();
  };

  const createNote = (message: string) => {
    NotesApi.create(message);
  };

  const clearNotes = () => {
    NotesApi.clear();
  };

  return (
    <NotesContext.Provider value={{ userId, socket, notes: notes || [], listNotes, createNote, clearNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export { NotesProvider, NotesContext };

export const useNotes = () => {
  return useContext(NotesContext);
};
