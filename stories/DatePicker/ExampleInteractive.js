import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import JSXToString from '../utils/Components/JSXToString';

import DatePicker from 'wix-style-react/DatePicker';
import {
  Wrapper,
  Options,
  Option,
  Preview,
  Toggle,
  Input
} from '../utils/Components/Form';

export default class ExampleDefault extends Component {
  static propTypes = {
    onChange: PropTypes.func
  }

  state = {
    datePickerProps: {
      ...DatePicker.defaultProps,
      onChange: value => this.setProp('value', value),
      dateFormat: 'YYYY/MM/DD',
      dataHook: 'storybook-datepicker',
      value: moment(moment.now())
    }
  }

  boolPropKeys = [
    'disabled',
    'error',
    'excludePastDates',
    'rtl',
    'readOnly',
    'shouldCloseOnSelect',
    'showYearDropdown',
    'showMonthDropdown'
  ]

  stringPropKeys = [
    'dataHook',
    'dateFormat',
    'inputDataHook',
    'placeholderText'
  ]

  setProp = (key, value) =>
    this.setState({datePickerProps: {...this.state.datePickerProps, [key]: value}});

  render() {
    const props = this.state.datePickerProps;

    return (
      <Wrapper>
        <Options>
          { this.boolPropKeys.map((key, i) =>
            <Option
              key={i}
              propName={key}
              value={props[key]}
              onChange={value => this.setProp(key, value)}
              >
              <Toggle />
            </Option>
          ) }

          { this.stringPropKeys.map((key, i) =>
            <Option
              key={i}
              propName={key}
              value={props[key]}
              onChange={value => this.setProp(key, value)}
              >
              <Input />
            </Option>
          ) }
        </Options>

        <Preview>
          <JSXToString onChange={this.props.onChange}>
            <DatePicker {...this.state.datePickerProps} />
          </JSXToString>
        </Preview>
      </Wrapper>
    );
  }
}
