/* eslint-disable no-bitwise */
import ReactSelect from 'react-select';
import React from 'react';
import { useTheme } from 'styled-components';
import chroma from "chroma-js";
import { getSuitableColor, setBackgroundColor } from 'lib/utils';

const getColor = (state, theme) => {
  if (state.isSelected) {
    return `${setBackgroundColor(theme.colorControls)}`;
  }
  if (state.isFocused) {
    return chroma(setBackgroundColor(theme.colorControls)).alpha(0.1).css();
  }
  return '';
}

const customStyles = (theme, overrideStyles) => ({
  menu: (provided) => ({
    ...provided
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? `${getSuitableColor(theme.colorControls)}` : 'black',
    backgroundColor: getColor(state, theme),
    ':active': {
      backgroundColor: theme.colorControls
    },
  }),
  control: (base, state) => {
    const borderRadius = (() => {
        switch (theme.typeAppCorner) {
          case 'boxy':
            return '0px !important';
          case 'light-round':
            return '2px';
          case 'default':
            return '6px'
          case 'rounded':
            return '26px';
          default:
            return '6px';
        }
    })();

    if (state.selectProps.invalid) {
      return {
        ...base,
        height: '50px',
        borderColor: '#dc3545',
        paddingRight: 'calc(1.5em + 0.75rem)',
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right calc(0.375em + 0.1875rem) center',
        backgroundSize: 'calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)',
        backgroundColor: '#f7f7f7',
        boxShadow: state.isFocused ? `0 0 7px 0 ${theme.colorControls} !important` : 0,
        borderRadius,
        ...overrideStyles,
      };
    }

    return {
      ...base,
      height: '50px',
      border: state.isFocused ? `2px solid ${theme.colorControls}` : base.border,
      boxShadow: state.isFocused ? `0 0 7px 0 ${theme.colorControls} !important` : 0,
      background: '#f7f7f7',
      borderRadius,
      '&:hover': {
        border: state.isFocused ? `2px solid ${theme.colorControls}` : base.border,
      },
      ...overrideStyles,
    };
  },
});

const Select = (p) => {
  const theme = useTheme();
  const { overrideStyles } = p;
  return <ReactSelect {...p} styles={customStyles(theme, overrideStyles)} />;
};

export default Select;
