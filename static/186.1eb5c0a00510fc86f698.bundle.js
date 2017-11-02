webpackJsonp([186],{1839:function(module,exports){module.exports="import React from 'react';\nimport PropTypes from 'prop-types';\nimport styles from './styles.scss';\n\nconst Logo = ({onClick, children}) =>\n  <button onClick={onClick} className={styles.logo} data-hook=\"menu-header\">\n    {children}\n  </button>;\n\nLogo.propTypes = {\n  onClick: PropTypes.func,\n  children: PropTypes.node\n};\n\nexport default Logo;\n\n"}});