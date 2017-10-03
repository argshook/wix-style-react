import React from 'react';
import PropTypes from 'prop-types';

import Markdown from '../Markdown';
import CodeBlock from '../CodeBlock';

import {Container, Row, Col} from 'wix-style-react/Grid';
import {default as WixInput} from 'wix-style-react/Input';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';
import Text from 'wix-style-react/Text';

import styles from './styles.scss';

const Wrapper = ({children}) =>
  <Container>
    <Row className={styles.wrapper}>
      {children}
    </Row>
  </Container>;

Wrapper.propTypes = {
  children: PropTypes.element.isRequired
};


const Options = ({children}) =>
  <Col span={6}>
    <div className={styles.title}>
      <Text appearance="h2">Interactive Props</Text>
    </div>

    {children}
  </Col>;

Options.propTypes = {
  children: PropTypes.element.isRequired
};


const Option = ({label, value, children, onChange}) =>
  <Row className={styles.option}>
    <Col span={6}>
      <Markdown source={`\`${label}\``}/>
    </Col>

    <Col span={6}>
      { React.cloneElement(children, {value, onChange}) }
    </Col>
  </Row>;

Option.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  children: PropTypes.element.isRequired,
  onChange: PropTypes.func.isRequired
};


const Preview = ({children}) =>
  <Col span={6}>
    <div className={styles.title}>
      <Text appearance="h2">Preview</Text>
    </div>

    <div className={styles.preview}>
      {children}
    </div>
  </Col>;

Preview.propTypes = {
  children: PropTypes.element.isRequired
};


const Toggle = ({value, onChange}) =>
  <ToggleSwitch
    size="small"
    checked={value}
    onChange={({target: {checked}}) => onChange(checked)}
    />;

Toggle.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};


const Input = ({value, onChange}) =>
  <WixInput
    value={value}
    onChange={({target: {value}}) => onChange(value)}
    />;

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const Code = ({source}) =>
  <Col span={12}>
    <div className={styles.title}>
      <Text appearance="h2">Code</Text>
    </div>

    <CodeBlock source={source}/>
  </Col>;

Code.propTypes = {
  source: PropTypes.string.isRequired
};

export {
  Wrapper,
  Options,
  Option,
  Preview,
  Toggle,
  Input,
  Code
};
