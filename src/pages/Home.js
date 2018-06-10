import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';

class Home extends Component {
  render() {
    return (
      <HomeLayout title='Welcome'>
        <Link to='/user/list'>UserList</Link><br />
        <Link to='/user/add'>UserAdd</Link><br />
        <Link to='/input/demo'>InputDemo</Link>
      </HomeLayout>
    );
  }
}

export default Home;
