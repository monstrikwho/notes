import { NoteForm, NoteList } from 'entities/Note';

export const MainPage = () => {
  return (
    <div className='Сontainer'>
      <h1 className='Title'>List of notes</h1>
      <NoteForm />
      <NoteList />
    </div>
  );
};
