webpackJsonp([200],{1825:function(module,exports){module.exports="import React from 'react';\nimport PropTypes from 'prop-types';\nimport WixComponent from '../../BaseComponents/WixComponent';\nimport Text from '../../Text';\n\nclass ExtraText extends WixComponent {\n  static propTypes = {\n    text: PropTypes.string.isRequired\n  };\n\n  render() {\n    return (\n      <Text appearance=\"T1.1\">{this.props.text}</Text>\n    );\n  }\n}\n\nexport default ExtraText;\n"}});