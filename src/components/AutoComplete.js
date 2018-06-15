import React from 'react';
import sytle from '../styles/auto-complete.less';

class AutoComplete extends React.Component {
  constructor(props){
	super(props);
	this.state = {
	  displayValue:'',
	  activeItemIndex:false
	}
  }
  render () {
    const {displayValue, activeItemIndex} = this.state;
	const {value,options} = this.props;
    return (
      <div className={'style.wrapper'}>
        <input value={value} />
		{options.length > 0 && (
		  <ul className={'style.options'}>
		  {options.map((i,index) => 
		    <li key={index}>
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