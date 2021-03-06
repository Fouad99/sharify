import React, { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';


import './Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLoginMode(prevMode => !prevMode);
    }

    const loginSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }

    return (
        <Card className="authentication">
            <h2>{isLoginMode ? 'LOGIN' : 'SIGN UP'}</h2>
            <hr />
            <form onSubmit={loginSubmitHandler}>
                {!isLoginMode && <Input element="input" id="name" type="text" validators={[VALIDATOR_REQUIRE()]} label="Name" errorText="Please provide a name" onInput={inputHandler} />}
                <Input
                    element="input"
                    id="email"
                    type="email"
                    label="Email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid Email address"
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    id="password"
                    type="password"
                    label="password"
                    validators={[VALIDATOR_MINLENGTH(8)]}
                    errorText="Please enter a valid Email address"
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'Login' : 'Sign up'}</Button>
            </form>
            <Button inverse onClick={switchModeHandler}>Switch to {isLoginMode ? 'Sign up' : 'Login'}</Button>
        </Card>
    )
};

export default Auth;