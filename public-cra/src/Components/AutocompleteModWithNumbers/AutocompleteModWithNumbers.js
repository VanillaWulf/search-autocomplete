import React, { Component } from 'react';
import './AutocompleteModWithNumbers.css';
import Autocomplete from 'react-autocomplete';
import Autosuggest from 'react-autosuggest';
//import ComboboxNonB from '../ComboboxNonB/ComboboxNonB.js'
//import ExpressRouting from '../../util/ExpressRouting';
import customData from '../../testdata/kladr.json';

const kladr = customData;

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

//render functions

function getSuggestionValue(suggestion) {
  return suggestion.City;
}

function renderSuggestion(suggestion) {
  return (
    <div>
    <span>{suggestion.Id}</span>
    <span>{suggestion.City}</span>
    </div>
  );
}

//customise component container

class AutocompleteModWithNumbers extends React.Component {
  constructor() {
    super();

    this.state = {
     value: '',
     suggestions: [],
     noSuggestions: false,
     error: false,
     numberOfOptions: 0,
     isLoadinig: false,
     message:''
   };

   this.getSuggestions = this.getSuggestions.bind(this);
   this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);
};

  getSuggestions(value) {
   const escapedValue = escapeRegexCharacters(value.trim());
   if (escapedValue === '') {
     return [];
   }

   const regex = new RegExp('^' + escapedValue, 'i');

   let searchResult = kladr.filter(kladr => regex.test(kladr.City));

   if (searchResult.length>5)
    {
     this.setState({
       message: `Показано 5 из ${searchResult.length} найденных городов. Уточните запрос,чтобы увидеть остальные`,
       numberOfOptions: searchResult.length
     });
     return searchResult.splice(0,5);
   } else if(searchResult.length!=0 && searchResult.length<5){
      this.setState({
      message: ''
      })
      console.log(this.searchResult);
      return searchResult;
    }else if(searchResult.length===0){
     console.log(123);
     this.setState({
       message:'Не найдено',
      });
      return [{Id:'', City: ''}];
    }
}

onChange = (event, { newValue, method }) => {
  this.setState({
    value: newValue
  });

};

 onSuggestionsFetchRequested = ({ value }) => {
  const suggestions = this.getSuggestions(value);
  const isInputBlank = value.trim() === '';
  const noSuggestions = !isInputBlank && suggestions.length === 0;

   this.setState({
     suggestions,
     noSuggestions,
   });
 };

 onSuggestionsClearRequested = () => {
   this.setState({
     suggestions: []
   });
 };

renderSuggestionsContainer ({ containerProps, children }) {
  if(!this.state.noSuggestions){
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
  }else if(this.state.noSuggestions){
    return(
      <div {...containerProps}>
       <div className="footer">
         Не найдено
       </div>
       </div>
       );
 }
};

render() {
   const { value, suggestions, noSuggestions, isLoading } = this.state;
   const inputProps = {
     placeholder: "Начните вводить код или название города",
     value,
     onChange: this.onChange
   };

    return (
      <div>
      <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          renderSuggestionsContainer={this.renderSuggestionsContainer}/>
        </div>
      );
  }
}

export default AutocompleteModWithNumbers;
