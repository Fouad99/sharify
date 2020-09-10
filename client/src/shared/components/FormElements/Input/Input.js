import React from 'react';

import './Input.css';

const Input = props => {
    const element = props.element === 'input' ? (<input id={props.id} type={props.type} placeholder={props.placeholder} />
    ) : (
            <textarea id={props.id} rows={props.row || 3} placeholder={props.placeholder} />);

    return (
        <div className={`form-control`}>
            <label style={{ textAlign: 'left' }} htmlFor={props.id}>{props.label}</label>
            {element}
        </div >
    );
}


export default Input;