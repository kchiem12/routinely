import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: 'Quicksand'
    },
    palette: {
        mode: 'dark',
        primary: {
          main: '#FFFFFF',
        },
        secondary: {
          main: '#C624B6',
        },
      },
});

export default theme;