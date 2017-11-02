webpackJsonp([451],{1574:function(module,exports){module.exports="import React from 'react';\nimport ReactTestUtils from 'react-dom/test-utils';\nimport {createDriverFactory} from '../test-common';\nimport DropdownLayout from './DropdownLayout';\nimport dropdownLayoutDriverFactory from './DropdownLayout.driver';\nimport {dropdownLayoutTestkitFactory} from '../../testkit';\nimport {dropdownLayoutTestkitFactory as enzymeDropdownLayoutTestkitFactory} from '../../testkit/enzyme';\nimport {mount} from 'enzyme';\n\ndescribe('DropdownLayout', () => {\n\n  const createDriver = createDriverFactory(dropdownLayoutDriverFactory);\n  const options = [\n    {id: 0, value: 'Option 1'},\n    {id: 1, value: 'Option 2'},\n    {id: 2, value: 'Option 3', disabled: true},\n    {id: 3, value: 'Option 4'},\n    {id: 'divider1', value: '-'},\n    {id: 'element1', value: <span style={{color: 'brown'}}>Option 4</span>}\n  ];\n\n  it('should have be invisible and drop down by default', () => {\n    const driver = createDriver(<DropdownLayout options={options}/>);\n    expect(driver.isShown()).toBeFalsy();\n    expect(driver.isDown()).toBeTruthy();\n  });\n\n  it('should throw an error when trying to click on a non exists option', () => {\n    const driver = createDriver(<DropdownLayout visible options={options}/>);\n    expect(() => driver.clickAtOption(20)).toThrow();\n  });\n\n  it('should be visible and drop down', () => {\n    const driver = createDriver(<DropdownLayout visible options={options}/>);\n    expect(driver.isShown()).toBeTruthy();\n    expect(driver.isDown()).toBeTruthy();\n  });\n\n  it('should have a default tab index', () => {\n    const driver = createDriver(<DropdownLayout visible options={options}/>);\n    expect(driver.tabIndex()).toBe(0);\n  });\n\n  it('should have options', () => {\n    const driver = createDriver(<DropdownLayout visible options={options}/>);\n    expect(driver.optionsLength()).toBe(6);\n    expect(driver.optionContentAt(0)).toBe('Option 1');\n    expect(driver.isOptionADivider(4)).toBeTruthy();\n    expect(driver.optionByHook('dropdown-item-divider1').isDivider()).toBeTruthy();\n    expect(driver.optionContentAt(5)).toBe('Option 4');\n  });\n\n  it('should not hover any option by default', () => {\n    const driver = createDriver(<DropdownLayout visible options={options}/>);\n    expect(options.map((option, index) => driver.isOptionHovered(index))).not.toContain(true);\n  });\n\n  it('should hover when mouse enter and unhover when mouse leave', () => {\n    const driver = createDriver(<DropdownLayout visible options={options}/>);\n    driver.mouseEnterAtOption(0);\n    expect(driver.isOptionHovered(0)).toBeTruthy();\n    driver.mouseLeaveAtOption(0);\n    expect(driver.isOptionHovered(0)).toBeFalsy();\n  });\n\n  it('should hover when mouse enter and unhover when mouse leave by data hook', () => {\n    const driver = createDriver(<DropdownLayout visible options={options}/>);\n    const option = driver.optionByHook('dropdown-item-0');\n    option.mouseEnter();\n    expect(option.isHovered()).toBeTruthy();\n    option.mouseLeave();\n    expect(option.isHovered()).toBeFalsy();\n  });\n\n  it('should not hover divider or a disabled item when mouse enter', () => {\n    const driver = createDriver(<DropdownLayout visible options={options}/>);\n    driver.mouseEnterAtOption(2);\n    expect(driver.isOptionHovered(2)).toBeFalsy();\n    driver.mouseLeaveAtOption(4);\n    expect(driver.isOptionHovered(4)).toBeFalsy();\n  });\n\n  it('should have only one hovered option', () => {\n    const driver = createDriver(<DropdownLayout visible options={options}/>);\n    driver.mouseEnterAtOption(0);\n    expect(driver.isOptionHovered(0)).toBeTruthy();\n    driver.mouseEnterAtOption(1);\n    expect(driver.isOptionHovered(0)).toBeFalsy();\n    expect(driver.isOptionHovered(1)).toBeTruthy();\n  });\n\n  it('should hovered items cyclic and skipping divider or disabled items on down key', () => {\n    const driver = createDriver(<DropdownLayout visible options={options}/>);\n    driver.pressDownKey();\n    driver.pressDownKey();\n    expect(driver.isOptionHovered(1)).toBeTruthy();\n    driver.pressDownKey();\n    expect(driver.isOptionHovered(3)).toBeTruthy();\n    driver.pressDownKey();\n    expect(driver.isOptionHovered(5)).toBeTruthy();\n    driver.pressDownKey();\n    expect(driver.isOptionHovered(0)).toBeTruthy();\n  });\n\n  it('should hovered items cyclic and skipping divider or disabled on up key', () => {\n    const driver = createDriver(<DropdownLayout visible options={options}/>);\n    driver.pressUpKey();\n    expect(driver.isOptionHovered(5)).toBeTruthy();\n    driver.pressUpKey();\n    expect(driver.isOptionHovered(3)).toBeTruthy();\n    driver.pressUpKey();\n    expect(driver.isOptionHovered(1)).toBeTruthy();\n    driver.pressUpKey();\n    expect(driver.isOptionHovered(0)).toBeTruthy();\n  });\n\n  it('should call onClose when esc key is pressed', () => {\n    const onClose = jest.fn();\n    const driver = createDriver(<DropdownLayout visible options={options} onClose={onClose}/>);\n    driver.mouseEnterAtOption(0);\n    driver.pressEscKey();\n    expect(onClose).toBeCalled();\n  });\n\n  it('should call onSelect with false boolean when clicking on an unselected option', () => {\n    const onSelect = jest.fn();\n    const driver = createDriver(<DropdownLayout visible options={options} onSelect={onSelect}/>);\n    driver.clickAtOption(0);\n    expect(onSelect).toBeCalledWith(options[0], false);\n    driver.clickAtOption(5);\n    expect(onSelect).toBeCalledWith(options[5], false);\n  });\n\n  it('should not call onSelect when composing text via external means', () => {\n    const onSelect = jest.fn();\n    const driver = createDriver(<DropdownLayout visible options={options} onSelect={onSelect}/>);\n    driver.pressEnterKey();\n    expect(onSelect).not.toBeCalled();\n  });\n\n  it('should click an option by value', () => {\n    const onSelect = jest.fn();\n    const driver = createDriver(<DropdownLayout visible options={options} onSelect={onSelect}/>);\n    driver.clickAtOptionWithValue('Option 4');\n    expect(onSelect).toBeCalledWith(options[3], false);\n  });\n\n  it('should call onSelect with true value when clicking on a selected option', () => {\n    const onSelect = jest.fn();\n    const driver = createDriver(<DropdownLayout visible options={options} onSelect={onSelect} selectedId={0}/>);\n    driver.clickAtOption(0);\n    expect(onSelect).toBeCalledWith(options[0], true);\n  });\n\n  it('should call onSelect with false value when clicking on a selected option by hook', () => {\n    const onSelect = jest.fn();\n    const driver = createDriver(<DropdownLayout visible options={options} onSelect={onSelect} selectedId={0}/>);\n    driver.optionByHook('dropdown-item-3').click();\n    expect(onSelect).toBeCalledWith(options[3], false);\n  });\n\n  it('should call select when enter key is pressed', () => {\n    const onSelect = jest.fn();\n    const driver = createDriver(<DropdownLayout visible options={options} onSelect={onSelect}/>);\n    driver.pressDownKey();\n    driver.pressEnterKey();\n    expect(onSelect).toBeCalled();\n  });\n\n  it('should call select when tab key is pressed', () => {\n    const onSelect = jest.fn();\n    const driver = createDriver(<DropdownLayout visible options={options} onSelect={onSelect}/>);\n    driver.pressDownKey();\n    driver.pressTabKey();\n    expect(onSelect).toBeCalled();\n  });\n\n  it('should select the chosen value', () => {\n    const selectedId = 0;\n    const driver = createDriver(<DropdownLayout visible options={options} selectedId={selectedId}/>);\n    expect(driver.isOptionSelected(0)).toBeTruthy();\n    expect(driver.optionByHook('dropdown-item-0').isSelected()).toBeTruthy();\n  });\n\n  it('should remember the selected option when getting re-opened after got closed', () => {\n    const selectedId = 1;\n    const driver = createDriver(<DropdownLayout visible options={options} selectedId={selectedId}/>);\n    expect(driver.isOptionSelected(selectedId)).toBeTruthy();\n    driver.setProps({visible: false});\n    driver.setProps({visible: true});\n    expect(driver.isOptionSelected(selectedId)).toBeTruthy();\n  });\n\n  it('should hover when mouse enter and unhover when mouse leave when overrideStyle is true', () => {\n    const options = [\n      {id: 0, value: 'Option 1', overrideStyle: true}\n    ];\n\n    const driver = createDriver(<DropdownLayout visible options={options}/>);\n\n    driver.mouseEnterAtOption(0);\n    expect(driver.isOptionHoveredWithGlobalClassName(0)).toBeTruthy();\n    expect(driver.optionByHook('dropdown-item-0').isHoveredWithGlobalClassName()).toBeTruthy();\n    driver.mouseLeaveAtOption(0);\n    expect(driver.isOptionHoveredWithGlobalClassName(0)).toBeFalsy();\n    expect(driver.optionByHook('dropdown-item-0').isHoveredWithGlobalClassName()).toBeFalsy();\n  });\n\n  it('should select the chosen value when overrideStyle is true', () => {\n    const selectedId = 0;\n    const options = [\n      {id: 0, value: 'Option 1', overrideStyle: true}\n    ];\n    const driver = createDriver(<DropdownLayout visible options={options} selectedId={selectedId}/>);\n\n    expect(driver.isOptionSelectedWithGlobalClassName(0)).toBeTruthy();\n    expect(driver.optionByHook('dropdown-item-0').isSelectedWithGlobalClassName()).toBeTruthy();\n  });\n\n  it('should not contain pointer arrow without the withArrow property', () => {\n    const driver = createDriver(<DropdownLayout visible options={options}/>);\n    expect(driver.hasTopArrow()).toBeFalsy();\n  });\n\n  it('should contain pointer arrow when withArrow property is true', () => {\n    const driver = createDriver(<DropdownLayout visible withArrow options={options}/>);\n    expect(driver.hasTopArrow()).toBeTruthy();\n  });\n\n  it('should support mouse events', () => {\n    const onMouseEnter = jest.fn();\n    const onMouseLeave = jest.fn();\n    const driver = createDriver(\n      <DropdownLayout visible options={options} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>\n    );\n    driver.mouseEnter();\n    expect(onMouseEnter).toBeCalled();\n    expect(onMouseLeave).not.toBeCalled();\n\n    driver.mouseLeave();\n    expect(onMouseLeave).toBeCalled();\n  });\n\n  describe('itemHeight prop', () => {\n    it('should be small by default', () => {\n      const driver = createDriver(<DropdownLayout visible options={options}/>);\n      expect(driver.isOptionHeightSmall(0)).toBe(true);\n    });\n\n    it('should be small', () => {\n      const driver = createDriver(<DropdownLayout visible options={options} itemHeight=\"small\"/>);\n      expect(driver.isOptionHeightSmall(0)).toBe(true);\n    });\n\n    it('should be big', () => {\n      const driver = createDriver(<DropdownLayout visible options={options} itemHeight=\"big\"/>);\n      expect(driver.isOptionHeightBig(0)).toBe(true);\n    });\n  });\n\n  describe('options that are links', () => {\n    it('should not be link by default', () => {\n      const driver = createDriver(<DropdownLayout visible options={options}/>);\n      expect(driver.isLinkOption(0)).toBe(false);\n    });\n\n    it('should be a link option', () => {\n      const driver = createDriver(<DropdownLayout visible options={options.map(opt => ({...opt, linkTo: 'http://wix.com'}))}/>);\n      expect(driver.isLinkOption(0)).toBe(true);\n    });\n  });\n\n  describe('theme support', () => {\n    it('should allow setting a custom theme', () => {\n      const props = {dataHook: 'myDataHook', theme: 'material', options};\n      const wrapper = mount(<DropdownLayout {...props}/>);\n      const testkit = enzymeDropdownLayoutTestkitFactory({wrapper, dataHook: props.dataHook});\n      expect(testkit.hasTheme('material')).toBe(true);\n    });\n  });\n\n  describe('testkit', () => {\n    it('should exist', () => {\n      const div = document.createElement('div');\n      const dataHook = 'myDataHook';\n      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><DropdownLayout dataHook={dataHook} options={options}/></div>));\n      const dropdownLayoutTestkit = dropdownLayoutTestkitFactory({wrapper, dataHook});\n      expect(dropdownLayoutTestkit.exists()).toBeTruthy();\n      expect(dropdownLayoutTestkit.optionsLength()).toBe(6);\n    });\n  });\n\n  describe('enzyme testkit', () => {\n    it('should exist', () => {\n      const dataHook = 'myDataHook';\n      const wrapper = mount(<DropdownLayout dataHook={dataHook} options={options}/>);\n      const dropdownLayoutTestkit = enzymeDropdownLayoutTestkitFactory({wrapper, dataHook});\n      expect(dropdownLayoutTestkit.exists()).toBeTruthy();\n      expect(dropdownLayoutTestkit.optionsLength()).toBe(6);\n    });\n  });\n});\n"}});