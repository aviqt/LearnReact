import React from 'react';


import request, {get} from '../utils/request';

class UserList extends React.Component {
  constructor(props){
	super(props);
	this.state = {
      userList:[],
	  token:sessionStorage.getItem('access_token')
	};
  }
  componentWillMount(){
	get('http://localhost:4000/user',this)
	.then(res => {
	  this.setState({
	    userList:res
	  });
	});
  }
  render () {
	const {userList} = this.state;
    return (
      <div>
        <header>
          <h1>用户列表{this.state.token}</h1>
        </header>

        <main>
          <table style={{width:'300px'}}>
            <thead>
              <tr>
                <th>用户ID</th>
                <th>用户名</th>
                <th>性别</th>
                <th>年龄</th>
              </tr>
            </thead>

            <tbody>
              {
                userList.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.gender}</td>
                      <td>{user.age}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </main>
      </div>
    );
  }
}

export default UserList;