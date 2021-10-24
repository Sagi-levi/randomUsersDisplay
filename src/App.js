import { useState,useMemo } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import { UserContext } from './Context/UserContext';
import TableOfUsers from './Components/TableOfUsers/TableOfUsers';
import UserDetails from './Components/UserDetalis/UserDetails';
function App() {
  const [user,setUser]=useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <Router>
      <Switch>
    <UserContext.Provider value={ value  }>
        <Route exact path="/">
         <TableOfUsers></TableOfUsers>
        </Route>
        <Route path="/:userName" exact>
         <UserDetails></UserDetails>
        </Route>
      </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
