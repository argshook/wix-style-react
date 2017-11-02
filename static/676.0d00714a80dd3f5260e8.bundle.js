webpackJsonp([676],{3910:function(module,exports){module.exports="@import '../common.scss';\n\n.title, .grouptitle\n{\n    @include FontRoman;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    height: 48px;\n    color: $D60;\n}\n:global(.ltr) .title, :global(.ltr) .grouptitle { padding-left: 24px; }\n:global(.rtl) .title, :global(.rtl) .grouptitle { padding-right: 24px; }\n\n.group\n{\n    background-color: rgba($D10, 0.4);\n}\n\n.groupitems\n{\n    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n    overflow: hidden; position:relative;\n}\n\n.groupitems .title\n{\n    position:relative;\n    height:24px;\n    padding-bottom: 18px;\n}\n:global(.rtl) .groupitems .title { padding-right: 24px; margin-right: 24px; }\n:global(.ltr) .groupitems .title { padding-left: 24px; margin-left: 24px}\n\n.groupitems .title:before\n{\n    content: \"\";\n    background: rgba($D80, 0.10);\n    width: 2px;\n    top: 0;\n    bottom: 0;\n    height: 42px;\n    position: absolute;\n}\n.groupitems .title:last-child:before {\n    height: 24px;\n}\n\n:global(.rtl) .groupitems .title:before { right: 0px; }\n:global(.ltr) .groupitems .title:before { left: 0px; }\n\n:global(.rtl) .groupmask { right: 24px; }\n:global(.ltr) .groupmask { left: 24px; }\n\n.title.selected\n{\n    color: $R10;\n    background-color: rgba($D10, 0.4);\n}\n\n.title:hover\n{\n    color: $paletteR4;\n    background-color: rgba($D10, 0.2);\n}\n\n.groupitems .title:hover\n{\n    color: $paletteR4;\n    background-color: transparent;\n}\n\n.groupitems .title.selected\n{\n    color: $R10;\n    background-color: transparent;\n}\n\n.groupmask {\n    position: absolute;\n    top: 0;\n    z-index: 1;\n    width: 2px;\n    height: 24px;\n    background: $R10;\n    transition: top .25s cubic-bezier(0.550, 0.085, 0.680, 0.530);\n}\n"}});