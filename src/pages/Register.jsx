import { Box, Button, styled, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { HowToReg } from '@mui/icons-material/';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { register } from '../redux/Auth/authSlice';
import { register, reset } from '../redux/Auth/Auth';
import Spinner from '../Components/Spinner';
import { useHistory } from 'react-router';
// const history = useHistory();

const StyledBox = styled(Box)({
  position: 'relative',
  top: 50,
  bottom: 50,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const Register = () => {
  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formdata;
  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('password do not match, Try again');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      Dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      Navigate('/');
    }
    Dispatch(reset());
  }, [user, isError, isSuccess, Navigate, message, Dispatch]);
  const onChange = (e) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <StyledBox>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          <HowToReg /> Register
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Please Create An Account
        </Typography>
        <Box display="flex" justifyContent="center">
          <form onSubmit={HandleSubmit}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="on"
              display="flex"
              flexDirection="column"
            >
              <TextField
                id="outlined-basic"
                label="name"
                variant="outlined"
                name="name"
                value={name}
                onChange={onChange}
                type="text"
              />
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                name="email"
                value={email}
                onChange={onChange}
                type="email"
              />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                name="password"
                value={password}
                onChange={onChange}
                type="password"
              />
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                name="password2"
                value={password2}
                onChange={onChange}
                type="password"
              />
            </Box>
            <Box textAlign={'center'}>
              {' '}
              <Button type="submit" variant="contained">
                Register
              </Button>
            </Box>
          </form>
        </Box>
      </StyledBox>
    </>
  );
};

export default Register;
