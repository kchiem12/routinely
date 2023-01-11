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
import theme from '../Theme/theme';
import { ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';

const SignUp = (props) => {

  const [registerError, setRegisterError] = React.useState('');

  // State that contains the data from the form
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const {firstName, lastName, password, passwordConfirm, email} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, isError, isSuccess, message} = useSelector((state) => state.auth);
  
  React.useEffect(() => {
    if (isError) {
      setRegisterError(message);
    }

    if (isSuccess || user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // Handle changes when textfield is typed into
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setRegisterError("Passwords do not match");
      return
    } else {
      const userData = {
        firstName,
        lastName,
        password,
        email
      };

      dispatch(register(userData));
    }
  };

  // Initalize variable to check if the email or password input is valid
  const isValid = firstName === '' || lastName ==='' || email ==='' || password === '' || passwordConfirm === '' ;
  return (
  <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">

        {/* Used to normalize CSS */}
        <CssBaseline />

        {/*Box layout for the sign up screen*/}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          {/*Avatar (to display the lock icon)*/}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          {/* This box takes 'form' as its root component */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="first-name"
                label="First Name"
                name="firstName"
                autoComplete="first-name"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="last-name"
                label="Last Name"
                name="lastName"
                autoComplete="last-name"
                autoFocus
                onChange={handleChange}
              />
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="password-confirm"
                autoComplete="confirm-password"
                onChange={handleChange}
              />

              {/* Throws an error here if there is an error */}
              <Typography className='err-signup'>
                  {registerError}
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isValid}
              >
                Sign Up
              </Button>

              <Grid container direction={"row-reverse"}>
                <Grid item>
                  <Link to="/" style={{textDecoration: 'none', color: '#C624B6'}}>
                    {"Have an account? Sign In!"}
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

export default SignUp;