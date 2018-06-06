import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <Link to='/user/list'>UserList</Link><br />
        <Link to='/user/add'>UserAdd</Link><br />
        <Link to='/input/demo'>InputDemo</Link>
      </div>
    );
  }
}

export default Home;
