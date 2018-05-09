//component with testting error of connecting, todo: add comments

import React, { Component } from 'react';
import theme from './AutocompleteMod.css';
import customData from '../../testdata/kladr.json';
import Autosuggest from 'react-autosuggest';

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

class AutocompleteMod extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     value: '',
     suggestions: [],
     noSuggestions: true,
     isLoading: false,
     message:'',
     isServerError: false,
     noMatches: false
   };

   this.lastRequestId = null;
   this.getSuggestions = this.getSuggestions.bind(this);
   this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);
   this.refreshState = this.refreshState.bind(this);
};


loadSuggestions(value) {
  // Cancel the previous request
  if (this.lastRequestId !== null) {
    clearTimeout(this.lastRequestId);
  }

  this.setState(() => ({
    noSuggestions: true
  }));

  // Fake request

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

  setTimeout(() => {
    if(this.state.isLoading){
      this.setState(() => ({
        isServerError: true,
        suggestions: [{}]
      }));
      return;
    };
  }, 1000);

  let delay = Math.random() * (1300 - 800) + 800;
  console.log(delay);

  //fakerequest for testing download and error
  this.lastRequestId = setTimeout(() => {
    this.setState({
      isLoading: false,
      suggestions: this.getSuggestions(value),
    });
  }, delay);

}

getSuggestions() {
  const {
    value,
  } = this.state;

   const escapedValue = escapeRegexCharacters(value.trim());
   if (escapedValue === '') {
     return [];
   }

   const regex = new RegExp('^' + escapedValue, 'i');

   let searchResult = kladr.filter(kladr => regex.test(kladr.City));

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
       noMatches: true
     }));
      return [{Id:'', City: ''}];
    } else if(searchResult.length!==0 && searchResult.length<5){

       this.setState(() => ({
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

refreshState(){
  console.log('refresh');
  this.loadSuggestions();
};

 onSuggestionsFetchRequested = ({ value }) => {
   this.loadSuggestions(value);
 };

 onSuggestionsClearRequested = () => {
   this.setState(() => ({
     suggestions: [],
     isServerError: false
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
   const { value, suggestions, noSuggestions, isLoading, noMatches } = this.state;
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
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          />
        </div>
      );
  }
}

export default AutocompleteMod;
