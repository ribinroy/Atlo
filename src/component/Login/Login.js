import './Login.scss';
import React, { useState, useContext } from 'react';
import { Button, Field, Form, Select } from 'react-form-package';
import AtloContext from '../../store/Context';
import { setAuthenticated } from './../../utilities';

export default function Login() {
    const contextData = useContext(AtloContext);
    function login(state) {
        const match = contextData.userArrayCalc.filter(
            (el) =>
                el.userType === 'Admin' &&
                el.username === state.data.username &&
                el.password === state.data.password
        );
        if (match.length > 0) {
            contextData.setCurrentUser(match[0]);
            setAuthenticated(match[0].username);
        } else alert('Access Denied');
    }

    return (
        <div className='flex--full-wrap'>
            <div className='form-styles login-wrap'>
                <Form validate>
                    <label className='field-wrap'>
                        <div className='field-title'>Username:</div>
                        <Field
                            className='input-area'
                            type='text'
                            id='username'
                            required
                        />
                    </label>
                    <label className='field-wrap'>
                        <div className='field-title'>Password:</div>
                        <Field
                            className='input-area'
                            type='password'
                            id='password'
                            required
                        />
                    </label>
                    <div>
                        <Button
                            id='submit'
                            type='submit'
                            onClick={(state) => login(state)}>
                            Login
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
