webpackJsonp([844],{3742:function(module,exports){module.exports="@import './SlideAnimation';\n\n.enter, .appear {\n  transform: translate(100%);\n}\n\n.enter.enterActive, .appear.appearActive {\n  @extend .enterActive-base;\n}\n\n.exit {\n  @extend .exit-base;\n}\n\n.exit.exitActive {\n  @extend .exitActive-base;\n  transform: translate(-100%);\n}\n\n:global(.rtl) {\n  .enter, .appear {\n    transform: translate(-100%);\n  }\n\n  .enter.enterActive, .appear.appearActive {\n    @extend .enterActive-base;\n  }\n\n  .exit.exitActive {\n    transform: translate(100%);\n  }\n}\n"}});