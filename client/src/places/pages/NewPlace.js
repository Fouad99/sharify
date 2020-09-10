import React from 'react';

import './NewPlace.css'

import Input from '../../shared/components/FormElements/Input/Input';

const NewPlace = () => {
  return <div className="center">
    <form className="place-form">
      <Input element="input" type="text" label="Title" validators={[]} errorText="Please enter a valid title" />
    </form>
  </div>
};

export default NewPlace;
