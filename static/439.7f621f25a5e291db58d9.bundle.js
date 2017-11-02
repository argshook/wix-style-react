webpackJsonp([439],{1586:function(module,exports){module.exports="import React from 'react';\nimport {bool, node} from 'prop-types';\nimport styles from './FieldLabelAttributes.scss';\nimport WixComponent from '../BaseComponents/WixComponent';\nimport Tooltip from '../Tooltip';\nimport Info2 from '../Icons/dist/components/Info2';\n\nclass FieldLabelAttributes extends WixComponent {\n\n  render() {\n    const requiredAstrix = <span data-hook=\"required\" className={styles.required}/>;\n    const infoTooltip = (\n      <Tooltip\n        appendToParent={this.props.appendToParent}\n        content={this.props.info}\n        theme=\"light\"\n        alignment=\"center\"\n        moveBy={{x: 0, y: -1}}\n        hideDelay={0}\n        >\n        <span data-hook=\"info\" className={styles.icon}>\n          <Info2 size=\"18px\"/>\n        </span>\n      </Tooltip>\n    );\n\n    return (\n      <div className={styles.root} data-hook=\"field-label-attributes\">\n        { this.props.required ? requiredAstrix : null }\n        { this.props.info ? infoTooltip : null }\n      </div>\n    );\n  }\n}\n\nFieldLabelAttributes.defaultProps = {\n  required: false,\n  info: '',\n  appendToParent: true\n};\n\nFieldLabelAttributes.propTypes = {\n  required: bool,\n  info: node,\n  appendToParent: bool\n};\n\nexport default FieldLabelAttributes;\n"}});