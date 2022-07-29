import './App.css';
import SignIn from './pages/SignIn';
import { ThemeProvider } from '@mui/material';
import theme from './configuration/theme.config'

function App() {
  return (
      <SignIn />
  );
}

export default App;
