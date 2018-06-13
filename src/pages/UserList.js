import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import request, {get,del} from '../utils/request';
import { Modal } from 'antd';
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
  
  handleEdit(user){
	this.props.history.push('/user/edit/' + user.id);
  }
  handleDel(user){
	let that = this;
	Modal.confirm({
	  title:'确定要删除' + user.name + '用户吗?',
	  content:'此操作不可逆!!', 
	  onOk() {
	    del('http://localhost:4000/user/' + user.id ,'',that)
	    .then(res => {
	      that.setState({
	        userList:that.state.userList.filter(i => i.id !== user.id)
	      });
	      alert('删除用户成功');
	    })
	    .catch(err => {
	      console.log(err);
	      alert('删除用户失败');
	    })
	  }
	});
	
	  
  }
  render () {
	const {userList} = this.state;
    return (
      <HomeLayout title = '用户列表'>
        <table style={{width:'400px'}}>
          <thead>
            <tr>
              <th>用户ID</th>
              <th>用户名</th>
              <th>性别</th>
              <th>年龄</th>
              <th>操作</th>
            </tr>
          </thead>
      
          <tbody>
            {userList.map((user) => 
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.gender}</td>
                <td>{user.age}</td>
                <td>
				  <a href='javascript:void(0)' onClick={() => this.handleEdit(user)}>编辑</a>
				  &nbsp;
				  <a href='javascript:void(0)' onClick={() => this.handleDel(user)}>删除</a>
				</td>
              </tr>
            )}
          </tbody>
        </table>
      </HomeLayout>
    );
  }
}

export default UserList;