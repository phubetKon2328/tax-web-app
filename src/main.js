import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./routes";
import store from './store';

import "ant-design-vue/dist/reset.css";

const app = createApp(App);

app.use(Antd);
app.use(router);
app.use(store);
app.mount("#app");
