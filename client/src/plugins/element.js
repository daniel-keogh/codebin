import Vue from "vue";

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css';

locale.use(lang);

import {
    Select,
    Button,
    ButtonGroup,
    Icon,
    Card,
    Container,
    Main,
    Message,
    Option
} from 'element-ui';

Vue.use(Select);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Icon);
Vue.use(Card);
Vue.use(Container);
Vue.use(Main);
Vue.use(Option);

Vue.prototype.$message = Message;