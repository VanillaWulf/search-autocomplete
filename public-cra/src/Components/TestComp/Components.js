import React from 'react';
import glamorous from 'glamorous';
import {css} from 'glamor';
//import glamor from 'glamor';

const Item = glamorous.div(
  {
    position: 'relative',
    cursor: 'pointer',
    display: 'block',
    border: 'none',
    textAlign: 'left',
    minHeight: 20,
    padding:'10px 10px',
    borderTop: 'none',
    font:'inherit',
    },
    ({isActive}) =>
        isActive
          ? {
              background: '#81b3d2'
            }
          : null,
);

const onAttention = '&:active, &:focus';
const Input = glamorous.input(
  {
    font: 'inherit',
    width: 280,
    height: 40,
    padding: '5px 17px 5px 10px',
    boxSizing: 'border-box',
    border: '1px solid #aaa',
    [onAttention]: {
      outline: '2px solid #81b3d2',
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
            outline: '1px solid #ff3850'
            })
          }
          }
          return styles
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
  width:320,
  maxHeight: 350,
  overflowY: 'auto',
  overflowX: 'hidden',
  boxShadow: '0px 2px 8px 0px rgba(122,121,122)',
  position: 'absolute',
  backgroundColor:'white',
  zIndex: '1'
})

const ControllerButton = glamorous.button({
  backgroundColor: 'transparent',
  tabindex: '0',
  border: 'none',
  position: 'absolute',
  right: 41,
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
  color:'#aaa',
  boxSizing:'border-box',
  padding: '5px 10px'
});

const ServerErrorBox  = glamorous.div({
  maxWidth:'320',
  font:'inherit',
  color:'#aaa',
  boxSizing:'border-box',
  padding: '5px 0px 0 10px'
});

const ServerErrorBoxButton = glamorous.button({
  font: 'inherit',
  background: 'none',
  border: 'none',
  width: '320',
  height: '35',
  textAlign: 'left',
  marginLeft: '-10',
  marginBottom: '0',
  ['&:hover']: {
    backgroundColor: '#81b3d2',
    cursor: 'pointer',
    color: '#ffffff'
  },
})

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
  right: 48,
  top: 12,
  content: '""',
  animation: `${spin} 0.8s linear infinite`,
})

const LoadBox = glamorous.div({
  font:'inherit',
  color:'#aaa',
  boxSizing:'border-box',
  padding: '5px 10px 5px 35px',

  ['&::before']:{
    borderTop: '1px solid #aaa',
    borderRadius: '50%',
    position: 'absolute',
    top: '8',
    left: '15',
    content: '""',
    width: '15',
    height: '15',
    animation: `${spin} 0.8s linear infinite`,
  }
});

const ValidationError = glamorous.div({
  font: 'inherit',
  width: 300,
  color: '#ff3850',
  position: 'absolute',
  top: 85,
  left: 5
})

function ArrowIcon({isOpen}) {
  return (
    <svg
      viewBox="0 0 18 18"
      preserveAspectRatio="none"
      width={16}
      stroke="#aaa"
      strokeWidth="1.1px"
      transform={isOpen ? 'rotate(180)' : null}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  )
}

export {SpinBox, Menu, ControllerButton, Input, Item, ArrowIcon, ErrorBox, LoadBox, ServerErrorBox, ServerErrorBoxButton, ValidationError, Label}
