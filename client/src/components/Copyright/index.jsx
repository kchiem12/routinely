import { Typography } from "@mui/material";


// Footer
function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Made with love by Kenneth Chiem  © '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default Copyright;