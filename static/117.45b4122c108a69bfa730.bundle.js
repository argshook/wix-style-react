webpackJsonp([117],{1908:function(module,exports){module.exports="import React from 'react';\nimport PropTypes from 'prop-types';\nimport classnames from 'classnames';\nimport uniqueId from 'lodash/uniqueId';\nimport WixComponent from '../BaseComponents/WixComponent';\n\nimport styles from './ToggleSwitch.scss';\n\n/**\n  * Controlled switch\n  */\nclass ToggleSwitch extends WixComponent {\n  constructor(params) {\n    super(params);\n    this.id = uniqueId();\n  }\n\n  render() {\n    const {checked, onChange, size, disabled} = this.props;\n    const id = this.id;\n    const rootClassName = classnames(styles.toggleSwitch, {\n      [styles.toggleSwitchSmall]: size === 'small',\n      [styles.toggleSwitchXSmall]: size === 'x-small',\n      [styles.disabled]: disabled\n    });\n\n    const outerLabel = classnames(styles.outerLabel, {\n      [styles.disabled]: disabled\n    });\n\n    const innerLabel = classnames(styles.innerLabel, {\n      [styles.disabled]: disabled\n    });\n\n    const toggleActive = classnames(styles.toggleActive, {\n      [styles.disabled]: disabled\n    });\n\n    const toggleInactive = classnames(styles.toggleInactive, {\n      [styles.disabled]: disabled\n    });\n\n    return (\n      <div className={rootClassName}>\n        <input type=\"checkbox\" id={id} checked={checked} onChange={onChange}/>\n        <label htmlFor={id} className={outerLabel}>\n          <label htmlFor={id} className={innerLabel}>\n            <svg className={toggleActive} viewBox=\"0 0 41 32\">\n              <path d=\"M0.169 17.815c0.169 1.098 0.76 2.111 1.689 2.871l14.269 10.385c1.942 1.435 4.644 1.013 6.079-0.844l18.069-23.303c1.435-1.858 1.098-4.559-0.844-5.995s-4.644-1.098-6.164 0.844l-15.367 19.842-10.723-7.852c-1.942-1.435-4.644-1.013-6.164 0.844-0.76 0.929-1.013 2.111-0.844 3.208z\"/>\n            </svg>\n            <svg className={toggleInactive} viewBox=\"0 0 143 32\">\n              <path d=\"M0 0h142.545v32h-142.545v-32z\"/>\n            </svg>\n          </label>\n        </label>\n      </div>\n    );\n  }\n}\n\nToggleSwitch.displayName = 'ToggleSwitch';\n\nToggleSwitch.propTypes = {\n  checked: PropTypes.bool.isRequired,\n\n  /** Callback function when user changes the value of the component  */\n  onChange: PropTypes.func.isRequired,\n  disabled: PropTypes.bool,\n\n  /** Specifies toggle size  */\n  size: PropTypes.oneOf(['x-small', 'small', 'large'])\n};\n\nToggleSwitch.defaultProps = {\n  checked: false,\n  onChange: () => {},\n  disabled: false,\n  size: 'large'\n};\n\nexport default ToggleSwitch;\n"}});