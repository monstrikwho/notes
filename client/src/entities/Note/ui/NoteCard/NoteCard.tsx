import { TNote } from 'entities/Note';
import classes from './styles.module.scss';

interface NoteCardProps {
  data: TNote;
}

export const NoteCard = ({ data }: NoteCardProps) => {
  return (
    <div className={classes.NoteCardBox}>
      <p>{data.message}</p>
      <span>ID: {data.id}</span>
    </div>
  );
};
