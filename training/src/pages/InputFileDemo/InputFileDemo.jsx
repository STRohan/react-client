import React, { Component } from 'react';
import * as yup from 'yup';
import TextField from '../../components/TextField/TextField';
import SelectField from '../../components/SelectField/SelectField';
import RadioGroup from '../../components/RadioGroup/RadioGroup';
import Button from '../../components/Button/Button';
import style from './style';
import { footballEntries, cricketEntries, sportSelect } from '../../configs/constants';

// eslint-disable-next-line no-unused-vars
let isExist = false;
const schema = yup.object().shape({
  name: yup.string().required().label('Name').min(3),
  sport: yup.string().required().label('Sport'),
  role: yup.string().required().label('What do you do '),
});

class InputFileDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      football: '',
      cricket: '',
      err: {},
      isTouch: {
        name: false,
        sport: false,
        role: false,
      },
      hasError: {
        name: false,
        sport: false,
        role: false,
      },
    };
  }

  errorHandler = (field) => {
    const {
      name,
      sport,
      football,
      cricket,
      hasError,
      err,
    } = this.state;
    const allErrors = { ...err };
    const role = football || cricket;
    schema.validate({ name, sport, role }, { abortEarly: false })
      .then(() => {
        hasError[field] = false;
        allErrors[field] = '';
        this.setState({ err: {}, hasError });
      })
      .catch((error) => {
        error.inner.forEach((element) => {
          if (element.path === field) {
            isExist = true;
            allErrors[field] = element.message;
            hasError[field] = true;
          }
        });
        this.setState({ err: allErrors, hasError });
      });
  }

  onBlurHandler = field => () => {
    this.errorHandler(field);
  }

  changeHandler = field => (event) => {
    const { isTouch } = this.state;
    this.setState({
      err: {},
      [field]: event.target.value,
      isTouch: { ...isTouch, [field]: true },
    });
  };

  hasError = () => {
    const { hasError, isTouch } = this.state;
    let check = 0;
    let touchCheck = 0;
    Object.keys(hasError).forEach((element) => {
      if (!hasError[element]) check += 1;
    });
    Object.keys(isTouch).forEach((element) => {
      if (isTouch[element]) touchCheck += 1;
    });
    return !(check === 3 && touchCheck === 3);
  }

  entryHandler = (event) => {
    const { sport, isTouch } = this.state;
    this.setState({
      [sport]: event.nativeEvent.target.value,
      cricket: (sport === 'cricket') ? event.nativeEvent.target.value : '',
      football: (sport === 'football') ? event.nativeEvent.target.value : '',
      isTouch: { ...isTouch, role: true },
    });
  };

  sportComponentDisplay =() => {
    const {
      sport, cricket, football, err,
    } = this.state;
    const sportVal = (sport === 'cricket') ? cricketEntries : footballEntries;
    const RadioVal = cricket || football;
    return (
      <div style={style.base}>
        <h3>What do you do?</h3>
        <RadioGroup value={RadioVal} err={err.role} options={sportVal} onBlur={this.onBlurHandler('role')} onChange={this.entryHandler} />
      </div>
    );
  }

  render() {
    const {
      name, sport, err,
    } = this.state;
    const sub = this.hasError();
    console.log('STATE::::::', this.state);
    return (
      <>
        <div>
          <h3>Name</h3>
          <TextField value={name} err={err.name} onChange={this.changeHandler('name')} onBlur={this.onBlurHandler('name')} />
        </div>
        <div>
          <h3>Select the game you want to play</h3>
          <SelectField value={sport} err={err.sport} options={sportSelect} onChange={this.changeHandler('sport')} onBlur={this.onBlurHandler('sport')} />
        </div>
        { (sport) && this.sportComponentDisplay() }
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button style={style.button} value="Cancel" />
          <Button disabled={sub} style={style.buttonEn} value="Submit" />
        </div>
      </>
    );
  }
}
export default InputFileDemo;
