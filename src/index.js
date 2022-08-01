import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import RouteSwitch from './RouteSwitch';
import Firebase, {FirebaseContext} from './components/Firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <RouteSwitch />
    </FirebaseContext.Provider>
  </React.StrictMode>
);


