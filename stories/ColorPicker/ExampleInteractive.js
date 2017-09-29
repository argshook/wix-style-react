import React, {Component} from 'react';
import {func} from 'prop-types';

import JSXToString from '../utils/Components/JSXToString';

import ColorPicker from 'wix-style-react/ColorPicker';
import {
  Wrapper,
  Options,
  Option,
  Preview,
  Toggle,
  Input
} from '../utils/Components/Form';

export default class extends Component {
  static propTypes = {
    onChange: func
  }

  state = {
    colorPickerProps: {
      ...ColorPicker.defaultProps,
      value: '#2b8aa3'
    }
  }

  setProp = (key, value) =>
    this.setState({colorPickerProps: {...this.state.colorPickerProps, [key]: value}});

  boolPropKeys = [
    'showHistory',
    'showConverter',
    'showInput'
  ]

  stringPropKeys = [
    'value'
  ]

  render() {
    const props = this.state.colorPickerProps;

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
            <ColorPicker
              {...this.state.colorPickerProps}
              onChangeColor={value => this.setState({value: value.hex()})}
              />
          </JSXToString>
        </Preview>
      </Wrapper>
    );
  }
}
