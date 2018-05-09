//component with routing to serv

import React, {Component} from 'react'
import Autocomplete from 'react-autocomplete';
import { fakeCategorizedRequest } from '../../util/lib.js';
import customData from '../../testdata/kladr.json';

import Downshift from 'downshift';

import {render} from 'react-dom';
import glamorous, {Div} from 'glamorous';
import {css} from 'glamor';
import matchSorter from 'match-sorter';
import starWarsNames from 'starwars-names';
import {
  Label,
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
} from './Components.js';

const kladr = customData;

function ExampleDownshift({itemToString, items, ...rest}) {
  return (
    <Downshift
      itemToString={itemToString}
      {...rest}
      render={({
        getLabelProps,
        getInputProps,
        getButtonProps,
        getItemProps,
        isOpen,
        toggleMenu,
        clearSelection,
        selectedItem,
        inputValue,
        highlightedIndex,
        noMatches
      }) => (
        <div className={css({width: 250, margin: 'auto'})}>
          <Label {...getLabelProps()}>Find a Star Wars character</Label>
          <Div position="relative">
            <Input
              {...getInputProps({
                isOpen,
                placeholder: 'Enter a name',
              })}
            />
            {selectedItem ? (
              <ControllerButton
                onClick={clearSelection}
                aria-label="clear selection"
              >
                <XIcon />
              </ControllerButton>
            ) : (
              <ControllerButton {...getButtonProps()}>
                <ArrowIcon isOpen={isOpen} />
              </ControllerButton>
            )}
          </Div>
          {!isOpen ? null : (
            <Menu>
              {items.map((item, index) => (
                <Item
                  key={item.Id}
                  {...getItemProps({
                    item,
                    index,
                    isActive: highlightedIndex === index,
                    isSelected: selectedItem === item,
                  })}
                >
                  {itemToString(item)}
                </Item>
              ))}
              {noMatches}(
              No Matches
              )
            </Menu>
          )}
        </div>
      )}
    />
  )
}

class TestComp extends React.Component {
  allItems = customData;
  state = {items: this.allItems};
  handleStateChange = (changes, downshiftState) => {
    if (changes.hasOwnProperty('inputValue')) {
      this.setState({items: this.getItems(changes.inputValue)});
    }
    // handle stuff here if you need to
    // this is especially useful if you need
    // to controll some of the internal state yourself
  }
  handleChange = (selectedItem, downshiftState) => {
    this.setState({items: this.allItems})
    // handle the new selectedItem here
  }
  getItems = value => {
   let searchResult = matchSorter(this.allItems, value, {
          keys: ['City'],
        });

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
  itemToString(i) {
    return i ? i.City : ''
  }
  render() {
    return (
      <Div
        css={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <h2>basic example</h2>
        <ExampleDownshift
          onStateChange={this.handleStateChange}
          onChange={this.handleChange}
          items={this.state.items}
          itemToString={this.itemToString}
          noMatches={this.state.noMatches}
        />
      </Div>
    )
  }
}

export default TestComp;
