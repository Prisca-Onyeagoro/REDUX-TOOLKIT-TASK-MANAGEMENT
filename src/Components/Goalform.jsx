import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../redux/Goals/GoalSlice';

const Goalform = () => {
  const [text, setText] = useState();
  const Dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    Dispatch(createGoal({ text }));
    setText(' ');
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            textAlign: 'center',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Goals"
            variant="outlined"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Box>
        <Box textAlign={'center'}>
          <Button type="submit">Add Goal</Button>
        </Box>
      </form>
    </>
  );
};

export default Goalform;
