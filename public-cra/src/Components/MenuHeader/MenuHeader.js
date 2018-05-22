import React, { Component } from 'react';
import './MenuHeader.css';


class MenuHeader extends Component{
  render(){
    return (
      <h2 className="menu-header">{this.props.name}</h2>
    )
  };
}

export default MenuHeader;
