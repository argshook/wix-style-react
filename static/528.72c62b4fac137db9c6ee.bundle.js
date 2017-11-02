webpackJsonp([528],{1497:function(module,exports){module.exports="import React from 'react';\nimport ReactTestUtils from 'react-dom/test-utils';\nimport {mount} from 'enzyme';\n\nimport {createDriverFactory} from '../test-common';\nimport {breadcrumbsTestkitFactory} from '../../testkit';\nimport {breadcrumbsTestkitFactory as enzymeBreadcrumbsTestkitFactory} from '../../testkit/enzyme';\nimport breadcrumbsDriverFactory from './Breadcrumbs.driver';\n\nimport Breadcrumbs from './Breadcrumbs';\n\ndescribe('Breadcrumbs', () => {\n  const createDriver = createDriverFactory(breadcrumbsDriverFactory);\n  const items = [\n    {id: 0, value: 'Option 1'},\n    {id: 1, value: 'Option 2'}\n  ];\n  let onClick;\n  let driver;\n\n  function createComponent(props) {\n    driver = createDriver(<Breadcrumbs {...props}/>);\n  }\n\n  beforeEach(() => {\n    onClick = jest.fn();\n  });\n\n  it('should have correct text on each breadcrumb', () => {\n    createComponent({onClick, items});\n    expect(driver.breadcrumbsLength()).toBe(items.length);\n    expect(driver.breadcrumbContentAt(0)).toBe(items[0].value);\n    expect(driver.breadcrumbContentAt(1)).toBe(items[1].value);\n  });\n\n  it('should call onClick callback on click with correct item', () => {\n    createComponent({onClick, items});\n    const itemIndex = 1;\n\n    driver.clickBreadcrumbAt(itemIndex);\n    expect(onClick).toBeCalledWith({id: items[itemIndex].id, value: 'Option 2'});\n  });\n\n  it('should get correct size from props', () => {\n    const size = 'large';\n    createComponent({onClick, items, size});\n    expect(driver.isLarge()).toBe(true);\n  });\n\n  it('should use medium size as default', () => {\n    createComponent({onClick, items});\n    expect(driver.isMedium()).toBe(true);\n  });\n\n  it('should get theme from props', () => {\n    const theme = 'onWhiteBackground';\n    createComponent({onClick, items, theme});\n    expect(driver.isOnWhiteBackground()).toBe(true);\n  });\n\n  it('should use default theme gray background', () => {\n    createComponent({onClick, items});\n    expect(driver.isOnGrayBackground()).toBe(true);\n  });\n\n  it('should get active id from props and have correct class', () => {\n    const itemIndex = 1;\n    createComponent({onClick, items, activeId: items[itemIndex].id});\n    expect(driver.getActiveItemId()).toBe(itemIndex);\n  });\n\n  it('should return null if not exists active id', () => {\n    createComponent({onClick, items});\n    expect(driver.getActiveItemId()).toBe(null);\n  });\n\n  describe('label appearance', () => {\n    const itemIndex = 0;\n    const activeItemIndex = 1;\n    const activeId = items[activeItemIndex].id;\n\n    describe('medium size', () => {\n      const size = 'medium';\n\n      it('should have t3.1 appearance when onWhiteBackground style and t3 for active', () => {\n        const theme = 'onWhiteBackground';\n        createComponent({onClick, items, theme, size, activeId});\n        expect(driver.getLabelClassList(itemIndex)).toContain('t3_1');\n        expect(driver.getLabelClassList(activeItemIndex)).toContain('t3');\n      });\n\n      it('should have t3.1 appearance when onGrayBackground style and t3 for active', () => {\n        const theme = 'onGrayBackground';\n        createComponent({onClick, items, theme, size, activeId});\n        expect(driver.getLabelClassList(itemIndex)).toContain('t3_1');\n        expect(driver.getLabelClassList(activeItemIndex)).toContain('t3');\n      });\n\n      it('should have t3.2 appearance when onDarkBackground style', () => {\n        const theme = 'onDarkBackground';\n        createComponent({onClick, items, theme, size, activeId});\n        expect(driver.getLabelClassList(itemIndex)).toContain('t3_2');\n      });\n    });\n\n    describe('large size', () => {\n      const size = 'large';\n\n      it('should have t1.1 appearance when onWhiteBackground style and t1 for active', () => {\n        const theme = 'onWhiteBackground';\n        createComponent({onClick, items, theme, size, activeId});\n        expect(driver.getLabelClassList(itemIndex)).toContain('t1_1');\n        expect(driver.getLabelClassList(activeItemIndex)).toContain('t1');\n      });\n\n      it('should have t1.1 appearance when onWhiteBackground style and t1 for active', () => {\n        const theme = 'onGrayBackground';\n        createComponent({onClick, items, theme, size, activeId});\n        expect(driver.getLabelClassList(itemIndex)).toContain('t1_1');\n        expect(driver.getLabelClassList(activeItemIndex)).toContain('t1');\n      });\n\n      it('should have t1.2 appearance when onDarkBackground style', () => {\n        const theme = 'onDarkBackground';\n        createComponent({onClick, items, theme, size, activeId});\n        expect(driver.getLabelClassList(itemIndex)).toContain('t1_2');\n      });\n    });\n  });\n\n  describe('item with link attribute', () => {\n    const linkItems = [\n      {id: 0, value: 'Option 1', link: '//www.wix.com'},\n      {id: 1, value: 'Option 2', link: '//www.facebook.com'}\n    ];\n\n    it('should not have links if link attribute is not given', () => {\n      createComponent({items});\n      expect(driver.isActiveLinkAt(0)).toBe(false);\n      expect(driver.isActiveLinkAt(1)).toBe(false);\n    });\n\n    it('should be a link if no activeId is given', () => {\n      createComponent({items: linkItems});\n      expect(driver.isActiveLinkAt(0)).toBe(true);\n      expect(driver.isActiveLinkAt(1)).toBe(true);\n    });\n\n    it('should not be a link if it is the item with activeId', () => {\n      createComponent({items: linkItems, activeId: 0});\n      expect(driver.isActiveLinkAt(0)).toBe(false);\n      expect(driver.isActiveLinkAt(1)).toBe(true);\n    });\n  });\n\n  describe('customElement attribute', () => {\n    const customItems = [\n      {id: 0, value: 'Option 1', customElement: <a href=\"//www.wix.com\">Option 1</a>},\n      {id: 1, value: 'Option 2', customElement: <a href=\"//www.facebook.com\">Option 2</a>}\n    ];\n\n    const customItemsWithLinks = [\n      {id: 0, value: 'value', customElement: <a href=\"//www.wix.com\">Custom value</a>, link: 'www.bla.com'}\n    ];\n\n    it('should render the customElement when given', () => {\n      createComponent({items: customItems});\n\n      expect(driver.breadcrumbsLength()).toBe(customItems.length);\n      expect(driver.breadcrumbContentAt(0)).toBe(customItems[0].value);\n      expect(driver.breadcrumbContentAt(1)).toBe(customItems[1].value);\n    });\n\n    it('should render the customElement even if link attribute is given', () => {\n\n      createComponent({items: customItemsWithLinks});\n\n      expect(driver.breadcrumbsLength()).toBe(customItemsWithLinks.length);\n      expect(driver.breadcrumbContentAt(0)).toBe('Custom value');\n    });\n\n    it('should render the value attribute of the item when this is the activeId', () => {\n      createComponent({items: customItemsWithLinks, activeId: 0});\n\n      expect(driver.breadcrumbContentAt(0)).toBe(customItemsWithLinks[0].value);\n    });\n  });\n\n  describe('testkit', () => {\n    it('should exist', () => {\n      const div = document.createElement('div');\n      const dataHook = 'myDataHook';\n      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Breadcrumbs onClick={onClick} items={items} dataHook={dataHook}/></div>));\n      const breadcrumbsTestkit = breadcrumbsTestkitFactory({wrapper, dataHook});\n      expect(breadcrumbsTestkit.exists()).toBeTruthy();\n    });\n  });\n\n  describe('enzyme testkit', () => {\n    it('should exist', () => {\n      const dataHook = 'myDataHook';\n      const wrapper = mount(<Breadcrumbs onClick={onClick} items={items} dataHook={dataHook}/>);\n      const breadcrumbsTestkit = enzymeBreadcrumbsTestkitFactory({wrapper, dataHook});\n      expect(breadcrumbsTestkit.exists()).toBeTruthy();\n    });\n  });\n});\n"}});