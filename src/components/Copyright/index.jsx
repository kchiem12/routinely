import { Typography } from "@mui/material";

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        {'Made with love from the Chiem family\'s living room '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default Copyright;