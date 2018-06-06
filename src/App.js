import React, { Component } from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import UserAddPage from './pages/UserAdd';
import UserListPage from './pages/UserList';
import InputDemoPage from './pages/InputDemo';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/user/list' exact component={UserListPage}/>
        <Route path='/user/add' exact component={UserAddPage}/>
        <Route path='/input/demo' exact component={InputDemoPage}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/' exact component={HomePage}/>
      </Switch>
    );
  }
}

export default App;
