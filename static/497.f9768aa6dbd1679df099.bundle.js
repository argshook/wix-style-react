webpackJsonp([497],{1528:function(module,exports){module.exports="import React from 'react';\nimport {node, bool, func, oneOf, string} from 'prop-types';\nimport uniqueId from 'lodash/uniqueId';\nimport classNames from 'classnames';\n\nimport styles from './Checkbox.scss';\nimport SvgV from '../svg/V';\nimport WixComponent from '../BaseComponents/WixComponent';\nimport Label from '../Label/Label';\n\n/** a simple WixStyle checkbox */\nclass Checkbox extends WixComponent {\n  static displayName = 'Checkbox';\n\n  static propTypes = {\n    /** used for automatic testing */\n    active: bool,\n    checked: bool,\n    children: node,\n    disabled: bool,\n    hasError: bool,\n    id: string,\n    indeterminate: bool,\n\n    /** used for automatic testing */\n    hover: bool,\n    size: oneOf(['medium', 'large']),\n    onChange: func\n  };\n\n  static defaultProps = {\n    checked: false,\n    size: 'medium',\n    onChange: e => {\n      e.stopPropagation();\n    }\n  };\n\n  render() {\n    const {id = uniqueId(), checked, indeterminate, disabled, hasError, hover, active, size, onChange} = this.props;\n\n    const classname = classNames(\n      styles.wrapper,\n      {\n        [styles.checked]: checked,\n        [styles.unchecked]: !checked,\n        [styles.hover]: hover,\n        [styles.active]: active,\n        [styles.disabled]: disabled,\n        [styles.hasError]: hasError\n      }\n    );\n\n    const checkedSymbol = indeterminate ? <div className={styles.indeterminate}/> : <SvgV/>;\n\n    return (\n      <div className={classname}>\n        <input\n          type=\"checkbox\"\n          id={id}\n          checked={checked}\n          disabled={disabled}\n          onChange={disabled ? null : onChange}\n          />\n\n        <Label for={id} appearance=\"T1.1\">\n          <div className={classNames(styles.checkbox, styles[size])}>\n            <div className={styles.inner}>\n              {checkedSymbol}\n            </div>\n          </div>\n\n          <div className={styles.children}>\n            {this.props.children}\n          </div>\n        </Label>\n      </div>\n    );\n  }\n}\n\nexport default Checkbox;\n"}});