webpackJsonp([288],{1737:function(module,exports){module.exports="import React from 'react';\nimport PropTypes from 'prop-types';\nimport WixComponent from '../BaseComponents/WixComponent';\nimport Input from '../Input';\nimport omit from 'omit';\nimport DropdownLayout from '../DropdownLayout/DropdownLayout';\nimport Highlighter from '../Highlighter/Highlighter';\n\nclass InputWithOptions extends WixComponent {\n\n  // Abstraction\n  inputClasses() {}\n  dropdownClasses() {}\n  dropdownAdditionalProps() {}\n  inputAdditionalProps() {}\n\n  constructor(props) {\n    super(props);\n    this.state = {\n      inputValue: props.value || '',\n      showOptions: false,\n      lastOptionsShow: 0,\n      isEditing: false\n    };\n\n    this._onSelect = this._onSelect.bind(this);\n    this._onFocus = this._onFocus.bind(this);\n    this._onBlur = this._onBlur.bind(this);\n    this._onChange = this._onChange.bind(this);\n    this._onKeyDown = this._onKeyDown.bind(this);\n    this.focus = this.focus.bind(this);\n    this.blur = this.blur.bind(this);\n    this.select = this.select.bind(this);\n    this.hideOptions = this.hideOptions.bind(this);\n    this.showOptions = this.showOptions.bind(this);\n    this._onManuallyInput = this._onManuallyInput.bind(this);\n    this._renderDropdownLayout = this._renderDropdownLayout.bind(this);\n    this._onInputClicked = this._onInputClicked.bind(this);\n    this.closeOnSelect = this.closeOnSelect.bind(this);\n    this.onCompositionChange = this.onCompositionChange.bind(this);\n  }\n\n  componentWillReceiveProps(nextProps) {\n    if (!nextProps.options.length) {\n      this.setState({showOptions: false});\n    }\n  }\n\n  componentDidUpdate(prevProps, prevState) {\n    if (!this.props.showOptionsIfEmptyInput &&\n        ((!prevProps.value && this.props.value) || (!prevState.inputValue && this.state.inputValue))) {\n      this.showOptions();\n    }\n  }\n\n  onCompositionChange(isComposing) {\n    this.setState({isComposing});\n  }\n\n  onClickOutside() {\n    this.hideOptions();\n  }\n\n  renderInput() {\n    const inputProps = Object.assign(omit(Object.keys(DropdownLayout.propTypes).concat(['onChange', 'dataHook']), this.props), this.inputAdditionalProps());\n    const {inputElement} = inputProps;\n    return React.cloneElement(inputElement, {\n      menuArrow: true,\n      ref: input => this.input = input,\n      ...inputProps,\n      theme: this.props.theme,\n      onChange: this._onChange,\n      onInputClicked: this._onInputClicked,\n      onFocus: this._onFocus,\n      onBlur: this._onBlur,\n      onCompositionChange: this.onCompositionChange,\n      width: inputElement.props.width\n    });\n  }\n\n  _processOptions(options) {\n    return !this.props.highlight ? options : (\n      options.map(option => {\n        return {\n          ...option,\n          value: (\n            <Highlighter match={this.state.inputValue} dataHook={`highlighter-${option.id}`}>\n              {option.value}\n            </Highlighter>\n          )\n        };\n      })\n    );\n  }\n\n  _renderDropdownLayout() {\n    const dropdownProps = Object.assign(omit(Object.keys(Input.propTypes).concat(['dataHook']), this.props), this.dropdownAdditionalProps());\n    const customStyle = {marginLeft: this.props.dropdownOffsetLeft};\n\n    if (this.props.dropdownWidth) {\n      customStyle.width = this.props.dropdownWidth;\n    }\n\n    const isDropdownLayoutVisible = this.state.showOptions &&\n      (this.props.showOptionsIfEmptyInput || this.state.inputValue.length > 0);\n\n    return (\n      <div className={this.dropdownClasses()} style={customStyle}>\n        <DropdownLayout\n          ref={dropdownLayout => this.dropdownLayout = dropdownLayout}\n          {...dropdownProps}\n          options={this._processOptions(dropdownProps.options)}\n          theme={this.props.theme}\n          visible={isDropdownLayoutVisible}\n          onClose={this.hideOptions}\n          onSelect={this._onSelect}\n          isComposing={this.state.isComposing}\n          />\n      </div>\n    );\n  }\n\n  render() {\n    const {dropDirectionUp} = this.props;\n    return (\n      <div>\n        {dropDirectionUp ? this._renderDropdownLayout() : null}\n        <div onKeyDown={this._onKeyDown} className={this.inputClasses()}>\n          {this.renderInput()}\n        </div>\n        {!dropDirectionUp ? this._renderDropdownLayout() : null}\n      </div>\n    );\n  }\n\n  hideOptions() {\n    if (this.state.showOptions) {\n      this.setState({showOptions: false});\n      if (this._focused) {\n        this.input.blur();\n      }\n    }\n  }\n\n  showOptions() {\n    if (this.props.options.length) {\n      this.setState({showOptions: true, lastOptionsShow: Date.now()});\n    }\n  }\n\n  closeOnSelect() {\n    return this.props.closeOnSelect;\n  }\n\n  _onManuallyInput(inputValue) {\n    if (this.state.isComposing) {\n      return;\n    }\n\n    inputValue = inputValue.trim();\n    if (this.closeOnSelect()) {\n      this.hideOptions();\n    }\n\n    const suggestedOption = this.props.options.find(\n      element => element.value === inputValue\n    );\n\n    if (this.props.onManuallyInput) {\n      this.props.onManuallyInput(inputValue, suggestedOption);\n    }\n  }\n\n  _onSelect(option, isSelectedOption) {\n    this.showOptions();\n    const {onSelect} = this.props;\n\n    if (this.closeOnSelect()) {\n      this.hideOptions();\n    }\n\n    if (isSelectedOption) {\n      this.setState({showOptions: false});\n    } else if (onSelect) {\n      onSelect(this.props.highlight ? this.props.options.find(opt => opt.id === option.id) : option);\n    }\n  }\n\n  _onChange(event) {\n    this.setState({inputValue: event.target.value});\n\n    if (this.props.onChange) {\n      this.props.onChange(event);\n    }\n  }\n\n  _onInputClicked(event) {\n    if (this.state.showOptions && (Date.now() - this.state.lastOptionsShow > 2000)) {\n      this.hideOptions();\n    }\n\n    if (this.props.onInputClicked) {\n      this.props.onInputClicked(event);\n    }\n  }\n\n  _onFocus() {\n    if (this.props.disabled) {\n      return;\n    }\n    this._focused = true;\n    this.setState({isEditing: false});\n    this.showOptions();\n    if (this.props.onFocus) {\n      this.props.onFocus();\n    }\n  }\n\n  _onBlur(e) {\n    this._focused = false;\n    if (this.props.onBlur) {\n      this.props.onBlur(e);\n    }\n  }\n\n  _onKeyDown(event) {\n    if (this.props.disabled) {\n      return;\n    }\n    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {\n      this.setState({isEditing: true});\n    }\n    if (!this.dropdownLayout._onKeyDown(event)) {\n      switch (event.key) {\n        case 'Enter':\n        case 'Tab': {\n          this._onManuallyInput(this.state.inputValue);\n          break;\n        }\n        default:\n          this.showOptions();\n      }\n    }\n  }\n\n  focus() {\n    this.input.focus();\n  }\n\n  blur() {\n    this.input.blur();\n  }\n\n  select() {\n    this.input.select();\n  }\n}\n\nInputWithOptions.defaultProps = {\n  ...Input.defaultProps,\n  ...DropdownLayout.defaultProps,\n  onSelect: () => {},\n  options: [],\n  closeOnSelect: true,\n  inputElement: <Input/>,\n  valueParser: option => option.value,\n  dropdownWidth: null,\n  dropdownOffsetLeft: '0',\n  showOptionsIfEmptyInput: true\n};\n\nInputWithOptions.propTypes = {\n  ...Input.propTypes,\n  ...DropdownLayout.propTypes,\n  inputElement: PropTypes.element,\n  closeOnSelect: PropTypes.bool,\n  onManuallyInput: PropTypes.func,\n  valueParser: PropTypes.func,\n  dropdownWidth: PropTypes.string,\n  dropdownOffsetLeft: PropTypes.string,\n  /** Controls whether to show options if input is empty */\n  showOptionsIfEmptyInput: PropTypes.bool,\n  highlight: PropTypes.bool\n};\n\nInputWithOptions.displayName = 'InputWithOptions';\n\nexport default InputWithOptions;\n"}});