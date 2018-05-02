import React, { Component } from 'react';
import './AutocompleteMod.css';
import Autocomplete from 'react-autocomplete';
import Autosuggest from 'react-autosuggest';
//import ComboboxNonB from '../ComboboxNonB/ComboboxNonB.js'

//import ExpressRouting from '../../util/ExpressRouting';

const kladr = [
  {
      Id: 0,
      City: 'г. Белинский'
    },
    {
      Id: 1,
      City: 'г. Каменка'
    },
    {
      Id: 2,
      City: 'ЗАТО п. Солнечный'
    },
    {
      Id: 3,
      City: 'р.п. Тамала'
    },
    {
      Id: 4,
      City: 'Антропшино (Сусанинское СП)'
    },
    {
      Id: 5,
      City: 'Адыгейск'
    },
    {
      Id: 6,
      City: 'Майкоп'
    },
    {
      Id: 7,
      City: 'Иткуловский 1-й'
    },
    {
      Id: 8,
      City: 'Абдрашитовский'
    },
    {
      Id: 9,
      City: 'Абдулкаримовский'
    },
    {
      Id: 10,
      City: 'Абдуллинский'
    },
    {
      Id: 11,
      City: 'Абзаевский'
    },
    {
      Id: 12,
      City: 'Абзаковский'
    },
    {
      Id: 13,
      City: 'Абзановский'
    },
    {
      Id: 14,
      City: 'Абзановский'
    },
    {
      Id: 15,
      City: 'Абитовский'
    }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {

  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

}

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

function randomDelay() {
  return 300 + Math.random() * 1000;
  console.log(123);
}

const renderSuggestionsContainer = ({ containerProps, children, query }) => (
  <div {...containerProps}>
    {children}
    {
      <div className="footer">
        Press Enter to search <strong>{query}</strong>
      </div>
    }
  </div>
);

class AutocompleteMod extends React.Component {
  constructor() {
    super();

    this.state = {
     value: '',
     suggestions: [],
     noSuggestions: false,
     error: false,
     download: false,
     numberOfOptions: 0,
     isLoadinig: false
   };

   this.getSuggestions = this.getSuggestions.bind(this);
 }

 loadSuggestions(value) {
   this.setState({
     isLoading: true
   });

   // Fake an AJAX call
   setTimeout(() => {
     const suggestions =  this.getSuggestions(value);

     if (value === this.state.value) {
       this.setState({
         isLoading: false,
         suggestions
       });
     } else { // Ignore suggestions if input value changed
       this.setState({
         isLoading: false
       });
     }
   }, randomDelay());
 }

 onChange = (event, { newValue, method }) => {
   this.setState({
     value: newValue
   });
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
       numberOfOptions: searchResult.length
     });
     return searchResult.splice(0,5);
  } else{
       return searchResult;
   }
}

 onSuggestionsFetchRequested = ({ value }) => {
   const suggestions = this.getSuggestions(value);
   const isInputBlank = value.trim() === '';
   const noSuggestions = !isInputBlank && suggestions.length === 0;

   this.setState({
     suggestions,
     noSuggestions
   });
 };

 onSuggestionsClearRequested = () => {
   this.setState({
     suggestions: []
   });
 };


render() {
   const { value, suggestions, noSuggestions,isLoading } = this.state;
   const inputProps = {
     placeholder: "Начните вводить код или название города",
     value,
     onChange: this.onChange
   };
   const status = (isLoading ? 'Loading...' : 'Type to load suggestions');

    return (
      <div>
      <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          renderSuggestionsContainer={renderSuggestionsContainer}/>
        {
        noSuggestions &&
          <div className="no-suggestions">
            Ничего не найдено
          </div>
      }
          <div className="no-suggestions">
          показаны 5 из {this.state.numberOfOptions}
          </div>

          <div className="status">
            <strong>Status:</strong> {status}
          </div>

        </div>
      );
  }
}

export default AutocompleteMod;
