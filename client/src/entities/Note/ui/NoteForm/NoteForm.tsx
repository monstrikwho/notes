import { useState } from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNotes } from 'app/providers';

export const NoteForm = () => {
  const { createNote } = useNotes();
  const [textValue, setTextValue] = useState('');

  const handleCreateNote = () => {
    createNote(textValue);
    setTextValue('');
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    handleCreateNote();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!textValue.trim().length) return;
    if (event.ctrlKey && event.key === 'Enter') handleCreateNote();
  };

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <FormControl variant='standard' sx={{ display: 'flex', gap: '10px' }}>
        <TextField
          value={textValue}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          label='Введите текст заметки'
          multiline
          rows={4}
        />
        <Box>
          <Button type='submit' disabled={!textValue.trim()}>
            <span>Сохранить</span>
            <span className='KeysCups'>
              Ctrl <KeyboardReturnIcon />
            </span>
          </Button>
        </Box>
      </FormControl>
    </form>
  );
};
