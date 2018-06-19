import React, { Component } from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import UserAddPage from './pages/UserAdd';
import UserEditPage from './pages/UserEdit';
import UserListPage from './pages/UserList';
import BookListPage from './pages/BookList';
import BookAddPage from './pages/BookAdd';
import BookEditPage from './pages/BookEdit'
import InputDemoPage from './pages/InputDemo';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/book/list' component={BookListPage}/>
        <Route path='/book/add' component={BookAddPage}/>
        <Route path='/book/edit/:id' component={BookEditPage}/>
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
