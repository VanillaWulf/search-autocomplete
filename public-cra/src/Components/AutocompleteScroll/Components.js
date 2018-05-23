import React from 'react';
import glamorous from 'glamorous';
import {css} from 'glamor';

const Item = glamorous.div(
  {
    position: 'relative',
    cursor: 'pointer',
    display: 'block',
    border: 'none',
    textAlign: 'left',
    minHeight: 20,
    padding:'3px 5px 2px',
    borderTop: 'none',
    font:'inherit',
    fontSize: 12.5,
    },
    ({isActive}) =>
        isActive
          ? {
              background: '#5199db',
              color:'#fff'
            }
          : null,
);

const onAttention = '&:active, &:focus';
const Input = glamorous.input(
  {
    font: 'inherit',
    width: 252,
    height: 31,
    fontSize: 12.5,
    padding: '6px 27px 5px 6px',
    boxSizing: 'border-box',
    boxShadow: 'inset 0px 1px 1px #404040;',
    border: '1px solid #aaa',
    [onAttention]: {
      boxShadow:'none',
      border: '2px solid #5199db',
      padding: '5px 26px 4px 5px',
      outline:'0',
      outlineOffset: '0'
    },
    ['&::placeholder']:{
      color: '#b7b7b7'
    },
    ['&:focus::placeholder']:{
      opacity: '0.6'
    }
  },
    ({isValidate, isChoosen, isOpen}) => {
          const styles = []
          if (!isOpen) {
            if(!isValidate || !isChoosen){
              styles.push({
                boxShadow:'none',
                border: '2px solid #da0c09',
                padding: '5px 26px 4px 5px'
              })
            }
          }
          return styles;
        }
  );

const Label = glamorous.label({
  font: 'inherit',
  fontSize: 20,
  display: 'block',
  marginBottom: 20
});

const Menu = glamorous.div({
  font: 'inherit',
  width:287,
  maxHeight: 200,
  overflowY: 'auto',
  overflowX: 'hidden',
  boxShadow: '0px 2px 8px 0px rgba(122,121,122)',
  position: 'absolute',
  backgroundColor:'white',
  zIndex: '1',
  top: 73,
  left:2
});

const ControllerButton = glamorous.button({
  backgroundColor: 'transparent',
  border: 'none',
  position: 'absolute',
  right: 65,
  top: 0,
  cursor: 'pointer',
  width: 30,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center'
});

const ErrorBox = glamorous.div({
  maxWidth:'320',
  font:'inherit',
  fontSize: 12.5,
  color:'#aaa',
  boxSizing:'border-box',
  padding: '5px 5px'
});

const ServerErrorBox  = glamorous.div({
  maxWidth:'320',
  font:'inherit',
  lineHeight: '18px',
  fontSize: 12.5,
  color:'#aaa',
  boxSizing:'border-box',
  padding: '6px 0px 0 5px'
});

const ServerErrorBoxButton = glamorous.button({
  font: 'inherit',
  fontSize: 12.5,
  border: 'none',
  width: '287',
  height: '25',
  textAlign: 'left',
  marginLeft: '-5px',
  marginBottom: '0',
  marginTop:'6px',
  paddingLeft:'5px',
  background:'none',
  ['&:hover']: {
    backgroundColor: '#5199db',
    cursor: 'pointer',
    color: '#ffffff'
  },
});

const spin = css.keyframes({
  '0%': { transform: `rotate(0deg)` },
  '100%': { transform: `rotate(360deg)` }
});

const SpinBox=glamorous.div({
  width: 15,
  height: 15,
  borderTop: '1px solid #aaa',
  borderRadius: '50%',
  position: 'absolute',
  right: 72,
  top: 8,
  content: '""',
  animation: `${spin} 0.8s linear infinite`,
});

const LoadBox = glamorous.div({
  font:'inherit',
  fontSize: 12.5,
  color:'#aaa',
  boxSizing:'border-box',
  padding: '6px 10px 6px 28px',

  ['&::before']:{
    borderTop: '1px solid #aaa',
    borderRadius: '50%',
    position: 'absolute',
    top: '8',
    left: '10',
    content: '""',
    width: '13',
    height: '13',
    animation: `${spin} 0.8s linear infinite`,
  }
});

const ValidationError = glamorous.div({
  font: 'inherit',
  fontSize: 12.5,
  width: 250,
  color: '#da0c09',
  position: 'absolute',
  top: 75,
  left: 3
});

function ArrowIcon({isOpen}) {
  return (
    <svg
      viewBox="0 0 18 18"
      preserveAspectRatio="none"
      width={8}
      stroke="#b7b7b7"
      strokeWidth="1.1px"
      //transform={isOpen ? 'rotate(180)' : null}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  )
};

export {
  Label, Menu, Input, Item, ArrowIcon,
  ControllerButton, ServerErrorBoxButton,
  ErrorBox, LoadBox, ServerErrorBox, SpinBox,
  ValidationError
}
