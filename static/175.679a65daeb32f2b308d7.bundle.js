webpackJsonp([175],{1850:function(module,exports){module.exports="import React from 'react';\nimport PropTypes from 'prop-types';\nimport classnames from 'classnames';\nimport styles from './styles.scss';\n\nconst LinkLayout = ({children, isDiminishedHover, isActive, disabled, ...rest}) =>\n  <span\n    className={classnames(styles.linkLayout, {\n      [styles.linkActive]: isActive,\n      [styles.linkDiminishedHover]: isDiminishedHover,\n      [styles.linkDisabled]: disabled\n    })}\n    data-hook=\"menu-navigation-link-wrapper\"\n    {...rest}\n    >\n    {children}\n  </span>;\n\nLinkLayout.propTypes = {\n  children: PropTypes.node,\n  isActive: PropTypes.bool,\n  isDiminishedHover: PropTypes.bool,\n  disabled: PropTypes.bool\n};\n\nexport default LinkLayout;\n"}});