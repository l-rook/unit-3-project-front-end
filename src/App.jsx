import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx';
import Landing from './components/Landing/Landing.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import SignupForm from './components/SignupForm/SignupForm.jsx';
import SigninForm from './components/SigninForm/SigninForm.jsx';
import * as authService from '../src/services/authService.js'; // import the authservice
import * as movieService from '../src/services/movieService.js'

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  useEffect(() => {
    movieService.index()
  }, [])

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <Route path="/" element={<Dashboard user={user} />} />
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;