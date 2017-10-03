import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';

import componentParser from '../AutoDocs/parser';

import {
  Wrapper,
  Options,
  Option,
  Preview,
  Code,
  Toggle,
  Input
} from '../Form';

export default class extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    component: PropTypes.node.isRequired,
    defaultProps: PropTypes.object
  }

  static defaultProps = {
    source: '',
    component: () => null,
    defaultProps: {}
  }

  constructor(props) {
    super(props);

    this.parsedComponent = componentParser(this.props.source);

    this.state = {
      propsState: {
        ...(this.props.component.defaultProps || {}),
        ...(this.props.defaultProps),
      },

      controllablePropTypes: this.parsedComponent.props,
      documentableMethods: this.parsedComponent.methods
    };
  }

  mapControllableProps = fn =>
    Object
      .keys(this.state.controllablePropTypes)
      .filter(key => ['string', 'bool'].includes(this.state.controllablePropTypes[key].type.name))
      .map((key, i) => fn(this.state.controllablePropTypes[key], key, i));

  setProp = (key, value) =>
    this.setState({propsState: {...this.state.propsState, [key]: value}});

  getPropControlComponent = type => {
    const types = {
      string: () => <Input/>,
      bool: () => <Toggle/>
    };

    return (types[type] || (() => null))();
  }

  componentToString = component =>
    reactElementToJSXString(component, {showDefaultProps: false, showFunctions: true})

  render() {
    const component = this.props.component;
    const componentPropsState = this.state.propsState;

    return (
      <Wrapper>
        <Options>
          { this.mapControllableProps((prop, key, i) =>
            <Option
              {...{
                key: i,
                label: key,
                value: componentPropsState[key],
                onChange: value => this.setProp(key, value),
                children: this.getPropControlComponent(prop.type.name)
              }}
              />
          ) }
        </Options>

        <Preview>
          {React.createElement(component, componentPropsState)}
        </Preview>

        <Code source={this.componentToString(React.createElement(component, componentPropsState))}/>
      </Wrapper>
    );
  }
}
