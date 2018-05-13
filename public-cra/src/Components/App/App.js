import React from 'react';
import './App.css';
//import ComboboxNonB from '../ComboboxNonB/ComboboxNonB.js'
import AutocompleteMod from '../AutocompleteMod/AutocompleteMod.js'
import AutocompleteModRouting from '../AutocompleteModRouting/AutocompleteModRouting.js'
import TestComp from '../TestComp/TestComp.js'
import MenuHeader from '../MenuHeader/MenuHeader.js'
//var customData = require('../../testdata/kladr.json');

class App extends React.Component {
  constructor() {
    super();
    this.state={
      kladr: [],
      arrayKladr: []
    };
    /*this.componentDidMount();
    this.getKladrArray('ап');
    this.componentDidMount=this.componentDidMount.bind(this);
    this.getKladrArray = this.getKladrArray.bind(this);*/
}

 //woking fetch - uncomment

/*componentDidMount(){
    return fetch('/kladr')
    .then(res => res.json())
    .then(kladr =>this.setState({kladr}))
    };

    getKladrArray(term){
      return fetch(`/kladr/${term}`)
      .then(res => res.json())
      .then(arrayKladr => this.setState({arrayKladr}))
      };
*/
 render() {
    return (
      <div className="wrapper">
        <TestComp />
        <MenuHeader/>
        <AutocompleteModRouting />
        <MenuHeader />
        <AutocompleteMod />
        </div>
      );
  }
}

export default App;
