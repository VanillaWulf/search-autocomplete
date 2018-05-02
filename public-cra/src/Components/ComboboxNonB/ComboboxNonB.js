import React, {Component} from 'react';
import './ComboboxNonB.css';
import Combobox from 'react-widgets/lib/Combobox'
import MenuHeader from '../MenuHeader/MenuHeader.js';

class ComboboxNonB extends Component{
  constructor(props){
    super(props);
}
  render(){
    return (
      <ComboBox />
    )
  };
}

export default ComboboxNonB;
