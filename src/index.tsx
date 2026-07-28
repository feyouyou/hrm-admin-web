import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider as ReduxProvider } from "react-redux";
import router from "./router";
import { store } from "./store";
import "./index.scss";

import "./api/mock";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <ReduxProvider store={store}>
    <RouterProvider router={router} />
  </ReduxProvider>,
);
