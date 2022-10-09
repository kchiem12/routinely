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
import { Link } from 'react-router-dom';
import withRouter from '../components/withRouter';
import {auth, db} from '../Firebase';

const SignUp = (props) => {

    //Generates a new user object
    const defaultUser = {
      id: null,
      username: '',
      email: '',
      password: '',
      error: null,
      auth: null,
      last_login: null
    };

  const { location, navigate, params} = props.router;
    //Set state of the user
    const [user, setUser] = React.useState(defaultUser);


  // For when button is pressed
  const handleChange = e => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();


    //handles authentication, making sure that email and password is valid
    auth.createUserWithEmailAndPassword(user.email, user.password).then(authUser => {
        
        //declares the current user
        var theUser = auth.currentUser;

        //add to database
        var database_ref = db.ref();
        
        // Initializes the data that is to be stored into database
        var userData = {
            username: user.username,
            email: user.email,
            activities: 'Not created',
            last_login: Date.now()
        }

        database_ref.child('users/' + theUser.uid).set(userData);

        //wipes the user in file
        setUser(defaultUser);

        navigate('/dashboard');
    }).catch(err => {
        setUser({...user, error: err.message});
    });
  };

  // Initalize variable to check if the email or password input is valid
  const isValid = user.email === '' || user.password ==='';

  return (
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
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
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

              {/* Throws an error here if there is an error */}
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
  );
}

export default withRouter(SignUp);