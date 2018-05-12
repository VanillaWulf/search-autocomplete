import React, { Component } from 'react';
import './MenuHeader.css';

class MenuHeader extends Component{
  constructor(props){
    super(props);
}
  render(){
    return (
      <h2 className="menu-header">Город</h2>
    )
  };
}

export default MenuHeader;
