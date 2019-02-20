import React, { Component } from 'react';
import TextField from '../../components/TextField/TextField';
import SelectField from '../../components/SelectField/SelectField';
import RadioGroup from '../../components/RadioGroup/RadioGroup';
import style from './style';
import { footballEntries, cricketEntries, sportSelect } from '../../configs/constants';

class InputFileDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      football: '',
      cricket: '',
    };
  }

  componentDidMount =() => {
  };

  componentWillUnmount = () => {
  }

  changeHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  sportHandler = (event) => {
    this.setState({ sport: event.target.value, cricket: '', football: '' });
  };

  entryHandler = (event) => {
    const { sport } = this.state;
    this.setState({
      cricket: (sport === 'cricket') ? event.nativeEvent.target.value : '',
      football: (sport === 'football') ? event.nativeEvent.target.value : '',
    });
  }

  render() {
    const {
      name, sport, cricket, football,
    } = this.state;
    const sportVal = (sport === 'cricket') ? cricketEntries : footballEntries;
    const RadioVal = cricket || football;
    console.log(this.state);
    return (
      <>
        <div>
          <h3>Name</h3>
          <TextField value={name} onChange={this.changeHandler} />
        </div>
        <div>
          <h3>Select the game you want to play</h3>
          <SelectField value={sport} options={sportSelect} onChange={this.sportHandler} />
        </div>
        { (sport.length) ? (
          <div style={style.base}>
            <RadioGroup value={RadioVal} options={sportVal} onChange={this.entryHandler} />
          </div>
        ) : '' }
      </>
    );
  }
}

export default InputFileDemo;
