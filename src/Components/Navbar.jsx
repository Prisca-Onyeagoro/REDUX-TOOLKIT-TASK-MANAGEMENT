import React from 'react';
import {
  HowToReg,
  ExitToApp,
  Login,
  AccountCircle,
} from '@mui/icons-material/';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/Auth/Auth';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  textDecoration: 'none',
  color: 'whitesmoke',
});

const Navbar = () => {
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onlogout = () => {
    Dispatch(logout());
    Dispatch(reset());
    window.location = '/login';

    // Navigate('/login');
  };

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Box>
            <Link to="/">
              <Typography sx={{ color: 'white', textDecoration: 'none' }}>
                Goal Management
              </Typography>
            </Link>
          </Box>
          <Box display="flex" flexDirection="row" gap={10}>
            {user ? (
              <>
                {' '}
                <Button variant="h4" onClick={onlogout}>
                  <Typography sx={{ color: 'white', textDecoration: 'none' }}>
                    <ExitToApp />
                    Logout
                  </Typography>
                </Button>{' '}
              </>
            ) : (
              <>
                <Link to="/register">
                  <Typography sx={{ color: 'white', textDecoration: 'none' }}>
                    <HowToReg />
                    Register
                  </Typography>
                </Link>
                <Link to="/login">
                  <Typography sx={{ color: 'white', textDecoration: 'none' }}>
                    <Login />
                    Login
                  </Typography>
                </Link>
              </>
            )}
          </Box>
        </StyledToolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
