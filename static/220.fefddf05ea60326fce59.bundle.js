webpackJsonp([220],{1805:function(module,exports){module.exports="import React from 'react';\nimport {children, optional, once} from '../Composite';\nimport Label from '../Label';\nimport Input from '../Input';\nimport RangeInputWithLabelComposite from '../Composite/RangeInputWithLabelComposite/RangeInputWithLabelComposite';\n\nconst Range = ({...props, children}) => (\n  <RangeInputWithLabelComposite {...props}>\n    {children}\n  </RangeInputWithLabelComposite>\n);\n\nRange.propTypes = {\n  children: children(optional(Label), once(Input), once(Input))\n};\n\nRange.displayName = 'Range';\n\nexport default Range;\n"}});