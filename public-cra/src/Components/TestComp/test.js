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
  Error
} from './Components.js';

const kladr = customData;


function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

function ExampleDownshift({itemToString, items, error, noMatches, isLoading, isServerError, message, ...rest}) {

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
      }) => (
        <div className={css({width: 250, margin: 'auto'})}>
          <Label {...getLabelProps()}>City</Label>
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
                aria-lab10el="clear selection"
              >
                <XIcon />
              </ControllerButton>
            ) : (
              <ControllerButton {...getButtonProps()}>
                <ArrowIcon isOpen={isOpen} />
              </ControllerButton>
            )}
          </Div>
          {! isOpen ? null : (
            <Menu>
              {noMatches
                ? <div css={{marginTop: 20}}>
                    No matches
                  </div>
                : null}
                {isLoading
                  ? <div css={{marginTop: 20}}>
                      Loading
                    </div>
                  : null}
                  {isServerError
                    ? <div css={{marginTop: 20}}>
                        error <button>reload</button>
                      </div>
                    : null}
                    {! items ? null : ( items.map((item, index) => (
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
                      )))
                    }
            </Menu>
          )}
        </div>
      )}
    />
  );
}

class TestComp extends React.Component {
  allItems = null;
  state = {
          items: this.allItems,
          error: false,
          message: '',
          isLoading: false,
          noMatches: false,
          isServerError: false,
          };
  handleStateChange = (changes, downshiftState) => {
    if (changes.hasOwnProperty('inputValue')) {
      this.setState({
        items: this.getItems(changes.inputValue)});
    }
    // handle stuff here if you need to
    // this is especially useful if you need
    // to controll some of the internal state yourself
  }
  handleChange = (selectedItem, downshiftState) => {
    this.setState({
      items: this.allItems})
    // handle the new selectedItem here
  }

  loadItems(value) {

  console.log('load');

  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
  return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');


    // Cancel the previous request
    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }

    this.setState(() => ({
      allItems: null
    }));

    // Fake request

    setTimeout(() => {
      console.log('start loading');
      if(!this.state.allItems){
        this.setState(() => ({
          isLoading: true,
          isServerError: false,
        }));
      };
    }, 300);

  /*  setTimeout(() => {
      if(this.state.isLoading){
        this.setState(() => ({
          isServerError: true,
        }));
        return null;
      };
    }, 1000);*/

    let delay = Math.random() * (1300 - 800) + 800;
    console.log(delay);

    //fakerequest for testing download and error
    this.lastRequestId = setTimeout(() => {
      this.setState({
        isLoading: false,
        });
        console.log('kladr request '+kladr.filter(kladr => regex.test(kladr.City)));
        return kladr.filter(kladr => regex.test(kladr.City));
    }, delay);
  };

  parseItems(value){

    console.log('searchResult '+searchResult);

    let searchResult = this.loadItems(value);

     if(searchResult===null){
             this.setState(() => ({
              noSuggestions: true,
              noMatches: true
            }));
             return null;
           } else {
              this.setState(() => ({
              noSuggestions: false,
              noMatches: false,
              message: ''
             }));
              return searchResult;
            }
      this.setState({
        items: searchResult
      })
  }

  async getItems(value){
    await this.loadItems(value);
    await this.parseItems(value);

  }
  itemToString(i) {
    return i ? i.City : ''
  }
  render() {
//    let {error}=this.state;
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
          error={this.state.error}
          noMatches={this.state.noMatches}
          isLoading={this.state.isLoading}
          message={this.state.message}
        />
      </Div>
    )
  }
}

export default TestComp;
