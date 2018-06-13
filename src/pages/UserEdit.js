import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import UserEditor from '../components/UserEditor';
import {get} from '../utils/request';

class UserEdit extends React.Component {
  constructor(props){
	super(props);
	this.state = {
	  user:null
	};
  }
  componentWillMount(){
	const userId = this.props.match.params.id;
	console.log(userId)
	get('http://localhost:4000/user/' + userId,this)
	.then(res => {
	  console.log(res);
	  this.setState({
		user:res
	  });
	})
  }
  render () {
	const {user} = this.state; 
    return (
      <HomeLayout title="编辑用户">
		{
          user ? <UserEditor routerPage={this} editTarget={user}/> : '加载中...'
        }
      </HomeLayout>
    );
  }
}

export default UserEdit;