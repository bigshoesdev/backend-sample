import IndexRoute from "@routes/index.route";
import URLRoute from "@routes/url.route";
import App from "./app";

const app = new App([new IndexRoute(), new URLRoute()]);

app.listen();
