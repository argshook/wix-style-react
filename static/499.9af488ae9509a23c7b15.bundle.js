webpackJsonp([499],{1526:function(module,exports){module.exports="import React from 'react';\nimport ReactDOM from 'react-dom';\nimport ReactTestUtils from 'react-dom/test-utils';\nimport $ from 'jquery';\nimport {isClassExists} from '../../test/utils';\n\nconst checkboxDriverFactory = ({element, wrapper, component}) => {\n\n  const checkbox = $(element).find('input')[0];\n\n  return {\n    exists: () => !!element,\n    click: () => ReactTestUtils.Simulate.change(checkbox),\n    isChecked: () => isClassExists(element, 'checked'),\n    isDisabled: () => isClassExists(element, 'disabled'),\n    isIndeterminate: () => $(element).find('.indeterminate').length === 1,\n    hasError: () => isClassExists(element, 'hasError'),\n    getLabel: () => element.textContent,\n    setProps: props => {\n      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));\n      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);\n    }\n  };\n};\n\nexport default checkboxDriverFactory;\n"}});