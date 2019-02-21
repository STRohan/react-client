import React, { Component } from 'react';
import * as yup from 'yup';
import TextField from '../../components/TextField/TextField';
import SelectField from '../../components/SelectField/SelectField';
import RadioGroup from '../../components/RadioGroup/RadioGroup';
import Button from '../../components/Button/Button';
import style from './style';
import { footballEntries, cricketEntries, sportSelect } from '../../configs/constants';

const schema = yup.object().shape({
  name: yup.string().required().min(3).label('Name'),
  sport: yup.string().required().label('Sport'),
  // cricket: yup.string(),
  // football: yup.string(),
  // role: yup.string().required(),
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

    };
  }

  validation = async () => {
    const { err, ...rest } = this.state;
    const valid = await schema.validate(rest);
    console.log('vaild', valid);
    return valid;
  };

  changeHandler = (event) => {
    this.setState({ name: event.target.value, err: '' });
  };

  errorHandler = (field) => {
    const allerrors = {};
    const { name } = this.state;
    schema.validate({ name }, { abortEarly: false })
      .then(
        this.setState({ err: {} }),
      )
      .catch((error) => {
        error.inner.forEach((element) => {
          allerrors[field.path] = element.message;
        });
        this.setState({ err: allerrors });
        console.log('000', allerrors);
      });
  }

  onBlurHandler = field => (event) => {
    console.log('BLURRRRRRR', field, event.target.value);
    this.errorHandler(field);
    // schema.validate({ name: this.state.name }, { abortEarly: false })
    //   .then()
    //   .catch((ek) => {

    //     console.log(ek);
    //     this.setState({ err: ek.errors });
    //   });
  }

  sportHandler = (event) => {
    this.setState({ sport: event.target.value, cricket: '', football: '' });
  };


  entryHandler = (event) => {
    const { sport } = this.state;
    this.setState({
      cricket: (sport === 'cricket') ? event.nativeEvent.target.value : '',
      football: (sport === 'football') ? event.nativeEvent.target.value : '',
    });
  };

  render() {
    const {
      name, sport, cricket, football, err,
    } = this.state;
    const sportVal = (sport === 'cricket') ? cricketEntries : footballEntries;
    const RadioVal = cricket || football;
    console.log('STATE::::::', this.state);
    return (
      <>
        <div>
          <h3>Name</h3>
          <TextField value={name} err={err.name} onChange={this.changeHandler} onBlur={this.onBlurHandler('name')} />
        </div>
        <div>
          <h3>Select the game you want to play</h3>
          <SelectField value={sport} err={err.sport} options={sportSelect} onBlur={this.onBlurHandler('sport')} onChange={this.sportHandler} />
        </div>
        { (sport.length) ? (
          <div style={style.base}>
            <h3>What do you do?</h3>
            <RadioGroup value={RadioVal} options={sportVal} onChange={this.entryHandler} />
          </div>
        ) : '' }
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button style={style.button} value="Click" />
          <Button disabled style={style.button} value="Submit" />
        </div>
      </>
    );
  }
}
export default InputFileDemo;
