webpackJsonp([110],{1915:function(module,exports){module.exports="import position from './TooltipPosition';\n\ndescribe('Tooltip position calculation helper', () => {\n\n  let anchor, element;\n\n  beforeEach(() => {\n    anchor = new Rect();\n    element = new Rect();\n\n    anchor\n      .at(500, 500)\n      .size(100, 100);\n\n    element\n      .size(50, 50);\n  });\n\n  it('should not include window scroll X and Y props', () => {\n    window.scrollX = window.scrollY = 100;\n    expect(position(anchor, element, params('top', 'left')))\n      .toEqual({left: 500, top: 440});\n  });\n\n  it('should position top-left ', () => {\n    expect(position(anchor, element, params('top', 'left')))\n      .toEqual({left: 500, top: 440});\n  });\n\n  it('should position top-center ', () => {\n    expect(position(anchor, element, params('top', 'center')))\n      .toEqual({left: 525, top: 440});\n  });\n\n  it('should position top-right ', () => {\n    expect(position(anchor, element, params('top', 'right')))\n      .toEqual({left: 550, top: 440});\n  });\n\n  it('should position right-top', () => {\n    expect(position(anchor, element, params('right', 'top')))\n      .toEqual({left: 610, top: 500});\n  });\n\n  it('should position right-center', () => {\n    expect(position(anchor, element, params('right', 'center')))\n      .toEqual({left: 610, top: 525});\n  });\n\n  it('should position right-bottom', () => {\n    expect(position(anchor, element, params('right', 'bottom')))\n      .toEqual({left: 610, top: 550});\n  });\n\n  it('should position bottom-left', () => {\n    expect(position(anchor, element, params('bottom', 'left')))\n      .toEqual({left: 500, top: 610});\n  });\n\n  it('should position bottom-center', () => {\n    expect(position(anchor, element, params('bottom', 'center')))\n      .toEqual({left: 525, top: 610});\n  });\n\n  it('should position bottom-right', () => {\n    expect(position(anchor, element, params('bottom', 'right')))\n      .toEqual({left: 550, top: 610});\n  });\n\n  it('should position left-top', () => {\n    expect(position(anchor, element, params('left', 'top')))\n      .toEqual({left: 440, top: 500});\n  });\n\n  it('should position left-center', () => {\n    expect(position(anchor, element, params('left', 'center')))\n      .toEqual({left: 440, top: 525});\n  });\n\n  it('should position left-bottom', () => {\n    expect(position(anchor, element, params('left', 'bottom')))\n      .toEqual({left: 440, top: 550});\n  });\n\n});\n\nfunction params(placement, alignment, margin = 10) {\n  return {placement, alignment, margin};\n}\n\nfunction Rect() {\n  this.at = (left, top) => {\n    this.left = left;\n    this.top = top;\n    return this;\n  };\n  this.size = (width, height) => {\n    this.width = width;\n    this.height = height;\n    return this;\n  };\n}\n"}});