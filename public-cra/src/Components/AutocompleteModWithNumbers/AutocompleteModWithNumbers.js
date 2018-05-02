import React, { Component } from 'react';
import './AutocompleteModWithNumbers.css';
import Autocomplete from 'react-autocomplete';
import Autosuggest from 'react-autosuggest';

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

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return kladr
    .map(kladr => {
      return {
        title: kladr.filter(kladr => regex.test(kladr.Id)),
        kladr: kladr.filter(kladr => regex.test(kladr.City))
      };
    })
    .filter(section => kladr.length > 0);
}

function getSuggestionValue(suggestion) {
  return suggestion.City;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.City}</span>
  );
}

function renderSectionTitle(section) {
  return (
    <strong>{kladr.Id}</strong>
  );
}

function getSectionSuggestions(section) {
  return section.kladr;
}

class AutocompleteModWithNumbers extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        multiSection={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps} />
    );
  }
}

export default AutocompleteModWithNumbers;
