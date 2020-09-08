import Vue from "vue";

import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";

import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/reset.css";

locale.use(lang);

import {
  Button,
  ButtonGroup,
  Card,
  Icon,
  Main,
  Message,
  Option,
  Select
} from "element-ui";

Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Card);
Vue.use(Icon);
Vue.use(Main);
Vue.use(Option);
Vue.use(Select);

Vue.prototype.$message = Message;
