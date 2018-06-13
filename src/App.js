import React, { Component } from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import UserAddPage from './pages/UserAdd';
import UserEditPage from './pages/UserEdit';
import UserListPage from './pages/UserList';
import InputDemoPage from './pages/InputDemo';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/user/list' component={UserListPage}/>
        <Route path='/user/add' component={UserAddPage}/>
        <Route path='/user/edit/:id' component={UserEditPage}/>
        <Route path='/input/demo' component={InputDemoPage}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/' exact component={HomePage}/>
      </Switch>
    );
  }
}

export default App;
