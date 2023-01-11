import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import PasswordForget from '../components/PasswordForget';
import { ThemeProvider } from "@mui/material/styles";
import theme from '../Theme/theme';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';


function SignIn(props) {

  // Used to log any error when logging in
  const [loginError, setLoginError] = React.useState('');


   // State that contains the data from the login form
   const [formData, setFormData] = React.useState({
    password: '',
    email: '',
  });

  const {password, email} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, isError, isSuccess, message} = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (isError) {
      setLoginError(message);
    }

    if (isSuccess || user) {
      navigate('/dashboard');
    }

    dispatch(reset());

  }, [user, isError, isSuccess, message, navigate, dispatch]);


  // Used to handle updates in the form
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  // If both fields are filled with something, then button will light up
  const isValid = email === '' || password ==='';

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const userData = {
      email,
      password
    };

    dispatch(login(userData));
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />

              <Typography className='error'>
                {loginError}
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isValid}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>

                <PasswordForget>
                </PasswordForget>

              </Grid>

              <Grid item>
                <Link to="/sign-up" style={{textDecoration: 'none', color: '#C624B6'}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      </ThemeProvider>
  );
}

export default SignIn;