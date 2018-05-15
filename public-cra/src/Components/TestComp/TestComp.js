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
  ErrorBox,
  LoadBox,
  ServerErrorBox,
  ServerErrorBoxButton,
  ValidationError
} from './Components.js';

const kladr = customData;


function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

function ExampleDownshift({itemToString, onBlurParse, items, isValidate, isChoosen, noMatches, isLoading, isServerError, message, value, refreshState, validationData,  ...rest}) {

  return (
    <Downshift
      itemToString={itemToString}
      refreshState={refreshState}
      onBlurParse={onBlurParse}
      {...rest}
      render={({
        getInputProps,
        getButtonProps,
        getItemProps,
        isOpen,
        toggleMenu,
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
          <Label>Город</Label>
          <Div position="relative">
            <Input
              {...getInputProps({
                isOpen,
                placeholder: 'Введите или выберите из списка',
                isValidate,
                isChoosen,
                onBlur: event=>{
                  // по умолчанию при onBlur input-значение не сохраняется или встает последнее выбранное(isSelected)
                  // обнуляем дефолтное поведение
                  onBlurParse(value);
                },
                onOuterClick: event=>{
                  // по умолчанию при onBlur input-значение не сохраняется или встает последнее выбранное(isSelected)
                  // обнуляем дефолтное поведение
                  onBlurParse(value);
                  console.log('123');``
                },
              })}
            />
            <ControllerButton tabIndex="-1" {...getButtonProps()
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
                            })}
                        >
                          {itemToString(item)}
                        </Item>
                      )))
                    }
                    {noMatches
                      ? <ErrorBox>
                          Не найдено
                        </ErrorBox>
                      : null}
                      {isLoading
                        ? <LoadBox>
                            Загрузка
                          </LoadBox>
                        : null}
                        {isServerError
                          ? <ServerErrorBox>
                              Что-то пошло не так. Проверьте соединение с интернетом и попробуйте еще раз <br />
                              <ServerErrorBoxButton onClick={refreshState}>Обновить</ ServerErrorBoxButton>
                            </ServerErrorBox>
                        : null}
            </Menu>
          )}
          {!isValidate
            ? <ValidationError>
            Добавьте значение в справочник или выберите другое значение из списка
              </ValidationError>
          : null}
          {!isChoosen
            ? <ValidationError>
                Выберите значение из списка
              </ValidationError>
          : null}
        </div>
      )}
    />
  );
}

class TestComp extends React.Component {
  //за старт берется нулевое значение, в идеале нужно сделать постепенную загрузку кладра
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
          validationData: [],
          isChoosen: true
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
      console.log('set the state');
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
    //todo: не всегда корректно срабатывает на выход из фокуса при клике на свободную область, отлажано для tab

    if (this.state.isLoading || this.state.noMatches || this.state.isServerError) {
        this.setState(() => ({
            isChoosen: false,
            isValidate: true,
        }))
    } else if(this.state.validationData.indexOf(this.state.value)===-1){
      console.log('render the onBlur error');
      this.setState(()=>({
        isValidate: false,
        isChoosen: true
      }));
    }
  }

  getKeyArray(objectsArray, keyName){
      let resultArray=[];
      for(let i=0; i < objectsArray.length; i++){
        let newObject = objectsArray[i];
        for(let key in newObject){
          if(key == keyName){
            resultArray.push(newObject[key]);
          };
        };
      };
      return resultArray;
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
          position: 'relative',
          marginBottom: '45'
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
          isChoosen={this.state.isChoosen}
          resetInputOnSelection={false}
        />
      </Div>
    )
  }
}

export default TestComp;
