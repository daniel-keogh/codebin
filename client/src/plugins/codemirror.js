import Vue from 'vue';
import VueCodemirror from 'vue-codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/keymap/sublime.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/theme/nord.css';
import 'codemirror/mode/meta.js';

Vue.use(VueCodemirror, {
  options: {
    autofocus: true,
    keyMap: 'sublime',
    line: true,
    lineNumbers: true,
    showCursorWhenSelecting: true,
    styleSelectedText: true,
    tabSize: 4,
    theme: 'nord',
  },
});
