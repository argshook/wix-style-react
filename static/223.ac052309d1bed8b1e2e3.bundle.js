webpackJsonp([223],{1802:function(module,exports){module.exports="const radioGroupDriverFactory = component => ({\n  selectByIndex: index => component.$$(`div [data-hook=\"radio-label\"]`).get(index).click(),\n  isRadioChecked: index => component.$$(`div input`).get(index).isSelected(),\n  isRadioDisabled: index => !!component.$$(`div input`).get(index).getAttribute('disabled'),\n  element: () => component\n});\n\nexport default radioGroupDriverFactory;\n"}});