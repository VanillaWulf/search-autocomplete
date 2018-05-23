//с фейкковой задержкой со скролом

import React from 'react'
import customData from '../../testdata/kladr.json';
import Downshift from 'downshift';
import {Div} from 'glamorous';
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
  ValidationError,
  SpinBox
} from './Components.js';

const kladr = customData;

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

function DownshiftMod({itemToString, onBlurParse, refreshState,
items,
isValidate, isChoosen,
noMatches, isLoading, isServerError, isRefreshing, loadIco,
message, value, validationData,
...rest}) {
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
        inputValue,
        highlightedIndex,
        closeMenu,
        openMenu
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
          <Label>Со скролом</Label>
          <Div position="relative">
          <Input
              {...getInputProps({
                isOpen,
                placeholder: 'Введите или выберите из списка',
                isValidate,
                isChoosen,
                onBlur: event=>{
                  // скидываем дефолтный парсинг по выделениям
                event.preventDefault();
                onBlurParse(value);
                if(!isRefreshing){
                    closeMenu()
                  }
                },
                onFocus: event=>{
                  openMenu()
                }
            })}
            />

            { loadIco ?
              <SpinBox></SpinBox>
              :
              <ControllerButton tabIndex="-1" {...getButtonProps()
              }>
                  <ArrowIcon isOpen={isOpen} />
                </ControllerButton>
              }
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
                              <ServerErrorBoxButton onMouseDown={refreshState}>Обновить</ ServerErrorBoxButton>
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

class AutocompleteScroll extends React.Component {
  //за старт берется нулевое значение
  allItems = null;
  state = {
          items: this.allItems,
          message: '',
          isLoading: false,
          noMatches: false,
          isServerError: false,
          value: '',
          isValidate: true,
          validationData: null,
          isChoosen: true,
          isRefreshing: false,
          loadIco: false,
          };

  constructor(props){
    super(props);
    this.refreshState= this.refreshState.bind(this);
    this.onBlurParse = this.onBlurParse.bind(this);
  };

  handleStateChange = (changes, downshiftState) => {
    if (changes.hasOwnProperty('inputValue')) {
      this.loadItems(changes.inputValue);
      this.setState({
        value: changes.inputValue,
        isRefreshing: false,
        })
  }
}

  loadItems(value) {

  console.log('load');

  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  };

  const regex = new RegExp('^' + escapedValue, 'i');

  this.setState(()=>({
    isValidate: true,
  }));

  if (this.lastRequestId !== null) {
    clearTimeout(this.lastRequestId);
  };

  this.setState(() => ({
    noMatches: false
  }));

  setTimeout(() => {
    console.log('start loading');
      if(!this.state.allItems){
        if(!this.state.validationData){
          this.setState(() => ({
            items: null,
            isLoading: true,
            isServerError: false,
            }));
          }else{
            this.setState(() => ({
              //items: null,
              loadIco: true,
              isServerError: false,
              }));
          }
      };
    }, 500);

  setTimeout(() => {
      if(this.state.isLoading || this.state.loadIco){
        console.log('render error');
        this.setState(() => ({
          isServerError: true,
          isLoading: false,
          items: null,
          loadIco:false,
        }));
        return;};
    }, 1000);


    let delay = Math.random() * (1300 - 500) + 500;
    console.log(delay);

    this.lastRequestId = setTimeout(() => {
      console.log('render matches');

      if(!this.state.isServerError){
      console.log('set the state');
      this.setState({
        isLoading: false,
        loadIco:false,
        items: kladr.filter(kladr => regex.test(kladr.City)),
        NoMatches: this.parseNoMatches(kladr.filter(kladr => regex.test(kladr.City)))
        });
      }
    }, delay);
  };

  parseNoMatches(value){
    if(value.length===0){
             this.setState(() => ({
              noMatches: true,
              isRefreshing: false,
              validationData: null
            }));
             return true;
           } else {
              this.setState(() => ({
              noMatches: false,
              message: '',
              isRefreshing: false,
              validationData: this.getKeyArray(value,"City")
             }));
              return false;
            }
  }

  onBlurParse(){

  if (this.state.isLoading || this.state.noMatches || this.state.isServerError || this.state.validationData===null) {
      console.log('not choosen');
        this.setState(() => ({
            isChoosen: false,
            isValidate: true,
        }));
    } else if(this.state.validationData.indexOf(this.state.value)===-1){
      console.log('chosen, not validate');
      console.log(this.state.validationData.indexOf(this.state.value));
      this.setState(()=>({
        isValidate: false,
        isChoosen: true,
      }));
    }else{
      this.setState(() => ({
          isValidate: true,
          isChoosen: true
      }));
    }
}

  getKeyArray(objectsArray, keyName){
      let resultArray=[];
      for(let i=0; i < objectsArray.length; i++){
        let newObject = objectsArray[i];
        for(let key in newObject){
          if(key === keyName){
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

   this.setState(()=>({
     isRefreshing: true,
   }));

   this.loadItems(this.state.value);

 };

  render() {

    return (
      <Div
        css={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          marginBottom: '45'
        }}
      >
      <DownshiftMod
          onStateChange={this.handleStateChange}
          onChange={this.handleChange}
          items={this.state.items}
          itemToString={this.itemToString}
          noMatches={this.state.noMatches}
          isLoading={this.state.isLoading}
          message={this.state.message}
          value={this.state.value}
          isServerError={this.state.isServerError}
          refreshState={this.refreshState}
          isValidate={this.state.isValidate}
          validationData={this.state.validationData}
          onBlurParse={this.onBlurParse}
          isChoosen={this.state.isChoosen}
          loadIco={this.state.loadIco}
          isRefreshing = {this.state.isRefreshing}
        />
      </Div>
    )
  }
}

export default AutocompleteScroll;
