webpackJsonp([486],{1539:function(module,exports){module.exports="import React from 'react';\nimport {func, object} from 'prop-types';\nimport color from 'color';\nimport clamp from 'lodash/clamp';\n\nimport WixComponent from '../BaseComponents/WixComponent';\nimport {getBoundingRect} from './utils';\n\nimport css from './color-picker-hue.scss';\n\nexport default class ColorPickerHue extends WixComponent {\n\n  static propTypes = {\n    current: object.isRequired,\n    onChange: func.isRequired\n  }\n\n  onMarkerDragStart = e => {\n    e.preventDefault();\n    window.addEventListener('mousemove', this.onMarkerDrag);\n    window.addEventListener('mouseup', this.onMarkerDragEnd);\n    this.sliderRect = getBoundingRect(this.slider);\n    this.setNewColorByMouseEvent(e);\n  }\n\n  onMarkerDrag = e => {\n    this.setNewColorByMouseEvent(e);\n  }\n\n  onMarkerDragEnd = () => {\n    window.removeEventListener('mousemove', this.onMarkerDrag);\n    window.removeEventListener('mouseup', this.onMarkerDragEnd);\n  }\n\n  getHueByMouseEvent = e => {\n    const x = e.clientX - this.sliderRect.left;\n    return clamp(360 * x / this.sliderRect.width, 0, 359);\n  }\n\n  setNewColorByMouseEvent = e => {\n    const {onChange, current} = this.props;\n    const h = this.getHueByMouseEvent(e);\n    onChange(color({h, s: current.saturationv(), v: current.value()}));\n  }\n\n  componentWillUnmount() {\n    this.onMarkerDragEnd();\n  }\n\n  render() {\n    // HUE is an intenger value from 0 to 360.\n    const percentage = (this.props.current.hue() / 360) * 100;\n    return (\n      <div className={css.root} ref={e => this.slider = e} onMouseDown={this.onMarkerDragStart}>\n        <div className={css.handle} style={{left: `${percentage}%`}}/>\n      </div>\n    );\n  }\n\n}\n"}});