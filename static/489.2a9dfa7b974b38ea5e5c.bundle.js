webpackJsonp([489],{1536:function(module,exports){module.exports="import React from 'react';\nimport {object, bool, func} from 'prop-types';\n\nimport WixComponent from '../BaseComponents/WixComponent';\nimport Tabs from '../Tabs';\nimport ColorPickerConverterHex from './color-picker-converter-hex';\nimport ColorPickerConverterRgb from './color-picker-converter-rgb';\nimport ColorPickerConverterHsb from './color-picker-converter-hsb';\n\nconst HEX = 'HEX';\nconst RGB = 'RGB';\nconst HSB = 'HSB';\n\nconst tabs = [\n  {id: HEX, title: HEX},\n  {id: RGB, title: RGB},\n  {id: HSB, title: HSB}\n];\n\nexport default class ColorPickerConverter extends WixComponent {\n\n  static propTypes = {\n    current: object.isRequired,\n    showConverter: bool.isRequired,\n    showInput: bool.isRequired,\n    onChange: func.isRequired\n  }\n\n  state = {\n    activeTab: HEX\n  }\n\n  constructor(props) {\n    super(props);\n    this.changeTab = this.changeTab.bind(this);\n  }\n\n  render() {\n    const {current, showConverter, showInput} = this.props;\n\n    if (!showConverter && !showInput) {\n      return null;\n    }\n\n    if (!showConverter) {\n      return <ColorPickerConverterHex current={current} onChange={this.props.onChange}/>;\n    }\n\n    const {activeTab} = this.state;\n\n    return (\n      <div>\n        <Tabs items={tabs} activeId={activeTab} onClick={this.changeTab}/>\n        {activeTab === HEX && <ColorPickerConverterHex current={current} onChange={this.props.onChange}/>}\n        {activeTab === RGB && <ColorPickerConverterRgb current={current} onChange={this.props.onChange}/>}\n        {activeTab === HSB && <ColorPickerConverterHsb current={current} onChange={this.props.onChange}/>}\n      </div>\n    );\n  }\n\n  changeTab({id}) {\n    this.setState({activeTab: id});\n  }\n\n}\n"}});