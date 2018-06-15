import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import BookEditor from '../components/BookEditor';
import {get} from '../utils/request';

class BookEdit extends React.Component {
  constructor(props){
	super(props);
	this.state = {
	  book:null
	};
  }
  componentWillMount(){
	const bookId = this.props.match.params.id;
	console.log(bookId)
	get('http://localhost:4000/book/' + bookId,this)
	.then(res => {
	  console.log(res);
	  this.setState({
		book:res
	  });
	})
  }
  render () {
	const {book} = this.state; 
    return (
      <HomeLayout title="编辑图书">
		{
          book ? <BookEditor routerPage={this} editTarget={book}/> : '加载中...'
        }
      </HomeLayout>
    );
  }
}

export default BookEdit;