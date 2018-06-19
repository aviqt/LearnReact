import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import request, {get,del} from '../utils/request';
import { Modal } from 'antd';
class BookList extends React.Component {
  constructor(props){
	super(props);
	this.state = {
      bookList:[]
	};
  }
  componentWillMount(){
	get('http://localhost:4000/book',this)
	.then(res => {
	  //console.log(res);
	  this.setState({
	    bookList:res
	  });
	});
  }
  
  handleEdit(book){
	this.props.history.push('/book/edit/' + book.id);
  }
  handleDel(book){
	let that = this;
	Modal.confirm({
	  title:'确定要删除' + book.name + '吗?',
	  content:'此操作不可逆!!', 
	  onOk() {
	    del('http://localhost:4000/book/' + book.id ,'',that)
	    .then(res => {
	      that.setState({
	        bookList:that.state.bookList.filter(i => i.id !== book.id)
	      });
	      alert('删除图书成功');
	    })
	    .catch(err => {
	      console.log(err);
	      alert('删除图书失败');
	    })
	  }
	});
	
	  
  }
  render () {
	const {bookList} = this.state;
    return (
      <HomeLayout title = '图书列表'>
        <table style={{width:'600px'}}>
          <thead>
            <tr>
              <th>图书ID</th>
              <th>图书名</th>
              <th>价格</th>
              <th>所有者ID</th>
              <th>操作</th>
            </tr>
          </thead>
      
          <tbody>
            {bookList.map((book) => 
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>￥{book.price}</td>
                <td>{book.owner_id}</td>
                <td>
				  <a href='javascript:void(0)' onClick={() => this.handleEdit(book)}>编辑</a>
				  &nbsp;
				  <a href='javascript:void(0)' onClick={() => this.handleDel(book)}>删除</a>
				</td>
              </tr>
            )}
          </tbody>
        </table>
      </HomeLayout>
    );
  }
}

export default BookList;