webpackJsonp([518],{1507:function(module,exports){module.exports="import React from 'react';\nimport buttonDriverFactory from '../Backoffice/Button/Button.driver.js';\nimport dropdownLayoutDriverFactory from '../DropdownLayout/DropdownLayout.driver';\nimport ReactDOM from 'react-dom';\n\nconst ButtonWithOptionsDriverFactory = ({element, wrapper, component}) => {\n\n  const buttonWrapper = element.querySelector('[data-hook=buttonWithOptions-button-wrapper]');\n  const dropdownLayout = element.querySelector('[data-hook=buttonWithOptions-dropdownLayout]');\n  const buttonDriver = buttonDriverFactory({element: buttonWrapper.childNodes[0], wrapper: buttonWrapper});\n  const dropdownLayoutDriver = dropdownLayoutDriverFactory({element: dropdownLayout, wrapper});\n\n  const driver = {\n    exists: () => !!element,\n    outsideClick: () => document.body.dispatchEvent(new Event('click', {cancelable: true})),\n    setProps: props => {\n      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));\n      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);\n    }\n  };\n  return {driver, buttonDriver, dropdownLayoutDriver};\n};\n\nexport default ButtonWithOptionsDriverFactory;\n"}});