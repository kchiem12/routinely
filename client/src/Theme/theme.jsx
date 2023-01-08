import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: 'Quicksand'
    },
    palette: {
        mode: 'dark',
        primary: {
          main: '#C624B6',
        },
        secondary: {
          main: '#FFFFFF',
        },
      },
});

export default theme;