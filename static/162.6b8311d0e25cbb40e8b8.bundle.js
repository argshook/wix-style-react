webpackJsonp([162],{1863:function(module,exports){module.exports="const floatingTabItemDriverFactory = ({element}) => {\n\n  return {\n    exists: () => !!element,\n    isActive: () => element.getAttribute('class') === 'active',\n    content: () => element.textContent\n  };\n};\n\nexport default floatingTabItemDriverFactory;\n"}});