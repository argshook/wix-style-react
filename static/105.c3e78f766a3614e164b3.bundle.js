webpackJsonp([105],{1920:function(module,exports){module.exports='import React from \'react\';\nimport PropTypes from \'prop-types\';\n\nexport default function MagnifyingGlass(props) {\n  let directionStyle = {};\n\n  if (props.alignLeft) {\n    directionStyle = {\n      MozTransform: \'scaleX(-1)\',\n      OTransform: \'scaleX(-1)\',\n      Webkit: \'scaleX(-1)\',\n      transform: \'scaleX(-1)\'\n    };\n  }\n\n  return (\n    <svg width="18px" height="18px" viewBox="0 0 18 18" style={directionStyle}>\n      <g>\n        <path d="M7.5,1C11.1,1,14,3.9,14,7.5S11.1,14,7.5,14S1,11.1,1,7.5S3.9,1,7.5,1 M7.5,0C3.4,0,0,3.4,0,7.5 S3.4,15,7.5,15S15,11.6,15,7.5S11.6,0,7.5,0L7.5,0z"/>\n      </g>\n      <line strokeLinecap="round" strokeMiterlimit="10" x1="12.6" y1="12.5" x2="17.5" y2="17.4"/>\n    </svg>\n  );\n}\n\nMagnifyingGlass.displayName = \'MagnifyingGlass\';\n\nMagnifyingGlass.propTypes = {\n  alignLeft: PropTypes.bool\n};\n'}});