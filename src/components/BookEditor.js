import React from 'react';
import {post,put,get} from '../utils/request';
import formProvider from '../utils/formProvider';
import FormItem from '../components/FormItem';
import AutoComplete from '../components/AutoComplete';

class BookEditor extends React.Component {
  constructor(props){
	super(props);
	this.state = {
	  recommendUsers:[]
	};
	
  }
  getRecommendUsers(partialUserId){
	get('http://localhost:4000/user?id_like=' + partialUserId,this.props.routerPage)
	.then(res => {
	  if(!res)return;
	  if(res.length === 1 && res[0].id === partialUserId)return;
	  this.setState({
	    recommendUsers:res.map(user => {
	  	  return{
	  	    text:user.id + user.name,
			value:user.id
	  	  }
	    })
	  });
	});
  }
  timer = 0;
  handleOwnerIdChange(value){
	this.props.onFormChange('owner_id',value);
	this.setState({recommendUsers:[]});
	
	if(this.timer)clearTimeout(this.timer);
	if(value){
	  this.timer = setTimeout(() => {
		this.getRecommendUsers(value);
		this.timer = 0;
	  },200);
	}
  }
  componentWillMount(){
	const {editTarget,setFormValues} = this.props;
	//console.log(editTarget)
	if(editTarget){
	  setFormValues(editTarget);
	}
  }
  handleSubmit (e) {
    e.preventDefault();
    const {form: {name, price, owner_id}, formValid,editTarget} = this.props;
    if (!formValid) {
      alert('请填写正确的信息后重试');
      return;
    }
	let editType = '添加';
	let apiUrl = 'http://localhost:4000/book';
	let method = post;
	if(editTarget){
	  editType = '编辑';
	  apiUrl += '/' + editTarget.id;
	  method = put;
	}
	
	let data = {
      name: name.value,
      price: price.value,
      owner_id: owner_id.value
    };
    method(apiUrl, data, this)
    .then((res) => {
      if (res.id) {
        alert(editType + '图书成功');
	    this.props.routerPage.props.history.push('/book/list');
		return;
      } else {
        alert('添加失败');
      }
    })
    .catch((err) => console.error(err));
  }
  render () {
	const {recommendUsers} = this.state;
    const {form: {name, price, owner_id}, onFormChange} = this.props;
    return (
        <form onSubmit={(e) => this.handleSubmit(e)}>
	      <FormItem label='书名：' valid={name.valid} error={name.error}>
	  	  <input
              type="text"
              value={name.value}
              onChange={(e) => onFormChange('name', e.target.value)}
            />
	  	  </FormItem>
	      <FormItem label='价格：' valid={price.valid} error={price.error}>
            <input
              type="number"
              value={price.value || ''}
              onChange={(e) => onFormChange('price', +e.target.value)}
            />
	  	  </FormItem>
	      <FormItem label='所有者：' valid={owner_id.valid} error={owner_id.error}>

			<AutoComplete
			 value={owner_id.value?owner_id.value + '':''}
			 options={recommendUsers}
			 onValueChange={value => this.handleOwnerIdChange(value)}
			/>
	  	  </FormItem>

          <br/>
          <input type="submit" value="提交"/>
        </form>
    );
  }
}

BookEditor = formProvider({
  name: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return value.length > 0;
        },
        error: '请输入书名'
      },
      {
        pattern: /^.{1,10}$/,
        error: '书名最多10个字符'
      }
    ]
  },
  price: {
    defaultValue: 0,
    rules: [
      {
        pattern: function (value) {
          return value > 0;
        },
        error: '请输入价格'
      }
    ]
  },
  owner_id: {
    defaultValue: '',
    rules: [
      {
        pattern: /^\d{5}$/,
        error: '请输入合法的用户ID'
      }
    ]
  }
})(BookEditor);

export default BookEditor;