import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Components/Spinner';

import Goalform from '../Components/Goalform';
import { getGoals, reset } from '../redux/Goals/GoalSlice';
import GoalItem from '../Components/GoalItem';
const StyledBox = styled(Box)({
  position: 'relative',
  top: 50,
  bottom: 50,
});

const Dashboard = () => {
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      Navigate('/login');
    }
    Dispatch(getGoals());
    return () => {
      Dispatch(reset());
    };
  }, [user, Navigate, message, isError, Dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <StyledBox>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Welcome {user && user.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', fontSize: 24, color: 'blueviolet' }}
        >
          Goals DashBoard
        </Typography>
        <Box>
          <Goalform />
        </Box>
        <Box>
          {goals.length > 0 ? (
            <>
              <Box display="flex" color={'black'} gap={4}>
                {goals.map((goal) => (
                  <GoalItem key={goal._id} goal={goal} />
                ))}
              </Box>
            </>
          ) : (
            <>
              <Typography>Sorry You have no gaols</Typography>
            </>
          )}
        </Box>
      </StyledBox>
    </>
  );
};

export default Dashboard;
