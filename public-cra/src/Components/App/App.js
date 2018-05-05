import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import Autocomplete from 'react-autocomplete';
import Autosuggest from 'react-autosuggest';
//import ComboboxNonB from '../ComboboxNonB/ComboboxNonB.js'
import AutocompleteMod from '../AutocompleteMod/AutocompleteMod.js'
import AutocompleteModRouting from '../AutocompleteModRouting/AutocompleteModRouting.js'
//var customData = require('../../testdata/kladr.json');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      kladr: []
    };
    this.componentDidMount();
    this.componentDidMount=this.componentDidMount.bind(this);
}

/* componentDidMount(){
   return fetch('/kladr')
   .then((response) => response.json())
   .then((responseJson) => {
     this.setState({
       kladr: responseJson.messege
     })
   });
   console.log(this.state.kladr);
   console.log('get kladr');
 }*/

 componentDidMount(){
    return fetch('/kladr')
    .then(res => res.json())
    .then(kladr =>this.setState({kladr}))
    };

 render() {
   console.log('get kladr');
   console.log(this.state.kladr);
    return (
      <div>
        <AutocompleteMod />
        <AutocompleteModRouting />
      </div>
      );
  }
}

export default App;
