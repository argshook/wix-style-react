webpackJsonp([177],{1848:function(module,exports){module.exports="import React from 'react';\nimport {node} from 'prop-types';\nimport styles from './styles.scss';\n\nconst Category = ({children}) => (\n  <div className={styles.categoryLabel} data-hook=\"menu-navigation-category\">{children}</div>\n);\n\nCategory.propTypes = {\n  children: node\n};\n\nexport default Category;\n"}});