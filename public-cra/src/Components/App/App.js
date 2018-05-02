import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import Autocomplete from 'react-autocomplete';
import Autosuggest from 'react-autosuggest';
//import ComboboxNonB from '../ComboboxNonB/ComboboxNonB.js'
import AutocompleteMod from '../AutocompleteMod/AutocompleteMod.js'

import AutocompleteModWithNumbers from '../AutocompleteModWithNumbers/AutocompleteModWithNumbers.js'

import ExpressRouting from '../../util/ExpressRouting';


class App extends React.Component {
  constructor() {
    super();
    this.state={
      message: ""
    }
 }

 /*componentDidMount(){
   return fetch('api/hello')
   .then((response) => response.json())
   .then((responseJson) => {
     this.setState({
       message: responseJson.messege
     })
   })
 }*/

 render() {

    return (
      <div>
        <AutocompleteMod />
        <AutocompleteModWithNumbers />
        <p>{this.state.message}</p>
        </div>



      );
  }
}

export default App;
