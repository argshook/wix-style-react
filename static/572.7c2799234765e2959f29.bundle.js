webpackJsonp([572],{1453:function(module,exports){module.exports='const autoCompleteDriverFactory = component => ({\n  click: () => component.click(),\n  getInput: () => component.$(`input`),\n  getDropdown: () => component.$(`[data-hook="dropdown-layout-options"]`),\n  getDropdownItem: index => component.$$(`[data-hook="dropdown-layout-options"] div`).get(index).getText(),\n  getDropdownItemsCount: () => component.$$(`[data-hook="dropdown-layout-options"] div`).getText().count(),\n  element: () => component\n});\n\nexport default autoCompleteDriverFactory;\n'}});