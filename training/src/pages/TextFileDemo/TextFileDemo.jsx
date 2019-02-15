import {default as TextField} from '../../components/TextField/TextField'
import React from 'react';

const TextFileDemo = () => (
    <>
    <h3>This is Disabled Input</h3>
    <TextField disabled value="Disabled Input" />
    <h3>A Valid Input</h3>
    <TextField value = "Accessible"/>
    <h3>An Input with errors</h3>
    <TextField value="101" err="Could not be greater than"/>
    </>
    );

    export default TextFileDemo;
