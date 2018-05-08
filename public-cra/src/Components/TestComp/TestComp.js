import React, { Component } from 'react';
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

let failedFetch = false

class TestComp extends React.Component {
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
   this.renderSuggestionsContainer =           this.renderSuggestionsContainer.bind(this);
   this.refreshState = this.refreshState.bind(this);
};


loadSuggestions(value) {
  // Cancel the previous request
  if (this.lastRequestId !== null) {
    clearTimeout(this.lastRequestId);
  }

  this.setState({
    isLoading: true,
    isServerError: false,
    suggestions: [{}]
  });

  console.log('failedFetch', failedFetch)
  if (!failedFetch) {
    failedFetch = true
     setTimeout(() => {
       console.log('fail the fetch once')
       this.setState({
         isLoading: false,
         isServerError: true,
         suggestions: [{}]
       });
      }, 1000);
    return
  }

   console.log('made it past fail');

  //set the error timeout


  let delay = Math.random() * (1300 - 800) + 800;

  //fake request for testing download and error
  this.lastRequestId = setTimeout(() => {
    this.setState(() => ({
      isLoading: false,
      suggestions: this.getSuggestions(value),
    }));
  }, delay);
}

getSuggestions() {
  const {
    value,
  } = this.state
  console.log('value', value);
   const escapedValue = escapeRegexCharacters(value.trim());
   if (escapedValue === '') {
     return [];
   }

   const regex = new RegExp('^' + escapedValue, 'i');

   let searchResult = customData.filter(customData => regex.test(customData.City));

   return searchResult;
}

onChange = (event, { newValue, method }) => {
  this.setState(() => ({
    value: newValue,
    noSuggestions: true
  }));
};

refreshState(value){
  console.log('refresh');
  this.setState({
    isLoading: true,
    isServerError: false,
    suggestions: [{}]
  });
  this.loadSuggestions(value);
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
         Download
       </div>
       </div>
       );
  }else if(this.state.isServerError){
      return(
        <div {...containerProps}>
         <div className="footer">
           ServerError
           <button onClick={this.refreshState}>Refresh</button>
         </div>
         </div>
         );
    }else if(this.state.noMatches){
    return(
      <div {...containerProps}>
       <div className=" footer">
        No matches
       </div>
       </div>
       );
 }else {
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
     placeholder: "start enter",
     value,
     onChange: this.onChange
  };

  return (
      <div>
      <Autosuggest
          suggestions={customData}
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

export default TestComp;
