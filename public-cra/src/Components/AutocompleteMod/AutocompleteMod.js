//component with testting error of connecting, todo: add comments

import React from 'react';
import './AutocompleteMod.css';
import kladr from '../../testdata/kladr.json';
import Autosuggest from 'react-autosuggest';

//const kladr = customData;

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
     noSuggestions: true,//тригерит наличие совпадений (нужен для рендеринга состояния загрузки)
     isLoading: false,
     message:'',
     isServerError: false,
     noMatches: false,//нужен для рендеринга ошибки без совпадений
     isValidate: true,
     validationData:[],
     inputClassName: 'react-autosuggest__input'
    };

   this.lastRequestId = null;
   this.getSuggestions = this.getSuggestions.bind(this);
   this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);
   this.refreshState = this.refreshState.bind(this);
   this.onBlur = this.onBlur.bind(this);
   this.getKeyArray = this.getKeyArray.bind(this);
   this.inputOnFocus = this.inputOnFocus.bind(this);

};


loadSuggestions(value) {
  // Cancel the previous request
  if (this.lastRequestId !== null) {
    clearTimeout(this.lastRequestId);
  };

  this.setState(() => ({
    noSuggestions: true,
    isValidate: true,
    inputClassName: 'react-autosuggest__input'
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
  }, 500);

  setTimeout(() => {
    if(this.state.isLoading){
      console.log(`serverErrorCheck`);
      this.setState(() => ({
        isLoading: false,
        isServerError: true,
        suggestions: [{Id:'', City: ''}]
      }));
    console.log(this.state.isServerError);
    console.log(this.state.suggestions);
    };
  }, 1000);

  let delay = Math.random() * (1500 - 500) + 500;
  console.log(delay);

  //fakerequest for testing download and error
  this.lastRequestId = setTimeout(() => {
    console.log(this.state.isServerError);
    if(!this.state.isServerError){
      console.log('render the results');
      this.setState({
      isLoading: false,
      suggestions: this.getSuggestions(value),
      });
    };
  }, delay);

}

getSuggestions() {
  const {
    value,
    } = this.state;

   const escapedValue = escapeRegexCharacters(value.trim());
   if (escapedValue === '') {
     return [];
   };

   const regex = new RegExp('^' + escapedValue, 'i');

   let searchResult = kladr.filter(kladr => regex.test(kladr.City));

   if (searchResult.length>5)
    {
     this.setState(() => ({
       noSuggestions: false,
       noMatches: false,
       message: `Показано 5 из ${searchResult.length-5} найденных городов. Уточните запрос, чтобы увидеть остальные`,
       validationData: this.getKeyArray(searchResult,"City")
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
       message: '',
       validationData: searchResult
      }));
       return searchResult;
     }
}

onChange = (event, { newValue, method }) => {
  this.setState(() => ({
    value: newValue,
    noSuggestions: true,
  }));
};

onBlur() {
  console.log('lost focus');
  /* для валидации c lowerCase
  let lowerCaseData = this.state.validationData.map(item=>item.toLowerCase());

  if(lowerCaseData.indexOf(this.state.value.toLowerCase())===-1){
    console.log('render the onBlur error');
    this.setState(()=>({
      isValidate: false
    }));
  }*/
  if(this.state.validationData.indexOf(this.state.value)===-1){
    console.log('render the onBlur error');
    this.setState(()=>({
      isValidate: false,
      inputClassName:'react-autosuggest__input react-autosuggest__input--validation-error'
    }));
  }
}

inputOnFocus(){
  console.log('onFocus');
  this.setState(()=>({
    isValidate: true,
    inputClassName:'react-autosuggest__input'
  }));
}

getKeyArray(arrayOfObj, keyName){
    let resultArr=[];
    for(let i=0; i < arrayOfObj.length; i++){
      let nowObj = arrayOfObj[i];
      for(let key in nowObj){
        if(key == keyName){
          resultArr.push(nowObj[key]);
        };
      };
    };
    return resultArr;
  };

refreshState(){
  console.log('refresh state');
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
       <div className="footer react-autosuggest__advice react-autosuggest__advice--loader">
         Загрузка
       </div>
       </div>
       );
  }else if(this.state.isServerError){
      return(
        <div {...containerProps}>
         <div className="footer react-autosuggest__advice react-autosuggest__advice--server-error">
           Что-то пошло не так. Проверьте соединение с интернетом и попробуйте еще раз <br />
           <button className="react-autosuggest__advice__refresh-button" onClick={this.refreshState}>Обновить</button>
         </div>
         </div>
       );//todo: make for onpressKey = enter
    }else if(this.state.noMatches){
    return(
      <div {...containerProps}>
       <div className="footer react-autosuggest__advice">
         Не найдено
       </div>
       </div>
       );
 }else{
    return(
      <div {...containerProps}>
      {children}
      {
        <div className="footer react-autosuggest__advice react-autosuggest__advice--small">
          {this.state.message}
          </div>
      }
   </div>
    );
  }
};

render() {
   const { value, suggestions, isValidate } = this.state;
   const inputProps = {
     placeholder: "Начните вводить код или название",
     value,
     onChange: this.onChange,
     onBlur: this.onBlur,
     className: this.state.inputClassName,
     onFocus: this.inputOnFocus
  };

  return (
      <div className='react-autosuggest'>
      <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          highlightFirstSuggestion={true}
          />
          {
          !isValidate &&
            <div className="react-autosuggest__advice__validation">
              Выберите значение из списка
            </div>
        }
        </div>
      );
  }
}

export default AutocompleteMod;
