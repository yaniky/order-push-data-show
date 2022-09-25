import { createApp } from "vue";
import App from "./App.vue";
import route from "@/route";
import "normalize.css";

const app = createApp(App);

app.use(route);
app.mount("#app");