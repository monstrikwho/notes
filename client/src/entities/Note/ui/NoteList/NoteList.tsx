import clsx from 'clsx';
import { NullBox } from 'shared/ui';
import { useNotes } from 'app/providers';
import { NoteCard } from 'entities/Note';
import classes from './styles.module.scss';

export const NoteList = () => {
  const { notes, clearNotes } = useNotes();

  return (
    <div className={classes.NoteListRoot}>
      <div className={classes.Header}>
        <div className={classes.Title}>Список заметок</div>
        <div className={clsx(classes.Action, { [classes.Active]: notes?.length })} onClick={clearNotes}>
          Очистить список
        </div>
      </div>
      {notes?.length ? (
        <div className={classes.NoteListBox}>{notes?.map((item, key) => <NoteCard key={key} data={item} />)}</div>
      ) : (
        <NullBox />
      )}
    </div>
  );
};
