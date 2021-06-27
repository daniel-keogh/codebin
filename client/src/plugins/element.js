import Vue from 'vue';

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css';

locale.use(lang);

import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Divider,
  Form,
  FormItem,
  Icon,
  Input,
  Main,
  Message,
  Option,
  PageHeader,
  Popover,
  Select,
  Tag,
} from 'element-ui';

Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Card);
Vue.use(Container);
Vue.use(Divider);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Main);
Vue.use(Option);
Vue.use(PageHeader);
Vue.use(Popover);
Vue.use(Select);
Vue.use(Tag);

Vue.prototype.$message = Message;
