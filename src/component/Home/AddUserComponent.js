import './Home.scss';
import React, { useState, useContext } from 'react';
import { addUser } from './../../api/add-user-api';
import PopUp from './../PopUp/PopUp';
import { Button, Field, Form, Select } from 'react-form-package';
import AtloContext from './../../store/Context';

// onClick={() => addUser()
export default function AddUserComponent() {
    const [showPopUp, setPopUp] = useState(false);
    const contextData = useContext(AtloContext);

    function saveThisUser(data) {
        if (!window.confirm('Please confirm')) return false;
        const userData = data.data;
        userData.timestamp = new Date().toISOString();

        userData.token = getToken();
        addUser(userData);
        setPopUp(false);
    }

    function getToken() {
        debugger;
        const randomToken = require('random-token');
        let token = randomToken(30);
        do {
            token = randomToken(30);
        } while (
            // eslint-disable-next-line no-loop-func
            contextData.userArrayCalc.filter((el) => {
                return el.token === token;
            }).length > 0
        );
        return token;
    }
    return (
        <div className='add-new form-styles'>
            <PopUp
                className='short-pop'
                onClose={() => setPopUp(false)}
                visible={showPopUp}>
                <h1>Add new user</h1>
                <Form validate>
                    <label className='field-wrap'>
                        <div className='field-title'>Name:</div>
                        <Field
                            className='input-area'
                            type='text'
                            id='name'
                            required
                        />
                    </label>
                    <label className='field-wrap'>
                        <div className='field-title'>Number:</div>
                        <Field
                            className='input-area'
                            type='tel'
                            id='number'
                            validate={(value) =>
                                /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
                                    value
                                ) &&
                                contextData.userArrayCalc.filter((el) => {
                                    return el.number === value;
                                }).length === 0
                            }
                            errorMessage={
                                'Please enter a valid phone number/phone number taken'
                            }
                            required
                        />
                    </label>
                    <label className='field-wrap'>
                        <div className='field-title'>Department:</div>
                        <Field
                            className='input-area'
                            type='text'
                            id='department'
                            required
                        />
                    </label>
                    <label className='field-wrap'>
                        <div className='field-title'>Designation:</div>
                        <Field
                            className='input-area'
                            type='text'
                            id='designation'
                            required
                        />
                    </label>
                    <label className='field-wrap'>
                        <div className='field-title'>Branch:</div>
                        <Select
                            className='input-area'
                            id='branch'
                            required
                            type='select'>
                            <option disabled value=''>
                                --- Choose an option ---
                            </option>
                            <option value='Cherthala'>Cherthala</option>
                            <option value='VKM'>VKM</option>
                            <option value='Poochackal'>Poochackal</option>
                            <option value='Alappuzha'>Alappuzha</option>
                        </Select>
                    </label>
                    <label className='field-wrap'>
                        <div className='field-title'>Email ID:</div>
                        <Field
                            className='input-area'
                            type='email'
                            id='email'
                            required
                        />
                    </label>
                    <label className='field-wrap'>
                        <div className='field-title'>Username:</div>
                        <Field
                            className='input-area'
                            type='text'
                            id='username'
                            required
                            validate={(value) =>
                                contextData.userArrayCalc.filter((el) => {
                                    return el.username === value;
                                }).length === 0
                            }
                            errorMessage={'Invalid/Username taken'}
                        />
                    </label>
                    <label className='field-wrap'>
                        <div className='field-title'>Password:</div>
                        <Field
                            className='input-area'
                            type='text'
                            id='password'
                            required
                        />
                    </label>
                    <label className='field-wrap'>
                        <div className='field-title'>User Type:</div>
                        <Select
                            className='input-area'
                            id='userType'
                            required
                            type='select'>
                            <option disabled value=''>
                                --- Choose an option ---
                            </option>
                            <option value='User'>User</option>
                            <option value='Admin'>Admin</option>
                        </Select>
                    </label>
                    <div>
                        <Button
                            id='submit'
                            type='submit'
                            onClick={(state) => saveThisUser(state)}>
                            Save
                        </Button>
                        <button
                            className='floar-left'
                            onClick={() => setPopUp(false)}>
                            Cancel
                        </button>
                    </div>
                </Form>
            </PopUp>
            <button onClick={() => setPopUp(true)}>Add new user</button>
        </div>
    );
}
