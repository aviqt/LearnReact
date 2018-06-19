import React, { PropTypes }  from 'react';
import '../styles/auto-complete.css';

function getItemValue(item){
  return item.value || item;
}

class AutoComplete extends React.Component {
  constructor(props){
	super(props);
	this.state = {
	  displayValue:'',
	  activeItemIndex:false
	};
	this.handleKeyDown = this.handleKeyDown.bind(this);
	this.handleLeave = this.handleLeave.bind(this);
  }
  handleChange(value){
	this.setState({
	  activeItemIndex:-1,
	  displayValue:''
	});
	this.props.onValueChange(value);
  }
  
  handleKeyDown(e){
	const {activeItemIndex} = this.state;
	const {options} = this.props;
	switch(e.keyCode){
	  case 13:{
		if(activeItemIndex >= 0){
		  e.preventDefault();
		  e.stopPropagation();
		  this.handleChange(getItemValue(options[activeItemIndex]));
		}
		break;
	  }
	  case 38:
	  case 40:{
		e.preventDefault();
		this.moveItem(e.keyCode === 38 ? 'up' : 'down');
		break;
	  }
	}
  }
  
  moveItem(direction){
	const {activeItemIndex} = this.state;
	const {options} = this.props;
	const lastIndex = options.length - 1;
	let newIndex = -1;
	
	if(direction === 'up'){
	  if(activeItemIndex === -1){
		newIndex = lastIndex;
	  }else{
		newIndex = activeItemIndex - 1;
	  }
	}else{
	  if(activeItemIndex < lastIndex){
		newIndex = activeItemIndex + 1;
	  }
	}
	
	let newDisplayValue = '';
	if(newIndex >= 0){
	  newDisplayValue = getItemValue(options[newIndex]);
	}
	this.setState({
	  activeItemIndex:newIndex,
	  displayValue:newDisplayValue
	});
  }
  
  handleEnter(index){
	const currentItem = this.props.options[index];
	this.setState({
	  activeItemIndex:index,
	  displayValue:getItemValue(currentItem)
	});
	  
  }
  
  handleLeave (e){
	this.setState({
	  activeItemIndex:-1,
	  displayValue:''
	});
  }
  
  
  render () {
    const {displayValue, activeItemIndex} = this.state;
	const {value,options} = this.props;
    return (
      <div className={'wrapper'}>
        <input 
		  value={displayValue || value}
		  onChange={e => this.handleChange(e.target.value)}	
		  onKeyDown={this.handleKeyDown}
		/>
		{options.length > 0 && (
		  <ul className={'options'} onMouseLeave={this.handleLeave}>
		  {options.map((i,index) => 
		    <li 
			  key={index}
			  className={index === activeItemIndex ?'active':''}
			  onMouseEnter={() => this.handleEnter(index)}
			  onClick={() => this.handleChange(getItemValue(i))}
			>
				{i.text || i}
			</li>
		  )}
		  </ul>
		)}
		
      </div>
    );
  }
}

export default AutoComplete;