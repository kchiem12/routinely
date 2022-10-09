import React, { useState } from 'react';
import { auth } from '../../Firebase';
import { Link } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import Typography from '@mui/material/Typography';


const PasswordForget = () => {


    //Sets state for dialog box and user email address
    const[open, setOpen] = useState(false);
    const[email, setEmail] = useState('');
    const[error, setError] = useState(null);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
        setError(null);
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        //Send to firebase
        auth.sendPasswordResetEmail(email).then(() => {
            handleClickClose();
            setEmail('');
            alert('Email has been sent!')


        }).catch(err => {
            setError(err.message);
        });
    };

    return ( 
        <div>
            <Link href='#' color={'secondary'}  onClick={handleClickOpen}>
                Forgot Password?
            </Link>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To reset your password, please type in your email address on the line below. You will shortly receive an email detailing
                        how to reset your password.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='email'
                        label='Email Address'
                        type='email'
                        fullWidth
                        variant='standard'
                        onChange={handleChange}
                    />
                    <Typography className='error'>
                        {error ? error : ''}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Actually, I remember!</Button>
                    <Button onClick={onSubmit}>Reset</Button>
                </DialogActions>
            </Dialog>
        </div>
     );
}
 
export default PasswordForget;