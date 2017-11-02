webpackJsonp([453],{1572:function(module,exports){module.exports="import React from 'react';\nimport ReactTestUtils from 'react-dom/test-utils';\nimport ReactDOM from 'react-dom';\nimport styles from './DropdownLayout.scss';\nimport values from 'lodash/values';\nimport {isClassExists} from '../../test/utils';\n\nconst dropdownLayoutDriverFactory = ({element, wrapper, component}) => {\n\n  const contentContainer = element.childNodes[0];\n  const options = element.querySelector('[data-hook=dropdown-layout-options]');\n  const optionAt = position => (options.childNodes[position]);\n  const optionsLength = () => options.childNodes.length;\n  const doIfOptionExists = (position, onSuccess) => {\n    if (optionsLength() <= position) {\n      throw `index out of bounds, try to get option ${position} while only ${optionsLength()} options exists`;\n    }\n    return onSuccess();\n  };\n\n  return {\n    exists: () => !!element,\n    isShown: () => isClassExists(contentContainer, 'shown'),\n    isDown: () => isClassExists(contentContainer, 'down'),\n    isUp: () => isClassExists(contentContainer, 'up'),\n    hasTheme: theme => isClassExists(element, `theme-${theme}`),\n    tabIndex: () => element.tabIndex,\n    optionsLength: () => optionsLength(),\n    mouseEnterAtOption: position => doIfOptionExists(position, () => ReactTestUtils.Simulate.mouseEnter(optionAt(position))),\n    mouseLeaveAtOption: position => doIfOptionExists(position, () => ReactTestUtils.Simulate.mouseLeave(optionAt(position))),\n    mouseClickOutside: () => ReactTestUtils.Simulate.blur(contentContainer),\n    isOptionExists: optionText => [].filter.call(options.childNodes, opt => opt.textContent === optionText).length > 0,\n    isOptionHovered: position => doIfOptionExists(position, () => isClassExists(optionAt(position), 'hovered')),\n    isOptionSelected: position => doIfOptionExists(position, () => isClassExists(optionAt(position), 'selected')),\n    isOptionHoveredWithGlobalClassName: position => doIfOptionExists(position, () => isClassExists(optionAt(position), 'wixstylereactHovered')),\n    isOptionSelectedWithGlobalClassName: position => doIfOptionExists(position, () => isClassExists(optionAt(position), 'wixstylereactSelected')),\n    isOptionHeightSmall: position => doIfOptionExists(position, () => isClassExists(optionAt(position), 'smallHeight')),\n    isOptionHeightBig: position => doIfOptionExists(position, () => isClassExists(optionAt(position), 'bigHeight')),\n    isLinkOption: position => optionAt(position).tagName.toLowerCase() === 'a',\n    classes: () => options.className,\n    pressDownKey: () => ReactTestUtils.Simulate.keyDown(element, {key: 'ArrowDown'}),\n    pressUpKey: () => ReactTestUtils.Simulate.keyDown(element, {key: 'ArrowUp'}),\n    pressEnterKey: () => ReactTestUtils.Simulate.keyDown(element, {key: 'Enter'}),\n    pressTabKey: () => ReactTestUtils.Simulate.keyDown(element, {key: 'Tab'}),\n    pressEscKey: () => ReactTestUtils.Simulate.keyDown(element, {key: 'Escape'}),\n    optionContentAt: position => doIfOptionExists(position, () => optionAt(position).textContent),\n    optionAt,\n    clickAtOption: position => doIfOptionExists(position, () => ReactTestUtils.Simulate.click(optionAt(position))),\n    clickAtOptionWithValue: value => {\n      const option = values(options.childNodes).find(option => option.innerHTML === value);\n      option && ReactTestUtils.Simulate.click(option);\n    },\n    isOptionADivider: position => doIfOptionExists(position, () => isClassExists(optionAt(position), 'divider')),\n    mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(element),\n    mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(element),\n    setProps: props => {\n      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));\n      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);\n    },\n    hasTopArrow: () => !!element.querySelector(`.${styles.arrow}`),\n    optionById(optionId) {\n      return this.optionByHook(`dropdown-item-${optionId}`);\n    },\n    optionByHook: hook => {\n      const option = options.querySelector(`[data-hook=${hook}]`);\n      if (!option) {\n        throw `an option with data-hook ${hook} was not found`;\n      }\n      return {\n        element: () => option,\n        mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(option),\n        mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(option),\n        isHovered: () => isClassExists(option, 'hovered'),\n        isSelected: () => isClassExists(option, 'selected'),\n        isHoveredWithGlobalClassName: () => isClassExists(option, 'wixstylereactHovered'),\n        isSelectedWithGlobalClassName: () => isClassExists(option, 'wixstylereactSelected'),\n        content: () => option.textContent,\n        click: () => ReactTestUtils.Simulate.click(option),\n        isDivider: () => isClassExists(option, 'divider')\n      };\n    }\n  };\n};\n\nexport default dropdownLayoutDriverFactory;\n"}});