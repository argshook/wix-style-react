import React, {Component, createElement} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';

export default class JSXToString extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  componentDidUpdate(props) {
    props.onChange(reactElementToJSXString(this.props.children, { showDefaultProps: false }));
  }

  componentDidMount() {
    this.props.onChange(reactElementToJSXString(this.props.children, { showDefaultProps: false }));
  }

  render() {
    return this.props.children;
  }
}
