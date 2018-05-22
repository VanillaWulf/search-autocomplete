import React from 'react';
import './App.css';
import AutocompleteMod from '../AutocompleteMod/AutocompleteMod.js'
import AutocompleteModRouting from '../AutocompleteModRouting/AutocompleteModRouting.js'
import AutocompleteScroll from '../AutocompleteScroll/AutocompleteScroll.js'
import MenuHeader from '../MenuHeader/MenuHeader.js'

class App extends React.Component {

 render() {
    return (
      <div className="wrapper">
        <AutocompleteScroll />
        <MenuHeader name={'С рандомной задержкой ответа'}/>
        <AutocompleteMod />
        <MenuHeader name={'С запросом на сервер'}/>
        <AutocompleteModRouting />
        </div>
      );
  }
}

export default App;
