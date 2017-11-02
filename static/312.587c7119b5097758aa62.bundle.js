webpackJsonp([312],{1713:function(module,exports){module.exports="import React from 'react';\nimport PropTypes from 'prop-types';\nimport style from './ImageViewer.scss';\nimport Tooltip from '../Tooltip';\nimport Trash3 from '../Icons/dist/components/Trash3';\nimport Replace from '../Icons/dist/components/Replace';\nimport Plus2 from '../Icons/dist/components/Plus2';\nimport WixComponent from '../BaseComponents/WixComponent';\n\nclass ImageViewer extends WixComponent {\n\n  render() {\n    const {\n      imageUrl,\n      onAddImage,\n      onUpdateImage,\n      onRemoveImage\n    } = this.props;\n\n    const tooltipCommonProps = {\n      showDelay: 0,\n      hideDelay: 0,\n      align: 'center',\n      placement: 'top',\n      moveBy: {x: 2, y: 0}\n    };\n\n    return (\n      <div className={`${style.container} ${imageUrl && style.hasLogo}`}>\n        <div data-hook=\"add-image\" className={style.addLogo} onClick={onAddImage}>\n          <div className={style.dashedBorder}/>\n          <div className={style.plusIcon}><Plus2 size=\"47px\"/></div>\n        </div>\n        {!!imageUrl &&\n        <div className={style.changeLogoContainer}>\n          <div className={style.imageLayout}>\n            <img data-hook=\"image-viewer-image\" className={style.image} src={imageUrl}/>\n          </div>\n          <div className={style.imageBackground}>\n            <div className={style.buttons}>\n              <Tooltip content=\"Replace\" {...tooltipCommonProps}>\n                <div data-hook=\"update-image\" className={style.button} onClick={onUpdateImage}>\n                  <Replace size=\"1.2em\"/>\n                </div>\n              </Tooltip>\n              <Tooltip content=\"Remove\" {...tooltipCommonProps}>\n                <div data-hook=\"remove-image\" className={style.button} onClick={onRemoveImage}>\n                  <Trash3 size=\"1.2em\"/>\n                </div>\n              </Tooltip>\n            </div>\n          </div>\n        </div>\n        }\n      </div>\n    );\n  }\n}\n\nImageViewer.propTypes = {\n  imageUrl: PropTypes.string,\n  onAddImage: PropTypes.func,\n  onUpdateImage: PropTypes.func,\n  onRemoveImage: PropTypes.func\n};\n\nexport default ImageViewer;\n"}});