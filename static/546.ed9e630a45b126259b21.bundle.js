webpackJsonp([546],{1479:function(module,exports){module.exports="import noop from 'lodash/noop';\nimport React from 'react';\nimport PropTypes from 'prop-types';\nimport WixComponent from '../../BaseComponents/WixComponent';\nimport styles from './Tooltip.scss';\nimport Popper from 'popper.js';\nimport classNames from 'classnames';\n\nconst TooltipRefreshRate = 20;\n\nexport default class Tooltip extends WixComponent {\n  static propTypes = {\n    content: PropTypes.any.isRequired,\n    children: PropTypes.node.isRequired,\n    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),\n    alignment: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),\n    theme: PropTypes.oneOf(['light', 'dark', 'error']),\n    showDelay: PropTypes.number,\n    hideDelay: PropTypes.number,\n    showTrigger: PropTypes.oneOf(['custom', 'mouseenter', 'mouseleave', 'click', 'focus', 'blur']),\n    hideTrigger: PropTypes.oneOf(['custom', 'mouseenter', 'mouseleave', 'click', 'focus', 'blur']),\n    active: PropTypes.bool,\n    arrowPlacement: PropTypes.string,\n    arrowStyle: PropTypes.object,\n    moveBy: PropTypes.object,\n    disabled: PropTypes.bool,\n    maxWidth: PropTypes.string,\n    zIndex: PropTypes.number,\n    textAlign: PropTypes.string,\n    moveArrowTo: PropTypes.number,\n    targetStyle: PropTypes.any,\n    bounce: PropTypes.bool,\n    shouldCloseOnClickOutside: PropTypes.bool,\n    onClickOutside: PropTypes.func,\n    onShow: PropTypes.func,\n    size: PropTypes.oneOf(['normal', 'large'])\n  };\n\n  static defaultProps = {\n    placement: 'top',\n    theme: 'light',\n    showDelay: 200,\n    hideDelay: 500,\n    showTrigger: 'mouseenter',\n    hideTrigger: 'mouseleave',\n    active: false,\n    moveBy: {x: 0, y: 0},\n    disabled: false,\n    maxWidth: '1200px',\n    zIndex: 2000,\n    textAlign: 'center',\n    onClickOutside: noop,\n    onShow: noop,\n    size: 'normal'\n  };\n\n  constructor(props) {\n    super(props);\n\n    this.placementFlipMap = {top: 'bottom', left: 'right', right: 'left', bottom: 'top'};\n    this.alignmentMap = {top: 'start', right: 'end', bottom: 'end', left: 'start', center: ''};\n\n    this.state = {\n      placement: this.getPopperPlacement(props.placement, props.alignment),\n      active: props.active\n    };\n\n    this.handlePopperUpdate = this.handlePopperUpdate.bind(this);\n    this.handleHideTrigger = this.handleHideTrigger.bind(this);\n    this.handleShowTrigger = this.handleShowTrigger.bind(this);\n  }\n\n  componentElements() {\n    return [this.refs.target.children[0], this.refs.content.children[0]];\n  }\n\n  componentDidMount() {\n    super.componentDidMount();\n\n    const {placement} = this.state;\n    const target = this.refs.target.children[0];\n    const content = this.refs.content.children[0];\n\n    this.popper = new Popper(target, content, {\n      placement,\n      modifiers: {\n        applyStyle: {enabled: false}\n      },\n      onUpdate: this.handlePopperUpdate,\n      onCreate: this.handlePopperUpdate\n    });\n  }\n\n  componentWillUnmount() {\n    super.componentWillUnmount();\n    this.popper.destroy();\n    clearInterval(this.scheduleInterval);\n  }\n\n  componentWillReceiveProps(nextProps) {\n    this.handleNextActive(nextProps);\n    this.handleNextMoveBy(nextProps);\n  }\n\n  //Schedule popper updates periodically, only when the tooltip is visible (for\n  //tooltip repositioning - e.g. when the target dimensions change).\n  componentDidUpdate() {\n    if (this.state.active && !this.scheduleInterval) {\n      this.scheduleInterval = setInterval(() => {\n        this.popper.scheduleUpdate();\n      }, TooltipRefreshRate);\n\n      this.props.onShow();\n    } else if (!this.state.active) {\n      clearInterval(this.scheduleInterval);\n      this.scheduleInterval = null;\n    }\n  }\n\n  onClickOutside(e) {\n    if (this.props.shouldCloseOnClickOutside) {\n      this.hide();\n    } else {\n      this.props.onClickOutside(e);\n    }\n  }\n\n  hide() {\n    this.toggleActive(false);\n  }\n\n  toggleActive(active) {\n    this.setState({active});\n  }\n\n  handleNextMoveBy(nextProps) {\n    const hasChanged = nextProps.moveBy.x !== this.props.moveBy.x ||\n                       nextProps.moveBy.y !== this.props.moveBy.y;\n\n    if (hasChanged) {\n      this.moveBy = nextProps.moveBy;\n      this.popper.update();\n    }\n  }\n\n  handleNextActive(nextProps) {\n    const {active: nextActive} = nextProps;\n    const {active: currentlyActive} = this.props;\n\n    if (nextProps.showTrigger === 'custom' && nextActive && !currentlyActive) {\n      this.toggleActive(true);\n    } else if (nextProps.hideTrigger === 'custom' && !nextActive && currentlyActive) {\n      this.toggleActive(false);\n    }\n  }\n\n  handlePopperUpdate(data) {\n    const hasChangedPlacement = data.placement !== this.state.placement;\n\n    if (hasChangedPlacement) {\n      this.setState({\n        placement: data.placement\n      });\n    }\n\n    this.setState({popperData: data});\n  }\n\n  handleTrigger(originalCallback = noop, triggerType) {\n    const {showTrigger, hideTrigger} = this.props;\n    const {active} = this.state;\n\n    if (showTrigger === hideTrigger && showTrigger === triggerType) {\n      if (active) {\n        this.handleHideTrigger();\n      } else {\n        this.handleShowTrigger();\n      }\n    } else if (showTrigger === triggerType) {\n      this.handleShowTrigger();\n    } else if (hideTrigger === triggerType) {\n      this.handleHideTrigger();\n    }\n\n    originalCallback();\n  }\n\n  handleHideTrigger() {\n    this.handleToggleWithDelay(false);\n  }\n\n  handleShowTrigger() {\n    this.handleToggleWithDelay(true);\n  }\n\n  handleToggleWithDelay(toggle) {\n    clearTimeout(this.mouseTimeout);\n\n    this.mouseTimeout = setTimeout(() => {\n      this.toggleActive(toggle);\n    }, toggle ? this.props.showDelay : this.props.hideDelay);\n  }\n\n  getPopperPlacement(placement, alignment) {\n    const popperAlignment = this.alignmentMap[alignment];\n\n    if (alignment) {\n      return `${placement}-${popperAlignment}`;\n    }\n\n    return placement;\n  }\n\n  getArrowPlacement(popperPlacement) {\n    const overrideArrowPlacement = this.props.arrowPlacement;\n    return overrideArrowPlacement || this.placementFlipMap[popperPlacement];\n  }\n\n  placementWithoutAlignment(placement) {\n    return placement.replace(/-.*/, '');\n  }\n\n  getPopperStyle() {\n    const data = this.state.popperData;\n\n    if (!data) {\n      return {};\n    }\n\n    const left = Math.round(data.offsets.popper.left);\n    const top = Math.round(data.offsets.popper.top);\n\n    const transform = `translate3d(${left}px, ${top}px, 0)`;\n\n    return {\n      position: data.offsets.popper.position,\n      transform,\n      WebkitTransform: transform,\n      left: this.props.moveBy.x,\n      top: this.props.moveBy.y\n    };\n  }\n\n  getArrowStyle() {\n    const {moveArrowTo, arrowStyle} = this.props;\n    const placement = this.placementWithoutAlignment(this.props.placement);\n    const isVertical = placement === 'top' || placement === 'bottom';\n    const isHorizontal = placement === 'left' || placement === 'right';\n\n    if (moveArrowTo) {\n      const repositionStyle = {};\n\n      if (isVertical) {\n        if (moveArrowTo > 0) {\n          repositionStyle.left = moveArrowTo;\n          repositionStyle.right = 'inherit';\n        } else {\n          repositionStyle.right = -1 * moveArrowTo;\n          repositionStyle.left = 'inherit';\n        }\n      } else if (isHorizontal) {\n        if (moveArrowTo > 0) {\n          repositionStyle.top = moveArrowTo;\n          repositionStyle.bottom = 'inherit';\n        } else {\n          repositionStyle.bottom = -1 * moveArrowTo;\n          repositionStyle.top = 'inherit';\n        }\n      }\n\n      return {\n        ...repositionStyle,\n        ...arrowStyle\n      };\n    }\n\n    return arrowStyle;\n  }\n\n  render() {\n    const {theme, bounce, disabled, maxWidth, zIndex, textAlign, size, targetStyle} = this.props;\n    const placement = this.placementWithoutAlignment(this.state.placement);\n    const arrowPlacement = this.getArrowPlacement(placement);\n\n    let {active} = this.state;\n\n    active = active && !disabled;\n\n    const clonedTarget = React.cloneElement(this.props.children, {\n      onMouseEnter: () => this.handleTrigger(this.props.children.props.onMouseEnter, 'mouseenter'),\n      onMouseLeave: () => this.handleTrigger(this.props.children.props.onMouseLeave, 'mouseleave'),\n      onClick: () => this.handleTrigger(this.props.children.props.onClick, 'click'),\n      onFocus: () => this.handleTrigger(this.props.children.props.onFocus, 'focus'),\n      onBlur: () => this.handleTrigger(this.props.children.props.onBlur, 'blur')\n    });\n\n    const popperStyle = this.getPopperStyle();\n    const arrowStyle = this.getArrowStyle();\n\n    return (\n      <div className={styles.root} style={targetStyle}>\n        <div ref=\"target\" data-hook=\"target\" className=\"targetWrapper\">\n          {clonedTarget}\n        </div>\n        <div ref=\"content\">\n          <div\n            className={classNames(styles.tooltip, {\n              [styles.active]: active\n            })}\n            style={{zIndex, ...popperStyle}}\n            data-hook=\"tooltip\"\n            >\n            <div\n              className={classNames({\n                [styles[`bounce-on-${arrowPlacement}`]]: bounce\n              })}\n              >\n              <div\n                className={classNames(styles.tooltipInner, styles[theme], styles[placement], styles[size], {\n                  [styles.active]: active\n                })}\n                style={{maxWidth}}\n                data-hook=\"tooltip-inner\"\n                >\n                <div data-hook=\"tooltip-content\" style={{textAlign}}>\n                  {this.props.content}\n                </div>\n                <div\n                  className={classNames(styles.arrow, styles[arrowPlacement])}\n                  style={arrowStyle}\n                  />\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    );\n  }\n}\n"}});