webpackJsonp([264],{1761:function(module,exports){module.exports="import React from 'react';\nimport PropTypes from 'prop-types';\nimport HeaderLayout from './HeaderLayout';\nimport FooterLayout from './FooterLayout';\nimport WixComponent from '../BaseComponents/WixComponent';\nimport classNames from 'classnames';\n\nimport styles from './MessageBoxFunctionalLayout.scss';\n\nclass MessageBoxFunctionalLayout extends WixComponent {\n\n  render() {\n    const {\n      title,\n      onCancel,\n      onOk,\n      onClose,\n      confirmText,\n      cancelText,\n      children,\n      buttonsHeight,\n      hideFooter,\n      theme,\n      closeButton,\n      disableConfirmation,\n      disableCancel,\n      width,\n      noBodyPadding\n    } = this.props;\n\n    return (\n      <div className={styles.content} style={{width}}>\n        <HeaderLayout title={title} onCancel={onClose ? onClose : onCancel} theme={theme} closeButton={closeButton}/>\n        <div className={classNames(styles.body, noBodyPadding ? styles.noPadding : styles.withPadding)} data-hook=\"message-box-body\">\n          {children}\n        </div>\n        {\n          !hideFooter ?\n            <FooterLayout enableCancel={!disableCancel} enableOk={!disableConfirmation} buttonsHeight={buttonsHeight} confirmText={confirmText} cancelText={cancelText} onCancel={onCancel} onOk={onOk} theme={theme}/> : null\n        }\n      </div>\n    );\n  }\n}\n\nMessageBoxFunctionalLayout.propTypes = {\n  hideFooter: PropTypes.bool,\n  confirmText: PropTypes.string,\n  cancelText: PropTypes.string,\n  theme: PropTypes.string,\n  onOk: PropTypes.func,\n  onCancel: PropTypes.func,\n  onClose: PropTypes.func,\n  width: PropTypes.string,\n  title: PropTypes.node,\n  children: PropTypes.any,\n  buttonsHeight: PropTypes.string,\n  closeButton: PropTypes.bool,\n  disableCancel: PropTypes.bool,\n  disableConfirmation: PropTypes.bool,\n  noBodyPadding: PropTypes.bool\n};\n\nMessageBoxFunctionalLayout.defaultProps = {\n  buttonsHeight: 'small',\n  disableCancel: false,\n  disableConfirmation: false,\n  width: '600px',\n  noBodyPadding: false\n};\n\nexport default MessageBoxFunctionalLayout;\n"}});