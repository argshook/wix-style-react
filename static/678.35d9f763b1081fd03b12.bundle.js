webpackJsonp([678],{3908:function(module,exports){module.exports="@import '../common.scss';\n\n.bottombar\n{\n    @include FontRoman;\n    position: basolute;\n    bottom:0px;\n    font-size:14px;\n    width:100%;\n    text-align:center;\n    color:$D80;\n    background: rgba($D30, 0.42);\n    height:54px;\n    display:flex;\n    flex-direction:columns;\n}\n\n.command\n{\n    flex: 1;\n    height:54px;\n    display:flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n}\n:global(.rtl) .command { border-right: 1px solid $D20; } \n:global(.ltr) .command { border-left: 1px solid $D20; }\n\n.command:first-child\n{\n    border: none;\n}\n\n.command:hover\n{\n    background-color: $D30;\n}\n"}});