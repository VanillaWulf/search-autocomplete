//component with routing to serv

import React, { Component } from 'react';
import theme from './AutocompleteModRouting.css';
import Autocomplete from 'react-autocomplete';
import customData from '../../testdata/kladr.json';
import Autosuggest from 'react-autosuggest';
import GetKladr from '../../util/GetKladr';

const kladr = customData;

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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
     suggestions: [],
     noSuggestions: false,
     isLoadinig: false,
     message:'',
     isServerError: false
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
  //
  this.setState({
    isLoading: true,
  });

  // Fake request
    this.lastRequestId = setTimeout(() => {
    this.setState({
      isLoading: false,
      suggestions: this.getSuggestions(value),
    });
  }, 1000);
}

  getSuggestions(value) {
   const escapedValue = escapeRegexCharacters(value.trim());
   if (escapedValue === '') {
     return [];
   }
   console.log('autocomplete');
   const regex = new RegExp('^' + escapedValue, 'i');

   let searchResult = kladr.filter(kladr => regex.test(kladr.City));

   if (searchResult.length>5)
    {
     this.setState({
       noSuggestions: false,
       message: `Показано 5 из ${searchResult.length} найденных городов. Уточните запрос,чтобы увидеть остальные`,
      });
     return searchResult.splice(0,5);
   } else if(searchResult.length===0){
     this.setState({
       noSuggestions: true
     });
      return [{Id:'', City: ''}];
    } else if(searchResult.length!=0 && searchResult.length<5){
       this.setState({
       message: ''
       })
       return searchResult;
     }
}

onChange = (event, { newValue, method }) => {
  this.setState({
    value: newValue
  });
};

 onSuggestionsFetchRequested = ({ value }) => {
   this.loadSuggestions(value);
 };

 onSuggestionsClearRequested = () => {
   this.setState({
     suggestions: []
   });
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
           <button>Обновить</button>
         </div>
         </div>
         );
    }else if(this.state.noSuggestions){
    return(
      <div {...containerProps}>
       <div className=" footer">
         Не найдено
       </div>
       </div>
       );
 }else if(!this.state.noSuggestions){
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

export default AutocompleteModRouting;
