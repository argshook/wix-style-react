webpackJsonp([429],{1596:function(module,exports){module.exports="import inputAreaWithLabelCompositeDriverFactory from '../Composite/InputAreaWithLabelComposite/InputAreaWithLabelComposite.driver';\n\nconst GoogleAddressInputWithLabelDriverFactory = ({element, wrapper}) => {\n  const input = element.childNodes[1];\n\n  return {\n    ...inputAreaWithLabelCompositeDriverFactory({element, wrapper}),\n    getInput: () => input,\n    hasInput: () => input.childNodes[0].tagName.toLowerCase() === 'input'\n  };\n};\n\nexport default GoogleAddressInputWithLabelDriverFactory;\n"}});