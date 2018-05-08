//component with routing to serv

import React, { Component } from 'react';
import theme from './AutocompleteModRouting.css';
import Autocomplete from 'react-autocomplete';
import customData from '../../testdata/kladr.json';
import Autosuggest from 'react-autosuggest';
import GetKladr from '../../util/GetKladr.js';

//const kladr = customData;

//work with array
function getSuggestionValue(suggestion) {
  return suggestion.City;
}

function renderSuggestion(suggestion) {
  return (
    <div>
    <span>{suggestion.City}</span>
    </div>
  );
}

class AutocompleteModRouting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     value: '',
     results:[],
     suggestions: [],
     noSuggestions: false,
     isLoading: false,
     message:'',
     isServerError: false,
     noMatches: false
   };

   this.lastRequestId = null;
   this.getSuggestions = this.getSuggestions.bind(this);
   this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);

   };


loadSuggestions(value) {
  // Cancel the previous request
  if (this.lastRequestId !== null) {
    clearTimeout(this.lastRequestId);
  }

  this.setState(() => ({
    noSuggestions: true
  }));
  //
  setTimeout(() => {
    console.log('start loading');
    if(this.state.noSuggestions){
      this.setState(() => ({
        isLoading: true,
        isServerError: false,
        suggestions: [{}]
      }));
    };
  }, 300);

  GetKladr.getKladrArray(value)
   .then(results =>this.setState({results}));

  //Fake request
    this.lastRequestId = setTimeout(() => {
    this.setState({
      isLoading: false,
      suggestions: this.getSuggestions(value),
    });
  }, 1000);
};

  getSuggestions(value) {

  let searchResult = this.state.results;

  if (searchResult.length>5)
    {
     this.setState(() => ({
       noSuggestions: false,
       noMatches: false,
       message: `Показано 5 из ${searchResult.length} найденных городов. Уточните запрос,чтобы увидеть остальные`,
     }));
     return searchResult.splice(0,5);
   } else if(searchResult.length===0){
     this.setState(() => ({
       noSuggestions: true,
       noMatches: false
     }));
      return [{Id:'', City: ''}];
    } else if(searchResult.length!=0 && searchResult.length<5){
       this.setState(()=>({
         noSuggestions: false,
         noMatches: false,
         message: ''
       }));
       return searchResult;
     }
}

onChange = (event, { newValue, method }) => {
  this.setState(() => ({
    value: newValue,
    noSuggestions: true
  }));
};

 onSuggestionsFetchRequested = ({ value }) => {
   this.loadSuggestions(value);
 };

 onSuggestionsClearRequested = () => {
   this.setState(() => ({
     suggestions: [],
   }));
 };

//customise component container
renderSuggestionsContainer  ({ containerProps, children }) {
  if(this.state.isLoading){
    return(
      <div {...containerProps}>
       <div className="footer">
         Грузится
       </div>
       </div>
       );
  }else if(this.state.isServerError){
      return(
        <div {...containerProps}>
         <div className="footer">
           Ошибка
            <button onClick={this.refreshState}>Обновить</button>
         </div>
         </div>
       );//todo: make for onpressKey = enter
    }else if(this.state.noMatches){
    return(
      <div {...containerProps}>
       <div className=" footer">
         Не найдено
       </div>
       </div>
       );
 }else{
    return(
      <div {...containerProps}>
      {children}
      {
        <div className="footer">
          {this.state.message}
          </div>
      }
   </div>
    );
  }
};

render() {
   const { value, suggestions, noSuggestions, isLoading, results, noMatches } = this.state;
   const inputProps = {
     placeholder: "Начните вводить код или название города",
     value,
     onChange: this.onChange
   };

  return (
      <div>
      <Autosuggest
          suggestions={suggestions}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          />
        </div>
      );
  }
}

export default AutocompleteModRouting;
