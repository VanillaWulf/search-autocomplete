//component with routing to serv

import React, {Component} from 'react'
import Autocomplete from 'react-autocomplete';
import { fakeCategorizedRequest } from '../../util/lib.js';
import customData from '../../testdata/kladr.json';

import Downshift from 'downshift';

import {render} from 'react-dom';
import glamorous, {Div} from 'glamorous';
import {css} from 'glamor';

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

function ExampleDownshift({itemToString, onBlurParse, items, error, isValidate, noMatches, isLoading, isServerError, message, value, refreshState, validationData,  ...rest}) {

  return (
    <Downshift
      itemToString={itemToString}
      refreshState={refreshState}
      onBlurParse={onBlurParse}
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
        <div className={css({
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: "14px",
          fontWeight: "300",
          color: "#404040",
          lineHeight: "20px",
          width: 320,
          zIndex:'2'
          })}>
          <Label {...getLabelProps()}>City</Label>
          <Div position="relative">
            <Input
              {...getInputProps({
                isOpen,
                placeholder: 'Введите или выберите из списка',
                isValidate,
                onBlur: event=>{
                onBlurParse(value);
                }
              })}
            />
            <ControllerButton {...getButtonProps()
            }>
                <ArrowIcon isOpen={isOpen} />
              </ControllerButton>
          </Div>
          {! isOpen ? null : (
            <Menu>
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
                    {noMatches
                      ? <error css={{marginTop: 20}}>
                          Не найдено
                        </error>
                      : null}
                      {isLoading
                        ? <div css={{marginTop: 20}}>
                            Загрузка
                          </div>
                        : null}
                        {isServerError
                          ? <div css={{marginTop: 20}}>
                              Ошибка сервера <button onClick={refreshState}>reload</button>
                            </div>
                        : null}
            </Menu>
          )}
          {!isValidate
            ? <div css={{marginTop: 20}}>
                Ошибка Blur
              </div>
          : null}
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
          value: '',
          isValidate: true,
          validationData: []
          };

  constructor(props){
    super(props);
    this.refreshState= this.refreshState.bind(this);
    this.onBlurParse = this.onBlurParse.bind(this);
  }

  // Will not fire in case of an item selection from the menu!

  handleStateChange = (changes, downshiftState) => {
    if (changes.hasOwnProperty('inputValue')) {
      this.loadItems(changes.inputValue);
      this.setState({
        value: changes.inputValue,
      })
      /*this.setState({
        items: this.getItems(changes.inputValue)})*/
    }
    // handle stuff here if you need to
    // this is especially useful if you need
    // to controll some of the internal state yourself
  }
  /*handleChange = (selectedItem, downshiftState) => {
    this.loadItems(this.state.value);
  /*  this.setState({
      items: this.getItems(value)})
    // handle the new selectedItem here*/
  //  }

  loadItems(value) {

  console.log('load');

  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
  return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  this.setState(()=>({
    isValidate: true
  }));

    // Cancel the previous request
    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }

    this.setState(() => ({
      noMatches: false
    }));

    // Fake request

    setTimeout(() => {
      console.log('start loading');
      if(!this.state.allItems){
        this.setState(() => ({
          items: null,
          isLoading: true,
          isServerError: false,
          }));
      };
    }, 500);

  setTimeout(() => {
      if(this.state.isLoading){
        console.log('render error');
        this.setState(() => ({
          isServerError: true,
          isLoading: false,
          items: null
        }));
        return;};
    }, 1000);

    let delay = Math.random() * (1300 - 800) + 800;
    console.log(delay);

    //fakerequest for testing download and error
    this.lastRequestId = setTimeout(() => {
      console.log('render matches');
      console.log(this.isServerError);
      if(!this.state.isServerError){
      console.log('set the state')
      this.setState({
        isLoading: false,
        items: kladr.filter(kladr => regex.test(kladr.City)),
        NoMatches: this.parseNoMatches(kladr.filter(kladr => regex.test(kladr.City)))
        });
      }
    }, delay);

  };

  parseNoMatches(value){
    if(value.length==0){
             this.setState(() => ({
              noMatches: true
            }));
             return true;
           } else {
              this.setState(() => ({
              noMatches: false,
              message: '',
              validationData: this.getKeyArray(value,"City")
             }));
              return false;
            }
  }

  onBlurParse(){
    if(this.state.validationData.indexOf(this.state.value)===-1){
      console.log('render the onBlur error');
      this.setState(()=>({
        isValidate: false
      }));
    }
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


  itemToString(i) {
    return i ? i.City : '';
  };

  refreshState(){
   console.log('Start refresh with ' + this.state.value);
   this.loadItems(this.state.value);
 };

  render() {
//    let {error}=this.state;
    return (
      <Div
        css={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ExampleDownshift
          onStateChange={this.handleStateChange}
          onChange={this.handleChange}
          items={this.state.items}
          itemToString={this.itemToString}
          noMatches={this.state.noMatches}
          error={this.state.error}
          isLoading={this.state.isLoading}
          message={this.state.message}
          value={this.state.value}
          isServerError={this.state.isServerError}
          refreshState={this.refreshState}
          defaultHighlightedIndex={0}
          isValidate={this.state.isValidate}
          validationData={this.state.validationData}
          onBlurParse={this.onBlurParse}
        />
      </Div>
    )
  }
}

export default TestComp;
