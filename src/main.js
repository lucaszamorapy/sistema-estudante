import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "./assets/tailwind.css";
import store from "./store"; // Adicione esta linha

loadFonts();

createApp(App)
  .use(vuetify)
  .use(store) // Adicione esta linha
  .mount("#app");
