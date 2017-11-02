webpackJsonp([428],{1597:function(module,exports){module.exports="import React from 'react';\nimport {children, optional, once} from '../Composite';\nimport Label from '../Label';\nimport GoogleAddressInput from '../GoogleAddressInput';\nimport InputAreaWithLabelComposite from '../Composite/InputAreaWithLabelComposite/InputAreaWithLabelComposite';\n\nconst GoogleAddressInputWithLabel = ({...props, children}) => (\n  <InputAreaWithLabelComposite {...props}>\n    {children}\n  </InputAreaWithLabelComposite>\n);\n\nGoogleAddressInputWithLabel.propTypes = {\n  children: children(optional(Label), once(GoogleAddressInput))\n};\n\nGoogleAddressInputWithLabel.displayName = 'GoogleAddressInputWithLabel';\n\nexport default GoogleAddressInputWithLabel;\n"}});