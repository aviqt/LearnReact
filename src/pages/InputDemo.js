import React, { Component } from 'react';
import formProvider from '../utils/formProvider';
import {Input} from 'antd';

class InputDemo extends Component {
   constructor(props) {  
    super(props);  
    this.state = { 
	  userid:'9f2ec079-7d0f-4fe2-90ab-8b09a8302aba',
	  keyword:''
	}
  }
  componentDidMount(){
    this.getData()
  }
  getData(){
	  const {userid,keyword} = this.state;
	fetch('http://saturn.51vip.biz:8065/api/Vote/VoteProjectList?keyword=' + keyword + '&userid=' + userid, {
      method: 'GET'
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
  }
  handleSubmit (e) {
    e.preventDefault();
  }
  render () {
	const {form:{title},onFormChange} = this.props;
    return (
      <div>
        <Input type='text' value={title.value} onChange={e => onFormChange('title',e.target.value)} />
		{!title.valid && <span style={{color:'red'}}>{title.error}</span>}
      </div>
    );
  }
}

InputDemo = formProvider({
  title:{
  	defaultValue:'',
	rules:[
	  {
	  	pattern:value => value.length > 0,
		error:'请输入用户名'
	  }
	]
  }
})(InputDemo)

export default InputDemo;
