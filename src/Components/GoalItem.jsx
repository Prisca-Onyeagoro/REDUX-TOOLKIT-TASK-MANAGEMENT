import { Box, Button, Stack, styled, Typography } from '@mui/material';
import { padding } from '@mui/system';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { deleteGoal } from '../redux/Goals/GoalSlice';
import React from 'react';

const StyledBox = styled(Box)({
  background: ' Whitesmoke',
});

const GoalItem = ({ goal }) => {
  const Dispatch = useDispatch();
  return (
    <StyledBox>
      <Box padding={5}>
        {goal.text}{' '}
        <Button onClick={() => Dispatch(deleteGoal(goal._id))}>
          <DeleteForever sx={{ color: 'red', marginRight: 3 }} />
        </Button>
      </Box>
      <Box>{new Date(goal.createdAt).toLocaleString('en-Us')}</Box>
    </StyledBox>
  );
};

export default GoalItem;
