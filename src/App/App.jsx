import React from 'react';
import './App.css';
import UserView from './UserView';
import UsersView from './UsersView';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Dashboard</h1>
        </header>
        <main>
          <Switch>
            <Route path="/user/:id?">
              <UserView />
            </Route>
            <Route path="/">
              <UsersView />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
