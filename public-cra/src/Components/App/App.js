import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import Autocomplete from 'react-autocomplete';
import Autosuggest from 'react-autosuggest';
//import ComboboxNonB from '../ComboboxNonB/ComboboxNonB.js'
import AutocompleteMod from '../AutocompleteMod/AutocompleteMod.js'
import AutocompleteModWithNumbers from '../AutocompleteModWithNumbers/AutocompleteModWithNumbers.js'
//import GetKladr from '../../util/GetKladr';
//var customData = require('../../testdata/kladr.json');

class App extends React.Component {
  constructor() {
    super();
    this.state={
      kladr: ''
    }
}

 /*componentDidMount(){
   return fetch('/kladr')
   .then((response) => response.json())
   .then((responseJson) => {
     this.setState({
       message: responseJson.messege
     })
   })
   console.log(this.state.message);
 }*/

 render() {

    return (
      <div>
        <AutocompleteMod />
        <AutocompleteModWithNumbers />
      </div>
      );
  }
}

export default App;
