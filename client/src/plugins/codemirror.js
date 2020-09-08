import Vue from "vue";
import VueCodemirror from "vue-codemirror";

import "codemirror/lib/codemirror.css";
import "codemirror/keymap/sublime.js";
import "codemirror/addon/selection/active-line.js";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/theme/monokai.css";
import "codemirror/mode/meta.js";

// you can set default global options and events when Vue.use
Vue.use(VueCodemirror, {
  options: {
    tabSize: 4,
    lineNumbers: true,
    line: true,
    foldGutter: true,
    styleSelectedText: true,
    keyMap: "sublime",
    showCursorWhenSelecting: true,
    theme: "monokai"
  }
});
