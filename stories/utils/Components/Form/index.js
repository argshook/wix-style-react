import React from 'react';
import PropTypes from 'prop-types';

import {Container, Row, Col} from 'wix-style-react/Grid';
import Markdown from '../Markdown';
import {default as WixInput} from 'wix-style-react/Input';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';

import styles from './styles.scss';

const Wrapper = ({ children }) =>
  <Container>
    <Row>
      {children}
    </Row>
  </Container>;

const Options = ({ children }) =>
  <Col span={6}>
    {children}
  </Col>;

const Option = ({propName, value, children, onChange}) =>
  <Row className={styles.option}>
    <Col span={6}>
      <Markdown source={`\`${propName}\``}/>
    </Col>

    <Col span={6}>
      { React.cloneElement(children, {value, onChange}) }
    </Col>
  </Row>;

const Preview = ({ children }) =>
  <Col span={6} className={styles.preview}>
    {children}
  </Col>;

const Toggle = ({value, onChange}) =>
  <ToggleSwitch
    size="small"
    checked={value}
    onChange={({target: { checked }}) => onChange(checked)}
    />;

const Input = ({value, onChange}) =>
  <WixInput
    value={value}
    onChange={({target: { value }}) => onChange(value)}
    />;


export {
  Wrapper,
  Options,
  Option,
  Preview,
  Toggle,
  Input
};
