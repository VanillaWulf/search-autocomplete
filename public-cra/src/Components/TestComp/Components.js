import React from 'react'
import glamorous from 'glamorous'

const Item = glamorous.div(
  {
    position: 'relative',
    cursor: 'pointer',
    display: 'block',
    border: 'none',
    textAlign: 'left',
    minHeight:'20px',
    padding:'10px 10px',
    borderTop: 'none',
    font:'inherit',
    },
  ({isActive, isSelected}) => {
    const styles = []
    if (isActive) {
      styles.push({
        color: 'rgba(0,0,0,.95)',
        background: '#81b3d2',
      })
    }

    return styles
  },
)
const onAttention = '&:active, &:focus'
const Input = glamorous.input(
  {
    width: '280px', // full width - icon width/2 - border
    height: '40px',
    padding: '5px 10px',
    boxSizing: 'border-box',
    border: '1px solid #aaa',
    transition: 'box-shadow .1s ease,width .1s ease',
    [onAttention]: {
      outline: '2px solid #81b3d2',
    },

    ['&:focus::placeholder']:{
      opacity: '0.6'
    }
  },
  ({isOpen}) =>
    isOpen
      ? {
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
          [onAttention]: {
            boxShadow: 'none',
          },
        }
      : null,
)



const Label = glamorous.label({
  fontWeight: 'bold',
  display: 'block',
  marginBottom: 10,
})

const Menu = glamorous.div({
  maxHeight: '350px',
  font:'inherit',
  overflowY: 'auto',
  overflowX: 'hidden',
  borderTopWidth: '0',
  outline: '0',
  borderRadius: '0 0 .28571429rem .28571429rem',
  transition: 'opacity .1s ease',
  boxShadow: '0px 2px 8px 0px rgba(122,121,122)',
  border: '1px solid #aaa',
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderLeftWidth: 1,
  borderStyle: 'solid',
  position: 'absolute',
  backgroundColor:'white'
})

const ControllerButton = glamorous.button({
  backgroundColor: 'transparent',
  border: 'none',
  position: 'absolute',
  right: 0,
  top: 0,
  cursor: 'pointer',
  width: 47,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',

})

const Error = glamorous.div({
  font:'inherit',
  color: '#aaa',
  padding: '.75rem 1.25rem',
  marginBottom: '1rem',
  border: '1px solid transparent',
  borderRadius: '.25rem',
  backgroundColor: '#f2dede',
  borderColor: '#ebcccc',
})


function ArrowIcon({isOpen}) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={16}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
      transform={isOpen ? 'rotate(180)' : null}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  )
}

export {Menu, ControllerButton, Input, Item, ArrowIcon, Error, Label}
