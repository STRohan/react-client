import React from 'react';
import style from './style.js'
const TextField = (props) => {
  const { err,...rest} = props;
  const error = (err) ? style.err : {};
  return (
    <>
    <input type = "text" {...rest} style={{ ...style.base, ...error }} />
    {(err) ? <p style={{...error}} > {err}</p>:'' }
</>
    );   }

    export default TextField;
