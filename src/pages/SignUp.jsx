import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../components/Copyright';
import { Link } from 'react-router-dom';
import withRouter from '../components/withrouter';

import {auth, db} from '../Firebase';

const SignUp = (props) => {


  const handleChange = e => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  };

  //Generates a new user object
  const defaultUser = {
    id: null,
    email: '',
    password: '',
    error: null,
    auth: null,
    last_login: null
  };


  //Set state of the user
  const [user, setUser] = React.useState(defaultUser);

  const handleSubmit = (event) => {
    event.preventDefault();


    //handles authentication, making sure that email and password is valid
    auth.createUserWithEmailAndPassword(user.email, user.password).then(authUser => {
        
        //declares the current user
        var theUser = auth.currentUser;

        //add to database
        var database_ref = db.ref();
        
        var userData = {
            email: user.email,
            last_login: Date.now()
        }

        database_ref.child('users/' + theUser.uid).set(userData);

        //wipes the user in file
        setUser(defaultUser);

        alert('New account created!');
        // props.history.push("/dashboard");
    }).catch(err => {
        setUser({...user, error: err.message});
    });
  };

  const isValid = user.email === '' || user.password ==='';

  return (
      <Container component="main" maxWidth="xs">
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
            Sign up
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

            <Typography className='err-signup'>
                {user.error ? user.error : ''}
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
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to="/">
                  {"Have an account? Sign In!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}

export default withRouter(SignUp);