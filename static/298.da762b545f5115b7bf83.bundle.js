webpackJsonp([298],{1727:function(module,exports){module.exports="import {componentFactory, tickerDriverFactory} from './testkit/Ticker';\nimport {spy} from 'sinon';\n\ndescribe('<Ticker/>', () => {\n\n  const createDriver = props => tickerDriverFactory(componentFactory(props));\n\n  it('should create a ticker', () => {\n    const driver = createDriver({});\n    expect(driver.exists()).toEqual(true);\n  });\n\n  it('should allow handling up action', () => {\n    const onUp = spy();\n    const driver = createDriver({onUp});\n    driver.clickUp();\n    expect(onUp.calledOnce).toEqual(true);\n  });\n\n  it('should allow handling down action', () => {\n    const onDown = spy();\n    const driver = createDriver({onDown});\n    driver.clickDown();\n    expect(onDown.calledOnce).toEqual(true);\n  });\n\n  it('should allow disabling up action', () => {\n    const onUp = spy();\n    const driver = createDriver({onUp, upDisabled: true});\n\n    expect(driver.isUpDisabled()).toEqual(true);\n\n    driver.clickUp();\n    expect(onUp.calledOnce).toEqual(false);\n  });\n\n  it('should allow disabling down action', () => {\n    const onDown = spy();\n    const driver = createDriver({onDown, downDisabled: true});\n\n    expect(driver.isDownDisabled()).toEqual(true);\n\n    driver.clickUp();\n    expect(onDown.calledOnce).toEqual(false);\n  });\n\n});\n"}});