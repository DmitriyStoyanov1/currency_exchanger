import React, { Component } from 'react';
import Select from 'react-select';
import './currencies.css';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry33ewewewewew' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'apple', label: 'Jam' },
    { value: 'milk', label: 'Capuccino' },
    { value: 'ice', label: 'Icecream' }
  ]

const Currency = () => {
  return (
    <React.Fragment>
      <Select options={options} />
    </React.Fragment>
  )
}

export default Currency;